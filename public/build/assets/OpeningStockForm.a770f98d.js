import{r as p,a as h,j as u,ar as d}from"./app.3aad4e87.js";import{S as t,a as r}from"./SelectSearchUtils.f1a8e23b.js";import{F as S}from"./FormComponent.060d84f4.js";import{R as o}from"./index.fe1d2ba1.js";import{I as a}from"./index.bf2ca998.js";import"./useLoading.7900d1a7.js";import"./index.4d07e239.js";import"./index.c383cf70.js";import"./index.39d1b77e.js";import"./CheckOutlined.241343e2.js";const x=({modelToEdit:e,closeModal:n})=>{const[c,m]=p.exports.useState("barcode"),s=[{col:!0},{name:"name_or_code",label:"\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u0628\u062D\u062B \u0641\u064A \u0627\u0644\u0645\u0646\u062A\u062C\u0627\u062A",component:h(o.Group,{onChange:l=>m(l.target.value),children:[u(o,{value:"barcode",children:"\u0628\u0627\u0643\u0648\u062F"}),u(o,{value:"name",children:"\u0628\u0627\u0633\u0645 \u0627\u0644\u0645\u0646\u062A\u062C"})]})},{name:"product_id",label:"\u0627\u0644\u0645\u0646\u062A\u062C",component:u(t,{onSearch:r.getProductByBarcode,placeholder:"\u0627\u0628\u062D\u062B \u0639\u0646 \u0645\u0646\u062A\u062C"})},{name:"stock_id",label:"\u0627\u0644\u0645\u062E\u0632\u0646",component:u(t,{onSearch:r.getStocks,placeholder:"\u0627\u0644\u0645\u062E\u0632\u0646"})},{col:!0},{name:"buying_price",label:"\u0633\u0639\u0631 \u0627\u0644\u0634\u0631\u0627\u0621",component:u(a,{min:0,style:{width:"100%"}})},{name:"quantity",label:"\u0627\u0644\u0643\u0645\u064A\u0629",component:u(a,{min:0,style:{width:"100%"}})}],i=e||{name_or_code:c};return u(S,{baseRoute:d.BASE_ROUTE,formName:"opening_stock_form",formItems:s,initValues:i,modelToEdit:e,closeModal:n})};export{x as default};