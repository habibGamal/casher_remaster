import a from"./ProductGroupForm.0509995a.js";import{j as u,aX as i,a as d,B as r,v as s}from"./app.3aad4e87.js";import{M as l}from"./useLoading.7900d1a7.js";import{D as m}from"./DisplayModel.5fe8d047.js";import p from"./ProductsInGroup.4ceaebac.js";import{S as c}from"./index.c383cf70.js";import{E as f}from"./index.05831a02.js";import{D as g}from"./DeleteOutlined.043d105f.js";import"./FormComponent.060d84f4.js";import"./index.4d07e239.js";import"./index.3e4aed6b.js";import"./index.39d1b77e.js";import"./ModelDisplayBase.6cf1539a.js";import"./index.fe1d2ba1.js";import"./CheckOutlined.241343e2.js";import"./Table.611ad66a.js";import"./styleChecker.8ba932ef.js";import"./index.28850fea.js";import"./PageTitle.30585599.js";const h=[{title:"\u0623\u0633\u0645 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629",dataIndex:"name",key:"name",sorting:!0},{title:"\u0639\u062F\u062F \u0627\u0644\u0627\u0635\u0646\u0627\u0641 \u0641\u064A \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629",dataIndex:"products_count",key:"products_count",sorting:!0},{title:"\u062A\u062D\u0643\u0645",key:"control",renderWithCtx:o=>t=>d(c,{size:"middle",children:[u(r,{onClick:()=>{var n;const e=window.location.href.replace(window.location.origin,"");i.getProductsInGroup(t.id),(n=o.freeModal)==null||n.showModal(),o.setFreeModalSettings({children:u(p,{}),onClose:()=>s.Inertia.get(e),title:"\u0627\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629"})},children:"\u0639\u0631\u0636 \u0627\u0635\u0646\u0627\u0641 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629"}),u(r,{onClick:()=>{var e;o.setModelToEdit(t),(e=o.modalForm)==null||e.showModal()},icon:u(f,{className:"text-indigo-900"})}),u(r,{danger:!0,type:"dashed",onClick:()=>l.delete(t.id,i.BASE_ROUTE),icon:u(g,{})})]})}],C={modelColumns:h,pageTitle:"\u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0627\u0644\u0627\u0635\u0646\u0627\u0641",search:{defaultValue:"name"},exitSearchMode:o=>{var t;(t=o.search)==null||t.exitSearchMode(),i.index()},addButton:"\u0627\u0636\u0627\u0641\u0629 \u0645\u062C\u0645\u0648\u0639\u0629",slug:"productGroups",pagination:!0};function U(){return u(m,{ModelForm:a,config:C})}export{U as default};