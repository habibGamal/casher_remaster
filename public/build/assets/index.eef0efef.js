import{y as _,z as E,b5 as L,H as R,r as u,b as P,c as T,j as C,b6 as A,b7 as X,a as O,am as k,aH as U,F as V}from"./app.3aad4e87.js";function q(o){return typeof o!="string"?o:o.charAt(0).toUpperCase()+o.slice(1)}const h=(o,l,t)=>{const e=q(t);return{[`${o.componentCls}-${l}`]:{color:o[`color${t}`],background:o[`color${e}Bg`],borderColor:o[`color${e}Border`]}}},G=o=>L(o,(l,t)=>{let{textColor:e,lightBorderColor:r,lightColor:a,darkColor:n}=t;return{[`${o.componentCls}-${l}`]:{color:e,background:a,borderColor:r,"&-inverse":{color:o.colorTextLightSolid,background:n,borderColor:n}}}}),J=o=>{const{paddingXXS:l,lineWidth:t,tagPaddingHorizontal:e,componentCls:r}=o,a=e-t,n=l-t;return{[r]:Object.assign(Object.assign({},R(o)),{display:"inline-block",height:"auto",marginInlineEnd:o.marginXS,paddingInline:a,fontSize:o.tagFontSize,lineHeight:`${o.tagLineHeight}px`,whiteSpace:"nowrap",background:o.tagDefaultBg,border:`${o.lineWidth}px ${o.lineType} ${o.colorBorder}`,borderRadius:o.borderRadiusSM,opacity:1,transition:`all ${o.motionDurationMid}`,textAlign:"start",[`&${r}-rtl`]:{direction:"rtl"},"&, a, a:hover":{color:o.tagDefaultColor},[`${r}-close-icon`]:{marginInlineStart:n,color:o.colorTextDescription,fontSize:o.tagIconSize,cursor:"pointer",transition:`all ${o.motionDurationMid}`,"&:hover":{color:o.colorTextHeading}},[`&${r}-has-color`]:{borderColor:"transparent",[`&, a, a:hover, ${o.iconCls}-close, ${o.iconCls}-close:hover`]:{color:o.colorTextLightSolid}},["&-checkable"]:{backgroundColor:"transparent",borderColor:"transparent",cursor:"pointer",[`&:not(${r}-checkable-checked):hover`]:{color:o.colorPrimary,backgroundColor:o.colorFillSecondary},"&:active, &-checked":{color:o.colorTextLightSolid},"&-checked":{backgroundColor:o.colorPrimary,"&:hover":{backgroundColor:o.colorPrimaryHover}},"&:active":{backgroundColor:o.colorPrimaryActive}},["&-hidden"]:{display:"none"},[`> ${o.iconCls} + span, > span + ${o.iconCls}`]:{marginInlineStart:a}})}},I=_("Tag",o=>{const{fontSize:l,lineHeight:t,lineWidth:e,fontSizeIcon:r}=o,a=Math.round(l*t),n=o.fontSizeSM,p=a-e*2,s=o.colorFillAlter,i=o.colorText,c=E(o,{tagFontSize:n,tagLineHeight:p,tagDefaultBg:s,tagDefaultColor:i,tagIconSize:r-2*e,tagPaddingHorizontal:8});return[J(c),G(c),h(c,"success","Success"),h(c,"processing","Info"),h(c,"error","Error"),h(c,"warning","Warning")]});var K=globalThis&&globalThis.__rest||function(o,l){var t={};for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&l.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(o);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(o,e[r])&&(t[e[r]]=o[e[r]]);return t};const Q=o=>{var{prefixCls:l,className:t,checked:e,onChange:r,onClick:a}=o,n=K(o,["prefixCls","className","checked","onChange","onClick"]);const{getPrefixCls:p}=u.exports.useContext(P),s=f=>{r==null||r(!e),a==null||a(f)},i=p("tag",l),[c,b]=I(i),d=T(i,{[`${i}-checkable`]:!0,[`${i}-checkable-checked`]:e},t,b);return c(C("span",{...Object.assign({},n,{className:d,onClick:s})}))},Y=Q;var Z=globalThis&&globalThis.__rest||function(o,l){var t={};for(var e in o)Object.prototype.hasOwnProperty.call(o,e)&&l.indexOf(e)<0&&(t[e]=o[e]);if(o!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(o);r<e.length;r++)l.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(o,e[r])&&(t[e[r]]=o[e[r]]);return t};const oo=(o,l)=>{var{prefixCls:t,className:e,rootClassName:r,style:a,children:n,icon:p,color:s,onClose:i,closeIcon:c,closable:b=!1}=o,d=Z(o,["prefixCls","className","rootClassName","style","children","icon","color","onClose","closeIcon","closable"]);const{getPrefixCls:f,direction:z}=u.exports.useContext(P),[N,S]=u.exports.useState(!0);u.exports.useEffect(()=>{"visible"in d&&S(d.visible)},[d.visible]);const m=A(s)||X(s),w=Object.assign({backgroundColor:s&&!m?s:void 0},a),g=f("tag",t),[H,B]=I(g),D=T(g,{[`${g}-${s}`]:m,[`${g}-has-color`]:s&&!m,[`${g}-hidden`]:!N,[`${g}-rtl`]:z==="rtl"},e,r,B),x=y=>{y.stopPropagation(),i==null||i(y),!y.defaultPrevented&&S(!1)},F=()=>b?c?C("span",{className:`${g}-close-icon`,onClick:x,children:c}):C(U,{className:`${g}-close-icon`,onClick:x}):null,M=typeof d.onClick=="function"||n&&n.type==="a",v=p||null,W=v?O(V,{children:[v,C("span",{children:n})]}):n,$=O("span",{...Object.assign({},d,{ref:l,className:D,style:w}),children:[W,F()]});return H(M?C(k,{children:$}):$)},j=u.exports.forwardRef(oo);j.CheckableTag=Y;const ro=j;export{ro as T};
