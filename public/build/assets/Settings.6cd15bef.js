import{r as o,g as R,u as W,h as X,c as T,e as z,a as h,j as c,ae as N,y as F,z as K,ak as B,H as Q,al as V,b as _,S as q,D as G,am as J,a0 as U,an as Y,ao as Z,R as k,C as ii,ap as ni,aq as ei,B as v,v as D}from"./app.3aad4e87.js";import{P as ai}from"./PageTitle.30585599.js";import{T as $}from"./index.05831a02.js";import{I as ti}from"./index.3e4aed6b.js";import"./CheckOutlined.241343e2.js";import"./styleChecker.8ba932ef.js";import"./index.39d1b77e.js";var ci=["prefixCls","className","checked","defaultChecked","disabled","loadingIcon","checkedChildren","unCheckedChildren","onClick","onChange","onKeyDown"],H=o.exports.forwardRef(function(i,n){var e,a=i.prefixCls,t=a===void 0?"rc-switch":a,s=i.className,r=i.checked,w=i.defaultChecked,g=i.disabled,x=i.loadingIcon,M=i.checkedChildren,C=i.unCheckedChildren,p=i.onClick,S=i.onChange,l=i.onKeyDown,b=R(i,ci),f=W(!1,{value:r,defaultValue:w}),m=X(f,2),u=m[0],O=m[1];function y(d,P){var I=u;return g||(I=d,O(I),S==null||S(I,P)),I}function A(d){d.which===N.LEFT?y(!1,d):d.which===N.RIGHT&&y(!0,d),l==null||l(d)}function L(d){var P=y(!u,d);p==null||p(P,d)}var j=T(t,s,(e={},z(e,"".concat(t,"-checked"),u),z(e,"".concat(t,"-disabled"),g),e));return h("button",{...b,type:"button",role:"switch","aria-checked":u,disabled:g,className:j,ref:n,onKeyDown:A,onClick:L,children:[x,h("span",{className:"".concat(t,"-inner"),children:[c("span",{className:"".concat(t,"-inner-checked"),children:M}),c("span",{className:"".concat(t,"-inner-unchecked"),children:C})]})]})});H.displayName="Switch";const si=i=>{const{componentCls:n}=i,e=`${n}-inner`;return{[n]:{[`&${n}-small`]:{minWidth:i.switchMinWidthSM,height:i.switchHeightSM,lineHeight:`${i.switchHeightSM}px`,[`${n}-inner`]:{paddingInlineStart:i.switchInnerMarginMaxSM,paddingInlineEnd:i.switchInnerMarginMinSM,[`${e}-checked`]:{marginInlineStart:`calc(-100% + ${i.switchPinSizeSM+i.switchPadding*2}px - ${i.switchInnerMarginMaxSM*2}px)`,marginInlineEnd:`calc(100% - ${i.switchPinSizeSM+i.switchPadding*2}px + ${i.switchInnerMarginMaxSM*2}px)`},[`${e}-unchecked`]:{marginTop:-i.switchHeightSM,marginInlineStart:0,marginInlineEnd:0}},[`${n}-handle`]:{width:i.switchPinSizeSM,height:i.switchPinSizeSM},[`${n}-loading-icon`]:{top:(i.switchPinSizeSM-i.switchLoadingIconSize)/2,fontSize:i.switchLoadingIconSize},[`&${n}-checked`]:{[`${n}-inner`]:{paddingInlineStart:i.switchInnerMarginMinSM,paddingInlineEnd:i.switchInnerMarginMaxSM,[`${e}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${e}-unchecked`]:{marginInlineStart:`calc(100% - ${i.switchPinSizeSM+i.switchPadding*2}px + ${i.switchInnerMarginMaxSM*2}px)`,marginInlineEnd:`calc(-100% + ${i.switchPinSizeSM+i.switchPadding*2}px - ${i.switchInnerMarginMaxSM*2}px)`}},[`${n}-handle`]:{insetInlineStart:`calc(100% - ${i.switchPinSizeSM+i.switchPadding}px)`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${e}`]:{[`${e}-unchecked`]:{marginInlineStart:i.marginXXS/2,marginInlineEnd:-i.marginXXS/2}},[`&${n}-checked ${e}`]:{[`${e}-checked`]:{marginInlineStart:-i.marginXXS/2,marginInlineEnd:i.marginXXS/2}}}}}}},ri=i=>{const{componentCls:n}=i;return{[n]:{[`${n}-loading-icon${i.iconCls}`]:{position:"relative",top:(i.switchPinSize-i.fontSize)/2,color:i.switchLoadingIconColor,verticalAlign:"top"},[`&${n}-checked ${n}-loading-icon`]:{color:i.switchColor}}}},li=i=>{const{componentCls:n}=i,e=`${n}-handle`;return{[n]:{[e]:{position:"absolute",top:i.switchPadding,insetInlineStart:i.switchPadding,width:i.switchPinSize,height:i.switchPinSize,transition:`all ${i.switchDuration} ease-in-out`,"&::before":{position:"absolute",top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0,backgroundColor:i.colorWhite,borderRadius:i.switchPinSize/2,boxShadow:i.switchHandleShadow,transition:`all ${i.switchDuration} ease-in-out`,content:'""'}},[`&${n}-checked ${e}`]:{insetInlineStart:`calc(100% - ${i.switchPinSize+i.switchPadding}px)`},[`&:not(${n}-disabled):active`]:{[`${e}::before`]:{insetInlineEnd:i.switchHandleActiveInset,insetInlineStart:0},[`&${n}-checked ${e}::before`]:{insetInlineEnd:0,insetInlineStart:i.switchHandleActiveInset}}}}},di=i=>{const{componentCls:n}=i,e=`${n}-inner`;return{[n]:{[e]:{display:"block",overflow:"hidden",borderRadius:100,height:"100%",paddingInlineStart:i.switchInnerMarginMax,paddingInlineEnd:i.switchInnerMarginMin,transition:`padding-inline-start ${i.switchDuration} ease-in-out, padding-inline-end ${i.switchDuration} ease-in-out`,[`${e}-checked, ${e}-unchecked`]:{display:"block",color:i.colorTextLightSolid,fontSize:i.fontSizeSM,transition:`margin-inline-start ${i.switchDuration} ease-in-out, margin-inline-end ${i.switchDuration} ease-in-out`,pointerEvents:"none"},[`${e}-checked`]:{marginInlineStart:`calc(-100% + ${i.switchPinSize+i.switchPadding*2}px - ${i.switchInnerMarginMax*2}px)`,marginInlineEnd:`calc(100% - ${i.switchPinSize+i.switchPadding*2}px + ${i.switchInnerMarginMax*2}px)`},[`${e}-unchecked`]:{marginTop:-i.switchHeight,marginInlineStart:0,marginInlineEnd:0}},[`&${n}-checked ${e}`]:{paddingInlineStart:i.switchInnerMarginMin,paddingInlineEnd:i.switchInnerMarginMax,[`${e}-checked`]:{marginInlineStart:0,marginInlineEnd:0},[`${e}-unchecked`]:{marginInlineStart:`calc(100% - ${i.switchPinSize+i.switchPadding*2}px + ${i.switchInnerMarginMax*2}px)`,marginInlineEnd:`calc(-100% + ${i.switchPinSize+i.switchPadding*2}px - ${i.switchInnerMarginMax*2}px)`}},[`&:not(${n}-disabled):active`]:{[`&:not(${n}-checked) ${e}`]:{[`${e}-unchecked`]:{marginInlineStart:i.switchPadding*2,marginInlineEnd:-i.switchPadding*2}},[`&${n}-checked ${e}`]:{[`${e}-checked`]:{marginInlineStart:-i.switchPadding*2,marginInlineEnd:i.switchPadding*2}}}}}},oi=i=>{const{componentCls:n}=i;return{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},Q(i)),{position:"relative",display:"inline-block",boxSizing:"border-box",minWidth:i.switchMinWidth,height:i.switchHeight,lineHeight:`${i.switchHeight}px`,verticalAlign:"middle",background:i.colorTextQuaternary,border:"0",borderRadius:100,cursor:"pointer",transition:`all ${i.motionDurationMid}`,userSelect:"none",[`&:hover:not(${n}-disabled)`]:{background:i.colorTextTertiary}}),V(i)),{[`&${n}-checked`]:{background:i.switchColor,[`&:hover:not(${n}-disabled)`]:{background:i.colorPrimaryHover}},[`&${n}-loading, &${n}-disabled`]:{cursor:"not-allowed",opacity:i.switchDisabledOpacity,"*":{boxShadow:"none",cursor:"not-allowed"}},[`&${n}-rtl`]:{direction:"rtl"}})}},hi=F("Switch",i=>{const n=i.fontSize*i.lineHeight,e=i.controlHeight/2,a=2,t=n-a*2,s=e-a*2,r=K(i,{switchMinWidth:t*2+a*4,switchHeight:n,switchDuration:i.motionDurationMid,switchColor:i.colorPrimary,switchDisabledOpacity:i.opacityLoading,switchInnerMarginMin:t/2,switchInnerMarginMax:t+a+a*2,switchPadding:a,switchPinSize:t,switchBg:i.colorBgContainer,switchMinWidthSM:s*2+a*2,switchHeightSM:e,switchInnerMarginMinSM:s/2,switchInnerMarginMaxSM:s+a+a*2,switchPinSizeSM:s,switchHandleShadow:`0 2px 4px 0 ${new B("#00230b").setAlpha(.2).toRgbString()}`,switchLoadingIconSize:i.fontSizeIcon*.75,switchLoadingIconColor:`rgba(0, 0, 0, ${i.opacityLoading})`,switchHandleActiveInset:"-30%"});return[oi(r),di(r),li(r),ri(r),si(r)]});var gi=globalThis&&globalThis.__rest||function(i,n){var e={};for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&n.indexOf(a)<0&&(e[a]=i[a]);if(i!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,a=Object.getOwnPropertySymbols(i);t<a.length;t++)n.indexOf(a[t])<0&&Object.prototype.propertyIsEnumerable.call(i,a[t])&&(e[a[t]]=i[a[t]]);return e};const E=o.exports.forwardRef((i,n)=>{var{prefixCls:e,size:a,disabled:t,loading:s,className:r,rootClassName:w}=i,g=gi(i,["prefixCls","size","disabled","loading","className","rootClassName"]);const{getPrefixCls:x,direction:M}=o.exports.useContext(_),C=o.exports.useContext(q),p=o.exports.useContext(G),S=(t!=null?t:p)||s,l=x("switch",e),b=c("div",{className:`${l}-handle`,children:s&&c(U,{className:`${l}-loading-icon`})}),[f,m]=hi(l),u=T({[`${l}-small`]:(a||C)==="small",[`${l}-loading`]:s,[`${l}-rtl`]:M==="rtl"},r,w,m);return f(c(J,{children:c(H,{...Object.assign({},g,{prefixCls:l,className:u,disabled:S,ref:n,loadingIcon:b})})}))});E.__ANT_SWITCH=!0;const ui=E,wi=({actionName:i,title:n,btnText:e,danger:a})=>{const[t,s]=o.exports.useState(!1),r=()=>{s(!0),D.Inertia.get("/settings/"+i,{},{onSuccess:()=>s(!1)})};return h("div",{className:"flex gap-4 items-center",children:[c($.Text,{children:n}),c(v,{loading:t,type:"primary",onClick:r,danger:a,children:e})]})},pi=({route:i,title:n,defaultValue:e})=>{const[a,t]=o.exports.useState(!1),s=()=>{t(!0),D.Inertia.post("/settings/"+i,{value:r},{onSuccess:()=>t(!1)})},[r,w]=o.exports.useState(e);return h("div",{className:"flex gap-4 items-center",children:[c($.Text,{children:n}),c(ti,{value:r,className:"max-w-[300px]",onChange:g=>{w(g.target.value)}}),c(v,{loading:a,onClick:s,type:"primary",children:"\u062A\u062D\u062F\u064A\u062B"})]})};function bi({dns:i}){const n=o.exports.useContext(Y),e=t=>{n==null||n.toggleTheme(t?"dark":"light")},a=Z();return h(k,{gutter:[0,25],className:"m-8",children:[c(ai,{name:"\u0627\u0644\u0627\u0639\u062F\u0627\u062F\u0627\u062A"}),c(ii,{span:"24",className:"isolate",children:h("div",{className:"grid gap-8 grid-cols-2",children:[h("div",{className:"flex gap-4",children:[c($.Text,{children:"\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0645\u0638\u0644\u0645"}),c(ui,{defaultChecked:(n==null?void 0:n.currentTheme)=="dark",onChange:e})]}),c(wi,{actionName:"drop-database",title:"\u0645\u0633\u062D \u0642\u0627\u0639\u062F\u0629 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A",btnText:"\u0645\u0633\u062D",danger:!0}),c(pi,{route:"update-dns",title:"DNS",defaultValue:i}),c(ni,{title:"QR Code Scanner",open:a.open,onOk:a.handleOk,onCancel:a.closeModal,children:c(ei,{className:"mx-auto my-8",value:i})}),h("div",{className:"flex gap-4 items-center",children:[c($.Text,{children:"\u0631\u0628\u0637 \u0627\u0644\u0646\u0638\u0627\u0645 \u0628\u0627\u0644\u0647\u0627\u062A\u0641"}),c(v,{type:"primary",onClick:()=>a.showModal(),children:"\u0639\u0631\u0636 QR"})]})]})})]})}export{bi as default};
