import{P as i}from"./PageTitle.30585599.js";import{a as o,R as n,j as t,C as r}from"./app.3aad4e87.js";import{D as a}from"./index.d9a9a89c.js";import{T as l}from"./Table.611ad66a.js";import"./index.05831a02.js";import"./CheckOutlined.241343e2.js";import"./styleChecker.8ba932ef.js";import"./index.3e4aed6b.js";import"./index.39d1b77e.js";import"./index.fe1d2ba1.js";import"./index.28850fea.js";import"./index.c383cf70.js";const s=[{title:"\u0623\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",dataIndex:"name",key:"name"},{title:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",dataIndex:"barcode",key:"barcode"},{title:"\u0633\u0639\u0631 \u0627\u0644\u0634\u0631\u0627\u0621",dataIndex:"buying_price",key:"buying_price"},{title:"\u0639\u062F\u062F \u0627\u0644\u0648\u062D\u062F\u0627\u062A",dataIndex:"quantity",key:"quantity"},{title:"\u0627\u0644\u0627\u062C\u0645\u0627\u0644\u064A",dataIndex:"total_cost",key:"total_cost"}],c=u=>u.buying_invoice_items.map(e=>({name:e.box.product.name,barcode:e.box.product.barcode,buying_price:e.box.buying_price,quantity:e.quantity,total_cost:e.quantity*e.box.buying_price}));function k({data:u}){return console.log(u),o(n,{gutter:[0,25],className:"m-8",children:[t(i,{name:"\u0639\u0631\u0636 \u0641\u0627\u062A\u0648\u0631\u0629 \u0645\u0634\u062A\u0631\u064A\u0627\u062A"}),t(r,{span:"24",className:"isolate-2",children:o(a,{className:"w-full",bordered:!0,children:[t(a.Item,{label:"\u0631\u0642\u0645 \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629",children:u.id}),t(a.Item,{label:"\u0627\u0644\u0627\u062C\u0645\u0627\u0644\u064A",children:u.total_cost}),t(a.Item,{label:"\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629",children:u.created_at})]})}),t(r,{span:"24",className:"isolate",children:t(l,{columns:s,dataSource:c(u),pagination:!1})})]})}export{k as default};