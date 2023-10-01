import React, { useState } from "react";
import { Col, Modal, Row, Table, TablePaginationConfig } from "antd";
import PageTitle from "./PageTitle";
import ModelConfig from "../Interfaces/ModelConfig";
import ModelForm from "../Interfaces/ModelForm";
import TableController from "./TableController";
import IconSax from "./IconSax";
import { usePage } from '@inertiajs/react'
import useTableSearch from "../Hooks/useTableSearch";
import useModal from "../Hooks/useModal";
import { FreeModelSettings } from "../Interfaces/ModelContext";
import useLoading from "../Hooks/useLoading";
import useSortTable from "../Hooks/useSortTable";
import useTablePagination from "../Hooks/useTablePagination";
import {
    ColumnsType,
    FilterValue,
    SorterResult,
} from "antd/es/table/interface";
import sortInfoMapping from "../Helpers/sortInfoMapping";
import ModelGeneralServices from "../Services/ModelGeneralServices";
import Pagination from "../Interfaces/Pagination";
import useWhileTyping from "../Hooks/useWhileTyping";

export default function DisplayModel({
    config,
    ModelForm,
    className,
}: {
    config: ModelConfig;
    ModelForm?: ModelForm;
    className?: string;
}) {
    // we get pagination object that contains the data
    // this simply done with inertia and we access it with usePage() hook
    // and this.config.slug is just the slice of data that we interested in
    const paginatedData = usePage().props[config.slug] as Pagination<any>;

    // this hook give us control on all search params like search value
    // attribute and whether we in search mode or not
    const search = useTableSearch(config.search.defaultValue);

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

    const [modelToEdit, setModelToEdit] = useState<any | undefined>(undefined);

    // `tableParams` should contain pagination settings only at first
    // but when updated it also hold filters and sorter settings
    // and originally we update the data from backend from sorting info
    // that we get after `handleTableChange` run
    // you might be asking why we use `useSortTable` then ?
    // note : at some point we can access url that contains `slug_page`
    // and `slug_pageSize` parameters so we can init pagination with these values
    const params = new URLSearchParams(window.location.search);
    const currentPage = params.get(config.slug + "_page") ?? "1";
    const pageSize = params.get(config.slug + "_pageSize") ?? "10";
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
        service.updateTableData(config.slug);
    };
    useWhileTyping(
        () => {
            // reset pagination and sort states
            resetPagination!();
            sortingArrows!.resetSortState();
            // create model service to request the data
            // so that we set current settings to send it
            // to backend and update the slice of data that need to
            // be updated
            const service = ModelGeneralServices.setTableGlobalSettings({
                stateLoading: tableState!.stateLoading,
                search: search!.search,
                attribute: search!.attribute,
            });
            service.updateTableData(config.slug);
        },
        // the hook function ^ work only when search mode is true
        search!.searchMode,
        // either search mode or search value changed the function run
        [search!.searchMode, search!.search, search!.attribute]
    );

    const addButtonAction = () => {
        // clear `modelToEdit` state to make the form empty
        setModelToEdit!(undefined);
        modalForm!.showModal();
    };
    const closeModal = () => {
        // so we can perform action before close from outside
        if (freeModalSettings?.onClose) freeModalSettings.onClose();
        freeModal!.handleCancel();
    };
    const originalData: any[] | undefined = paginatedData?.data;
    const reshapeData = config.reshapeData;
    const data = reshapeData ? reshapeData(originalData) : originalData;
    // add sorting props for each column need it
    const columns = config.modelColumns.map(
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

    return (
        <Row gutter={[0, 25]} className={"m-8 " + className}>
            {config.pageTitle && <PageTitle name={config.pageTitle} />}
            <Modal
                title={freeModalSettings?.title}
                open={freeModal!.open}
                onOk={freeModal!.handleOk}
                footer={null}
                confirmLoading={freeModal!.confirmLoading}
                onCancel={closeModal}
                destroyOnClose={true}
                width="90%"
                closeIcon={<IconSax icon="add" className="rotate-45" />}
            >
                {freeModalSettings?.children}
            </Modal>
            <Modal
                title={config.addButton}
                open={modalForm!.open}
                onOk={modalForm!.handleOk}
                footer={null}
                confirmLoading={modalForm!.confirmLoading}
                onCancel={modalForm!.handleCancel}
                destroyOnClose={true}
                width="90%"
                closeIcon={<IconSax icon="add" className="rotate-45" />}
            >
                {ModelForm && (
                    <ModelForm
                        modelToEdit={modelToEdit}
                        closeModal={modalForm!.closeModal}
                    />
                )}
            </Modal>
            <Col span="24" className="isolate">
                <TableController
                    addButtonText={config.addButton}
                    addButtonAction={addButtonAction}
                    searchButtonAction={() => search?.enterSearchMode()}
                    setSearch={search!.setSearch}
                    setAttribute={search!.setAttribute}
                    exitSearchMode={() => {
                        config.exitSearchMode(ctx);
                    }}
                    defaultValue={config.search.defaultValue}
                    options={config.search.options}
                />

                <Table
                    columns={columns}
                    rowKey={(record) => record.id!}
                    dataSource={data}
                    pagination={{
                        ...tableParams!.pagination,
                        total: paginatedData?.total,
                    }}
                    expandable={{
                        expandedRowRender: config.expandedRowRender,
                        rowExpandable: (record) =>
                            record.name !== "Not Expandable",
                    }}
                    loading={tableState!.loading}
                    bordered
                    onChange={handleTableChange}
                    scroll={{ x: true }}
                    footer={() =>
                        "عدد النتائج : " +
                        (paginatedData?.total === undefined
                            ? 0
                            : paginatedData?.total)
                    }
                />
            </Col>
        </Row>
    );
}
