import React, { createContext, useContext, useState } from "react";
import { Modal, Table } from "antd";
import TableController from "../TableController";
import useTableSearch from "../../Hooks/useTableSearch";
import useModal from "../../Hooks/useModal";
import IconSax from "../IconSax";
import { ColumnsType } from "antd/es/table";
import useSortTable from "../../Hooks/useSortTable";
import useLoading from "../../Hooks/useLoading";
import useTablePagination from "../../Hooks/useTablePagination";
import { TablePaginationConfig } from "antd/lib/table/InternalTable";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import sortInfoMapping from "../../Helpers/sortInfoMapping";
import ModelGeneralServices from "../../Services/ModelGeneralServices";
import useWhileTyping from "../../Hooks/useWhileTyping";
import Pagination from "../../Interfaces/Pagination";
import { usePage } from '@inertiajs/react'
import ModelConfig, { ModelColumns } from "../../Interfaces/ModelConfig";
import ModelContext, { FreeModelSettings } from "../../Interfaces/ModelContext";
import ModelForm from "../../Interfaces/ModelForm";

export class ModelDisplayBase {
    public config: ModelConfig;
    public ctx: React.Context<ModelContext<any>>;
    constructor(config: ModelConfig, public ModelForm?: ModelForm) {
        this.config = config;
        this.ctx = createContext({
            config: this.config,
        });
        this.TableController = this.TableController.bind(this);
        this.FreeModal = this.FreeModal.bind(this);
        this.ModalForm = this.ModalForm.bind(this);
        this.ModelTable = this.ModelTable.bind(this);
        this.Ctx = this.Ctx.bind(this);
    }

    public Ctx({ children }: { children: any }) {
        // we get pagination object that contains the data
        // this simply done with inertia and we access it with usePage() hook
        // and this.config.slug is just the slice of data that we interested in
        const paginatedData = usePage().props[
            this.config.slug
        ] as Pagination<any>;

        // this hook give us control on all search params like search value
        // attribute and whether we in search mode or not
        const search = useTableSearch(this.config.search.defaultValue);

        // modal for form only
        const modalForm = useModal();

        // modal for free use
        const freeModal = useModal();

        // settings of free modal
        const [freeModalSettings, setFreeModalSettings] =
            useState<FreeModelSettings>({
                children: null,
                onClose: undefined,
                title: "",
            });

        // control loading sign of the table
        const tableState = useLoading();
        // it just to update the UI arrows up and down or none
        // it has nothing to do with updating data just for UI
        const sortingArrows = useSortTable<any>("created_at");

        const [modelToEdit, setModelToEdit] = useState<any | undefined>(
            undefined
        );

        // `tableParams` should contain pagination settings only at first
        // but when updated it also hold filters and sorter settings
        // and originally we update the data from backend from sorting info
        // that we get after `handleTableChange` run
        // you might be asking why we use `useSortTable` then ?
        // note : at some point we can access url that contains `slug_page`
        // and `slug_pageSize` parameters so we can init pagination with these values
        const params = new URLSearchParams(window.location.search);
        const currentPage = params.get(this.config.slug + "_page") ?? "1";
        const pageSize = params.get(this.config.slug + "_pageSize") ?? "10";
        const { tableParams, updateTableParams, resetPagination } =
            useTablePagination<any>(parseInt(currentPage), parseInt(pageSize));

        // it has two main roles , first as we said it update tableParams
        // second create `ModelService` instance with current settings of
        // pagination and sort info and search parmeters
        // then update the slice of data
        const handleTableChange = (
            pagination: TablePaginationConfig,
            filters: Record<string, FilterValue | null>,
            sorter: SorterResult<any> | SorterResult<any>[]
        ) => {
            updateTableParams(pagination, filters, sorter);
            const sortInfo = sortInfoMapping<any>(sorter as SorterResult<any>);
            const service = ModelGeneralServices.setTableGlobalSettings({
                page: pagination.current!,
                pageSize: pagination.pageSize!,
                sortInfo,
                stateLoading: tableState.stateLoading,
                search: search.search,
                attribute: search.attribute,
            });
            service.updateTableData(this.config.slug);
        };

        return (
            <this.ctx.Provider
                value={{
                    config: this.config,
                    search,
                    modalForm,
                    freeModal,
                    freeModalSettings,
                    setFreeModalSettings,
                    tableState,
                    sortingArrows,
                    tableParams,
                    resetPagination,
                    handleTableChange,
                    paginatedData,
                    modelToEdit,
                    setModelToEdit,
                }}
            >
                {children}
            </this.ctx.Provider>
        );
    }

