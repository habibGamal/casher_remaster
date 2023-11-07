import{k as p,r as y,a as o,R as V,j as a,B as h,C as H,v as k,x as K}from"./app.3aad4e87.js";import{P as L}from"./PageTitle.30585599.js";import{S as b,a as S}from"./SelectSearchUtils.f1a8e23b.js";import{m as M,E as O,a as U}from"./mapEditableColumns.84f88b83.js";import{u as $}from"./useSearch.9125f7ac.js";import{h as z,f as G}from"./errorHandlers.e584f717.js";import{D as J}from"./DeleteButton.5e9e11e4.js";import{D as c}from"./index.d9a9a89c.js";import{I as Q}from"./index.3e4aed6b.js";import{S as W}from"./index.fe1d2ba1.js";import{T as X}from"./Table.611ad66a.js";import"./index.05831a02.js";import"./CheckOutlined.241343e2.js";import"./styleChecker.8ba932ef.js";import"./index.39d1b77e.js";import"./index.4d07e239.js";import"./DeleteOutlined.043d105f.js";import"./index.28850fea.js";import"./index.c383cf70.js";function ku(){const g=[{title:"\u0623\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",dataIndex:"name",key:"name"},{title:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",dataIndex:"barcode",key:"barcode"},{title:"\u0633\u0639\u0631 \u0634\u0631\u0627\u0621 \u0627\u0644\u0648\u062D\u062F\u0629",dataIndex:"price",key:"price"},{title:"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629",dataIndex:"quantity",key:"quantity"},{title:"\u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u062D\u0648\u064A\u0644\u0647\u0627",dataIndex:"transfer_quantity",key:"transfer_quantity",editable:!0},{title:"\u062A\u062D\u0643\u0645",dataIndex:"operation",render:(u,e)=>e.children?a(J,{onClick:()=>T(e.key)}):null}],[d,_]=p.useState(null),[A,q]=p.useState(null),x={body:{row:O,cell:U}},[C,m]=y.exports.useState(!1),[i,r]=y.exports.useState([]),I=()=>{k.Inertia.reload({data:{...n.data,stock_id:d},only:["product"],preserveState:!0,onSuccess:u=>{let e=u.props.product;z(e)||w(e)}})},w=u=>{if(i.find(t=>t.key===u.id))return D(u);r(t=>[...t,f(u)])},D=u=>{r(e=>e.map(t=>t.key===u.id?f(u):t))},f=u=>({key:u.id,id:u.id,name:u.name,barcode:u.barcode,quantity:u.stock_items.reduce((e,t)=>e+t.quantity,0),transfer_quantity:0,children:u.stock_items.map(e=>({key:u.id+`${e.id}`,id:e.id,name:"-",barcode:"-",price:e.buying_price,quantity:e.quantity,transfer_quantity:0}))}),E=()=>{r([])},n=$(),v=u=>{if(u.transfer_quantity>u.quantity)return K.error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u0627\u0646 \u062A\u0643\u0648\u0646 \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u0631\u0627\u062F \u062A\u062D\u0648\u064A\u0644\u0647\u0627 \u0627\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0643\u0645\u064A\u0629 \u0627\u0644\u0645\u062A\u0627\u062D\u0629");P(u)},P=u=>{r(e=>e.map(t=>{if(t.children.find(l=>l.key===u.key)){const l=t.children.map(s=>s.key===u.key?{...s,transfer_quantity:u.transfer_quantity}:s),j=l.reduce((s,R)=>s+parseFloat(R.transfer_quantity.toString()),0);return{...t,children:l,transfer_quantity:j}}return t}))},T=u=>{r(e=>e.filter(t=>t.key!==u))},N=()=>{m(!0),k.Inertia.post("/transfer-between-stocks",{from_stock_id:d,to_stock_id:A,stock_items:i.flatMap(u=>u.children).map(u=>({id:u.id,quantity:u.transfer_quantity}))},{preserveScroll:!0,onSuccess:u=>{m(!1),!G(u)&&r([])}})},F=M(g,v),B=i.length>0;return o(V,{gutter:[0,25],className:"m-8",children:[a(L,{name:"\u0627\u0644\u062A\u062D\u0648\u064A\u0644 \u0628\u064A\u0646 \u0627\u0644\u0645\u062E\u0627\u0632\u0646"}),o("div",{className:"isolate-2 flex justify-between items-center w-full p-8 gap-8",children:[o(c,{className:"w-full",bordered:!0,children:[a(c.Item,{label:"\u0645\u0646 \u0627\u0644\u0645\u062E\u0632\u0646",children:a(b,{name:"from_stock_id",style:{width:"12rem"},onSearch:S.getStocks,onChange:u=>_(u),disabled:B})}),a(c.Item,{label:"\u0627\u0644\u0649 \u0627\u0644\u0645\u062E\u0632\u0646",children:a(b,{name:"to_stock_id",style:{width:"12rem"},onSearch:S.getStocks,onChange:u=>q(u)})})]}),a(h,{onClick:N,type:"primary",children:"\u0646\u0642\u0644"})]}),o(H,{span:"24",className:"isolate",children:[o("div",{className:"flex gap-6 mb-6",children:[a(Q,{id:"search_product",allowClear:!0,addonBefore:a(W,{defaultValue:n.data.attribute,onChange:n.changeSearchAttribute,options:[{label:"\u0627\u0644\u0627\u0633\u0645",value:"name"},{label:"\u0627\u0644\u0643\u0648\u062F",value:"barcode"}]}),placeholder:"\u0627\u0644\u0645\u0646\u062A\u062C",className:"placeholder:font-tajawal",value:n.data.value,onChange:u=>{n.changeSearchValue(u.target.value)},onPressEnter:I}),a(h,{onClick:E,className:"mx-auto",danger:!0,type:"primary",children:"\u0627\u0644\u063A\u0627\u0621 \u0627\u0644\u0639\u0645\u0644\u064A\u0629"})]}),a(X,{components:x,rowClassName:()=>"editable-row",columns:F,rowKey:u=>u.key.toString(),dataSource:i,pagination:!1,loading:C,bordered:!0,scroll:{x:!0}})]})]})}export{ku as default};
