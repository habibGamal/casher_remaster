import{k as p,b8 as C,r as A,a as r,R as N,j as e,B as d,C as E}from"./app.3aad4e87.js";import{P as x}from"./PageTitle.30585599.js";import{m as T,E as D,a as O}from"./mapEditableColumns.84f88b83.js";import{u as j}from"./useSearch.9125f7ac.js";import{D as n}from"./index.d9a9a89c.js";import{I as R}from"./index.3e4aed6b.js";import{S as k}from"./index.fe1d2ba1.js";import{T as P}from"./Table.611ad66a.js";function G({title:l,defaultColumns:s,getManager:m}){const u={id:"invoice_id",defaultAttribute:"invoice_id",placeholder:"\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629",options:[{label:"\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629",value:"invoice_id"}]},t=j(u.defaultAttribute),[c,h]=p.useState([]),[v,f]=p.useState({}),I=C().props.invoice_number,b={body:{row:D,cell:O}},w=c.reduce((a,S)=>a+S.total,0),[i,g]=A.exports.useState(!1),o=new m({additionalData:v,setAdditionalData:f,invoiceItems:c,setInvoiceItems:h,search:t,loading:i,setLoading:g}),y=T(s,o.returnInvoiceOperations.edit);return r(N,{gutter:[0,25],className:"m-8",children:[e(x,{name:l}),r("div",{className:"isolate-2 flex justify-between items-center w-full p-8 gap-8",children:[r(n,{className:"w-full",bordered:!0,children:[e(n.Item,{label:"\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629",children:I}),e(n.Item,{label:"\u0627\u0644\u0627\u062C\u0645\u0627\u0644\u064A",children:w.toFixed(2)})]}),e(d,{loading:i,onClick:o.submit.onSubmit,type:"primary",children:"\u0627\u0646\u0634\u0627\u0621 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629"})]}),r(E,{span:"24",className:"isolate",children:[r("div",{className:"flex gap-6 mb-6",children:[e(R,{id:u.id,allowClear:!0,addonBefore:e(k,{defaultValue:t.data.attribute,onChange:t.changeSearchAttribute,options:u.options}),placeholder:u.placeholder,className:"placeholder:font-tajawal",value:t.data.value,onChange:a=>{t.changeSearchValue(a.target.value)},onPressEnter:o.search.onSearch}),e(d,{onClick:o.returnInvoiceOperations.cancelOperation,className:"mx-auto",danger:!0,type:"primary",children:"\u0627\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629"})]}),e(P,{components:b,rowClassName:()=>"editable-row",columns:y,rowKey:a=>a.key.toString(),dataSource:o.returnInvoiceOperations.getInvoiceItems(),pagination:!1,loading:i,bordered:!0,scroll:{x:!0}})]})]})}class H{constructor(s){this.props=s}getInvoiceItems(){throw new Error("This type of Invoice does not support this operation")}add(){throw new Error("This type of Invoice does not support this operation")}edit(){throw new Error("This type of Invoice does not support this operation")}remove(){throw new Error("This type of Invoice does not support this operation")}cancelOperation(){throw new Error("This type of Invoice does not support this operation")}}export{G as D,H as N};
