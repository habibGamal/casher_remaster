var s=Object.defineProperty;var o=(r,t,e)=>t in r?s(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var u=(r,t,e)=>(o(r,typeof t!="symbol"?t+"":t,e),e);import{M as n,N as c,D as p}from"./NoReturnOperations.df2eeaf5.js";import{v as a,x as h,ar as m,j as l}from"./app.3aad4e87.js";import{C as d}from"./CreateInvoiceManager.55a1c683.js";import"./PageTitle.30585599.js";import"./index.05831a02.js";import"./CheckOutlined.241343e2.js";import"./styleChecker.8ba932ef.js";import"./index.3e4aed6b.js";import"./index.39d1b77e.js";import"./mapEditableColumns.84f88b83.js";import"./index.4d07e239.js";import"./useSearch.9125f7ac.js";import"./SelectSearchUtils.f1a8e23b.js";import"./index.fe1d2ba1.js";import"./DeleteButton.5e9e11e4.js";import"./DeleteOutlined.043d105f.js";import"./index.d9a9a89c.js";import"./Table.611ad66a.js";import"./index.28850fea.js";import"./index.c383cf70.js";class y extends n{constructor(t){super(t),this.props=t}increaseItem(t,e){const i={...t};return i.quantity+=e,i.total=parseFloat((i.quantity*i.price).toFixed(2)),i}validation(t){return!0}correctTotal(t){return{...t,total:parseFloat((t.price*t.quantity).toFixed(2))}}}class S extends d{constructor(e){super();u(this,"search");u(this,"submit");u(this,"invoiceOperations");u(this,"returnInvoiceOperations");this.props=e,this.invoiceOperations=new y(e),this.returnInvoiceOperations=new c(null),this.afterSearch=this.afterSearch.bind(this),this.search=new b({attribute:this.props.search.data.attribute,value:this.props.search.data.value},this.afterSearch),this.submit=new I(this.props)}afterSearch(e){this.invoiceOperations.add(e),this.props.search.changeSearchValue("")}displayInvoiceNumber(e){return null}actionBtnTitle(){return"\u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0631\u0635\u064A\u062F"}}class b{constructor(t,e){u(this,"factory");this.searchParams=t,this.afterSearch=e,this.onSearch=this.onSearch.bind(this),this.factory=new f}onSearch(){a.Inertia.reload({data:this.searchParams,only:["product","flash"],preserveState:!0,onSuccess:t=>{let e=t.props.product;if(e===null)return h.error("\u0627\u0644\u0645\u0646\u062A\u062C \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F");const i=this.factory.factory(e);this.afterSearch(i)}})}}class f{factory(t){return{key:t.id.toString(),id:t.id,product_id:t.id,quantity:1,name:t.name,barcode:t.barcode,price:t.last_buying_price,total:t.last_buying_price*1}}}class I{constructor(t){this.props=t,this.onSubmit=this.onSubmit.bind(this)}remapItemsToSubmit(){return this.props.invoiceItems.map(t=>({product_id:t.product_id,quantity:t.quantity,buying_price:t.price}))}onSubmit(){this.props.setLoading(!0),a.Inertia.post(m.storeURL(),{items:this.remapItemsToSubmit(),stock_id:this.props.stockId},{onSuccess:t=>{this.props.setLoading(!1),t.props.flash.error||this.props.setInvoiceItems([])}})}}function V(){return l(p,{title:"\u0627\u0644\u0627\u0631\u0635\u062F\u0629 \u0627\u0644\u0627\u0641\u062A\u062A\u0627\u062D\u064A\u0629",defaultColumns:[{title:"\u0623\u0633\u0645 \u0627\u0644\u0635\u0646\u0641",dataIndex:"name",key:"name"},{title:"\u0643\u0648\u062F \u0627\u0644\u0635\u0646\u0641",dataIndex:"barcode",key:"barcode"},{title:"\u0633\u0639\u0631 \u0634\u0631\u0627\u0621 \u0627\u0644\u0648\u062D\u062F\u0629",dataIndex:"price",key:"price",editable:!0},{title:"\u0639\u062F\u062F \u0627\u0644\u0648\u062D\u062F\u0627\u062A",dataIndex:"quantity",key:"quantity",editable:!0},{title:"\u0627\u0644\u0627\u062C\u0645\u0627\u0644\u064A",dataIndex:"total",key:"total"}],getManager:S})}export{V as default};