    public FreeModal() {
        const ctx = useContext(this.ctx);
        const closeModal = () => {
            // so we can perform action before close from outside
            if (ctx.freeModalSettings?.onClose) ctx.freeModalSettings.onClose();
            ctx.freeModal!.handleCancel();
        };
        return (
            <Modal
                title={ctx.freeModalSettings?.title}
                open={ctx.freeModal!.open}
                onOk={ctx.freeModal!.handleOk}
                footer={null}
                confirmLoading={ctx.freeModal!.confirmLoading}
                onCancel={closeModal}
                destroyOnClose={true}
                width="90%"
                closeIcon={<IconSax icon="add" className="rotate-45" />}
            >
                {ctx.freeModalSettings?.children}
            </Modal>
        );
    }

    public ModalForm() {
        const ctx = useContext(this.ctx);
        return (
            <Modal
                title={ctx.config.addButton}
                open={ctx.modalForm!.open}
                onOk={ctx.modalForm!.handleOk}
                footer={null}
                confirmLoading={ctx.modalForm!.confirmLoading}
                onCancel={ctx.modalForm!.handleCancel}
                destroyOnClose={true}
                width="90%"
                closeIcon={<IconSax icon="add" className="rotate-45" />}
            >
                {this.ModelForm && (
                    <this.ModelForm
                        modelToEdit={ctx.modelToEdit}
                        closeModal={ctx.modalForm!.closeModal}
                    />
                )}
            </Modal>
        );
    }

    public TableController() {
        const ctx = useContext(this.ctx);
        // hook to search while typing
        useWhileTyping(
            () => {
                // reset pagination and sort states
                ctx.resetPagination!();
                ctx.sortingArrows!.resetSortState();
                // create model service to request the data
                // so that we set current settings to send it
                // to backend and update the slice of data that need to
                // be updated
                const service = ModelGeneralServices.setTableGlobalSettings({
                    stateLoading: ctx.tableState!.stateLoading,
                    search: ctx.search!.search,
                    attribute: ctx.search!.attribute,
                });
                service.updateTableData(ctx.config.slug);
            },
            // the hook function ^ work only when search mode is true
            ctx.search!.searchMode,
            // either search mode or search value changed the function run
            [ctx.search!.searchMode, ctx.search!.search, ctx.search!.attribute]
        );

        const addButtonAction = () => {
            // clear `modelToEdit` state to make the form empty
            ctx.setModelToEdit!(undefined);
            ctx.modalForm!.showModal();
        };
        return (
            <TableController
                addButtonText={ctx.config.addButton}
                addButtonAction={addButtonAction}
                searchButtonAction={() => ctx.search?.enterSearchMode()}
                setSearch={ctx.search!.setSearch}
                setAttribute={ctx.search!.setAttribute}
                exitSearchMode={() => {
                    ctx.config.exitSearchMode(ctx);
                }}
                defaultValue={ctx.config.search.defaultValue}
                options={ctx.config.search.options}
            />
        );
    }

    private mappingColumns(
        modelColumns: ModelColumns[],
        ctx: ModelContext<any>
    ) {
        return modelColumns.map(
            ({ title, dataIndex, key, sorting, render, renderWithCtx }) => {
                if (renderWithCtx) render = renderWithCtx(ctx);
                let column = { title, dataIndex, key, render };
                if (sorting)
                    column = {
                        ...column,
                        ...ctx.sortingArrows!.getSortProps(key),
                    };
                return column;
            }
        ) as ColumnsType<any>;
    }

    public ModelTable() {
        const ctx = useContext(this.ctx);
        // run `reshapeData` to transform data to fit the table
        const originalData: any[] | undefined = ctx.paginatedData?.data;
        const reshapeData = ctx.config.reshapeData;
        const data = reshapeData ? reshapeData(originalData) : originalData;
        // add sorting props for each column need it
        const columns = this.mappingColumns(ctx.config.modelColumns, ctx);
        return (
            <Table
                columns={columns}
                rowKey={(record) => record.id!}
                dataSource={data}
                pagination={{
                    ...ctx.tableParams!.pagination,
                    total: ctx.paginatedData?.total,
                }}
                expandable={{
                    expandedRowRender: ctx.config.expandedRowRender,
                    rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                loading={ctx.tableState!.loading}
                bordered
                onChange={ctx.handleTableChange}
                scroll={{ x: true }}
                footer={() =>
                    "عدد النتائج : " +
                    (ctx.paginatedData?.total === undefined
                        ? 0
                        : ctx.paginatedData?.total)
                }
            />
        );
    }
}
