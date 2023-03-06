import{u as V,a as e,j as r,F as g,a1 as C,a2 as v,b as _,d as I}from"./app.0e9403f5.js";import{A as b,b as A}from"./Assets.4426f7a3.js";import{u as F,f as S,a as k,M as E,D as T}from"./useModal.93e44c41.js";import P from"./Layout.dfd89ff1.js";import{E as M}from"./index.3b13b7dc.js";import{T as q}from"./index.2db8425c.js";import{B as m}from"./button.5253f3cb.js";import{F as t}from"./index.2c2f005b.js";import{I as l}from"./index.9f46615a.js";import{m as x}from"./index.0df5407b.js";import{f as D}from"./faCaretRight.94301215.js";import{M as w}from"./MinusCircleOutlined.1e79c5ad.js";import{P as N}from"./PlusOutlined.cf2f5585.js";import"./ImagesHandler.e7d6fa9d.js";import"./ActionButton.83392556.js";import"./index.ba991639.js";import"./type.6e629d5d.js";import"./getScrollBarSize.001053fa.js";import"./KeyCode.bb3c3291.js";import"./pickAttrs.90032313.js";import"./Up.1face89a.js";import"./motion.1282811a.js";import"./Dropdown.6d82ef6d.js";import"./index.92e459fd.js";import"./Overflow.a3e00ae0.js";const L=({assets:d})=>{const[n]=t.useForm(),{errors:a}=_().props,p=s=>{I.Inertia.post(b.insertVideos(),{...s,name:d.name,assets_type:d.assetsType},{onSuccess:()=>{n.resetFields(),x.success("Data uploaded Successfuly")}})};return console.log(a),r("div",{className:"rounded bg-slate-50 shadow-sm p-4 my-16",children:[r("span",{className:"mb-4 block",children:[e(v,{icon:D.faCaretRight})," Add new group video"]}),r(t,{form:n,name:"add_new_assets",className:"max-w-[500px] mx-auto",initialValues:{remember:!0},onFinish:p,autoComplete:"off",method:"post",encType:"multipart/form-data",children:[e(t.Item,{name:"group_name",rules:[{required:!0,message:"Please insert the name of the group"}],children:e(l,{placeholder:"Group Name"})}),e(t.Item,{name:"playlist_id",validateStatus:(a==null?void 0:a.playlist_id)&&"error",help:a==null?void 0:a.playlist_id,children:e(l,{placeholder:"Playlist id"})}),e(T,{}),e(t.List,{name:"videos",children:(s,{add:y,remove:o},{errors:c})=>r(g,{children:[s.map((i,u)=>r(t.Item,{label:`Video no ${u+1}`,required:!0,children:[e(t.Item,{...i,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input embed code here"}],noStyle:!0,children:e(l.TextArea,{placeholder:"Embed code",style:{width:"80%"}})}),e(w,{className:"dynamic-delete-button mx-2",onClick:()=>o(i.name)})]},i.key)),r(t.Item,{wrapperCol:{offset:6,span:16},children:[e(m,{type:"dashed",onClick:()=>y(),icon:e(N,{}),children:"Add video"}),e(t.ErrorList,{errors:c})]})]})}),e(t.Item,{children:e(m,{type:"primary",htmlType:"submit",children:"Submit"})})]})]})},O=({group:d,name:n,close:a})=>{const[p]=t.useForm(),{errors:s}=_().props;return r(t,{form:p,name:"edit_videos",className:"max-w-[500px] mx-auto",initialValues:{remember:!0},onFinish:o=>{I.Inertia.post(b.editVideos(),{...o,group_id:d.id,name:n,assets_type:A.videos},{onSuccess:()=>{p.resetFields(),x.success("Data uploaded Successfuly"),a()}})},autoComplete:"off",method:"post",encType:"multipart/form-data",children:[e(t.Item,{name:"group_name",initialValue:d.name,rules:[{required:!0,message:"Please insert the name of the group"}],children:e(l,{placeholder:"Group Name"})}),e(t.Item,{name:"playlist_id",validateStatus:(s==null?void 0:s.playlist_id)&&"error",help:s==null?void 0:s.playlist_id,children:e(l,{placeholder:"Playlist id"})}),e(T,{}),e(t.List,{name:"videos",initialValue:d.videos,children:(o,{add:c,remove:i},{errors:u})=>r(g,{children:[o.map((h,f)=>r(t.Item,{label:`Video no ${f+1}`,required:!0,children:[e(t.Item,{...h,validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"Please input embed code here"}],noStyle:!0,children:e(l.TextArea,{placeholder:"Embed code",style:{width:"80%"}})}),e(w,{className:"dynamic-delete-button mx-2",onClick:()=>i(h.name)})]},h.key)),r(t.Item,{wrapperCol:{offset:6,span:16},children:[e(m,{type:"dashed",onClick:()=>c(),icon:e(N,{}),children:"Add video"}),e(t.ErrorList,{errors:u})]})]})}),e(t.Item,{children:e(m,{type:"primary",htmlType:"submit",children:"Submit Changes"})})]})};function me({assetsDB:d}){V();const[{isOpen:n,data:a},p,s,y]=F(),o=new b(d),c=i=>I.Inertia.post(b.removeVideos(),{group_id:i.id,name:o.name,assets_type:o.assetsType});return e(P,{children:r(g,{children:[e(C,{children:e(L,{assets:o})}),o.videos.length===0?e(M,{description:"No data yet"}):e(q,{defaultActiveKey:"1",tabPosition:"left",className:"bg-slate-50 rounded p-4",items:o.videos.map((i,u)=>({label:r("div",{className:"flex gap-4",children:[e("p",{children:i.name}),r(C,{children:[e(m,{onClick:()=>y({group:i,name:o.name}),size:"small",type:"dashed",icon:e(v,{className:"text-gray-600",icon:S.faEdit})}),e(m,{onClick:()=>c(i),size:"small",danger:!0,icon:e(v,{icon:k.faTrash})})]})]}),key:i.id,disabled:u===28,children:e(g,{children:i.videos.map((h,f)=>e("div",{className:"rounded shadow p-4 bg-gray-100 my-4",children:e("div",{className:"meeting-iframe",dangerouslySetInnerHTML:{__html:h}},f)},f))})}))}),e(E,{title:"Edit Videos",open:n,onCancel:s,footer:null,destroyOnClose:!0,children:a&&e(O,{group:a.group,name:a.name,close:s})})]})})}export{me as default};
