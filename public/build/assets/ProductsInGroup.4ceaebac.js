import{r as t,j as u,R as a,a as s,C as n,aX as l,B as i,aW as d}from"./app.3aad4e87.js";import{M as c}from"./ModelDisplayBase.6cf1539a.js";import{S as m}from"./index.c383cf70.js";import{D as p}from"./DeleteOutlined.043d105f.js";import"./index.3e4aed6b.js";import"./index.39d1b77e.js";import"./index.4d07e239.js";import"./index.fe1d2ba1.js";import"./CheckOutlined.241343e2.js";import"./useLoading.7900d1a7.js";import"./Table.611ad66a.js";import"./styleChecker.8ba932ef.js";import"./index.28850fea.js";function h({config:o}){const e=t.exports.useMemo(()=>new c(o),[]);return u(a,{gutter:[0,25],className:"m-8",children:u(e.Ctx,{children:s(n,{span:"24",className:"isolate",children:[u(e.TableController,{}),u(e.ModelTable,{})]})})})}const f=[{title:"\u0623\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",dataIndex:"name",key:"name"},{title:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",dataIndex:"barcode",key:"barcode"},{title:"\u062A\u062D\u0643\u0645",key:"control",render:o=>u(m,{size:"middle",children:u(i,{danger:!0,onClick:()=>{d.removeProductFromGroup(o.id)},icon:u(p,{}),children:"\u0627\u0632\u0627\u0644\u0629 \u0645\u0646 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629"})})}],x={modelColumns:f,search:{defaultValue:"name",options:[{value:"name",label:"\u0627\u0633\u0645 \u0627\u0644\u0635\u0646\u0641"},{value:"barcode",label:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641"}]},exitSearchMode:o=>{var r;(r=o.search)==null||r.exitSearchMode();const e=new URLSearchParams(window.location.search).get("productGroupId");!e||l.getProductsInGroup(parseInt(e))},addButton:null,slug:"productsInGroup"};function B(){return u(h,{config:x})}export{B as default};