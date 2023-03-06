import{r as s,e as w,c as u,a as d,O as $t,w as U,A as At,B as Rt,D as jt,S as Dt,s as Wt,n as Bt,E as Ft,i as Mt,f as dt,j as mt,_ as Vt}from"./app.0e9403f5.js";import{t as q,o as Gt}from"./type.6e629d5d.js";import{C as L,i as Ut,f as Ht,L as vt,S as qt,D as Jt}from"./index.0df5407b.js";var ht=s.exports.isValidElement;function Kt(r){return r&&ht(r)&&r.type===s.exports.Fragment}function Qt(r,n,a){return ht(r)?s.exports.cloneElement(r,typeof a=="function"?a(r.props||{}):a):n}function xt(r,n){return Qt(r,r,n)}var Ct=globalThis&&globalThis.__rest||function(r,n){var a={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&n.indexOf(t)<0&&(a[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,t=Object.getOwnPropertySymbols(r);e<t.length;e++)n.indexOf(t[e])<0&&Object.prototype.propertyIsEnumerable.call(r,t[e])&&(a[t[e]]=r[t[e]]);return a},$=s.exports.createContext(null),Xt=function(n,a){var t=s.exports.useContext($),e=s.exports.useMemo(function(){var i;if(!t)return"";var o=t.compactDirection,c=t.isFirstItem,l=t.isLastItem,m=o==="vertical"?"-vertical-":"-";return w((i={},u(i,"".concat(n,"-compact").concat(m,"item"),!0),u(i,"".concat(n,"-compact").concat(m,"first-item"),c),u(i,"".concat(n,"-compact").concat(m,"last-item"),l),u(i,"".concat(n,"-compact").concat(m,"item-rtl"),a==="rtl"),i))},[n,a,t]);return{compactSize:t==null?void 0:t.compactSize,compactDirection:t==null?void 0:t.compactDirection,compactItemClassnames:e}},ge=function(n){var a=n.children;return d($.Provider,{value:null,children:a})},Yt=function(n){var a=n.children,t=Ct(n,["children"]);return d($.Provider,{value:t,children:a})},he=function(n){var a,t=s.exports.useContext(L),e=t.getPrefixCls,i=t.direction,o=n.size,c=o===void 0?"middle":o,l=n.direction,m=n.block,h=n.prefixCls,p=n.className,C=n.children,b=Ct(n,["size","direction","block","prefixCls","className","children"]),y=e("space-compact",h),g=w(y,(a={},u(a,"".concat(y,"-rtl"),i==="rtl"),u(a,"".concat(y,"-block"),m),u(a,"".concat(y,"-vertical"),l==="vertical"),a),p),f=s.exports.useContext($),x=$t(C),A=s.exports.useMemo(function(){return x.map(function(E,I){var P=E&&E.key||"".concat(y,"-item-").concat(I);return d(Yt,{compactSize:c,compactDirection:l,isFirstItem:I===0&&(!f||(f==null?void 0:f.isFirstItem)),isLastItem:I===x.length-1&&(!f||(f==null?void 0:f.isLastItem)),children:E},P)})},[c,x,f]);return x.length===0?null:d("div",{className:g,...b,children:A})},Zt=0,k={};function z(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1,a=Zt++,t=n;function e(){t-=1,t<=0?(r(),delete k[a]):k[a]=U(e)}return k[a]=U(e),a}z.cancel=function(n){n!==void 0&&(U.cancel(k[n]),delete k[n])};z.ids=k;var F;function pt(r){return!r||r.offsetParent===null||r.hidden}function te(r){return r instanceof Document?r.body:Array.from(r.childNodes).find(function(n){return(n==null?void 0:n.nodeType)===Node.ELEMENT_NODE})}function ee(r){var n=(r||"").match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);return n&&n[1]&&n[2]&&n[3]?!(n[1]===n[2]&&n[2]===n[3]):!0}var bt=function(r){At(a,r);var n=Rt(a);function a(){var t;return jt(this,a),t=n.apply(this,arguments),t.containerRef=s.exports.createRef(),t.animationStart=!1,t.destroyed=!1,t.onClick=function(e,i){var o,c,l=t.props,m=l.insertExtraNode,h=l.disabled;if(!(h||!e||pt(e)||e.className.includes("-leave"))){t.extraNode=document.createElement("div");var p=Dt(t),C=p.extraNode,b=t.context.getPrefixCls;C.className="".concat(b(""),"-click-animating-node");var y=t.getAttributeName();if(e.setAttribute(y,"true"),i&&i!=="#fff"&&i!=="#ffffff"&&i!=="rgb(255, 255, 255)"&&i!=="rgba(255, 255, 255, 1)"&&ee(i)&&!/rgba\((?:\d*, ){3}0\)/.test(i)&&i!=="transparent"){C.style.borderColor=i;var g=((o=e.getRootNode)===null||o===void 0?void 0:o.call(e))||e.ownerDocument,f=(c=te(g))!==null&&c!==void 0?c:g;F=Ut(`
      [`.concat(b(""),"-click-animating-without-extra-node='true']::after, .").concat(b(""),`-click-animating-node {
        --antd-wave-shadow-color: `).concat(i,`;
      }`),"antd-wave",{csp:t.csp,attachTo:f})}m&&e.appendChild(C),["transition","animation"].forEach(function(x){e.addEventListener("".concat(x,"start"),t.onTransitionStart),e.addEventListener("".concat(x,"end"),t.onTransitionEnd)})}},t.onTransitionStart=function(e){if(!t.destroyed){var i=t.containerRef.current;!e||e.target!==i||t.animationStart||t.resetEffect(i)}},t.onTransitionEnd=function(e){!e||e.animationName!=="fadeEffect"||t.resetEffect(e.target)},t.bindAnimationEvent=function(e){if(!(!e||!e.getAttribute||e.getAttribute("disabled")||e.className.includes("disabled"))){var i=function(c){if(!(c.target.tagName==="INPUT"||pt(c.target))){t.resetEffect(e);var l=getComputedStyle(e).getPropertyValue("border-top-color")||getComputedStyle(e).getPropertyValue("border-color")||getComputedStyle(e).getPropertyValue("background-color");t.clickWaveTimeoutId=window.setTimeout(function(){return t.onClick(e,l)},0),z.cancel(t.animationStartId),t.animationStart=!0,t.animationStartId=z(function(){t.animationStart=!1},10)}};return e.addEventListener("click",i,!0),{cancel:function(){e.removeEventListener("click",i,!0)}}}},t.renderWave=function(e){var i=e.csp,o=t.props.children;if(t.csp=i,!s.exports.isValidElement(o))return o;var c=t.containerRef;return Wt(o)&&(c=Bt(o.ref,t.containerRef)),xt(o,{ref:c})},t}return Ft(a,[{key:"componentDidMount",value:function(){this.destroyed=!1;var e=this.containerRef.current;!e||e.nodeType!==1||(this.instance=this.bindAnimationEvent(e))}},{key:"componentWillUnmount",value:function(){this.instance&&this.instance.cancel(),this.clickWaveTimeoutId&&clearTimeout(this.clickWaveTimeoutId),this.destroyed=!0}},{key:"getAttributeName",value:function(){var e=this.context.getPrefixCls,i=this.props.insertExtraNode;return i?"".concat(e(""),"-click-animating"):"".concat(e(""),"-click-animating-without-extra-node")}},{key:"resetEffect",value:function(e){var i=this;if(!(!e||e===this.extraNode||!(e instanceof Element))){var o=this.props.insertExtraNode,c=this.getAttributeName();e.setAttribute(c,"false"),F&&(F.innerHTML=""),o&&this.extraNode&&e.contains(this.extraNode)&&e.removeChild(this.extraNode),["transition","animation"].forEach(function(l){e.removeEventListener("".concat(l,"start"),i.onTransitionStart),e.removeEventListener("".concat(l,"end"),i.onTransitionEnd)})}}},{key:"render",value:function(){return d(Ht,{children:this.renderWave})}}]),a}(s.exports.Component);bt.contextType=L;const re=bt;var ne=globalThis&&globalThis.__rest||function(r,n){var a={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&n.indexOf(t)<0&&(a[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,t=Object.getOwnPropertySymbols(r);e<t.length;e++)n.indexOf(t[e])<0&&Object.prototype.propertyIsEnumerable.call(r,t[e])&&(a[t[e]]=r[t[e]]);return a},yt=s.exports.createContext(void 0),ae=function(n){var a,t=s.exports.useContext(L),e=t.getPrefixCls,i=t.direction,o=n.prefixCls,c=n.size,l=n.className,m=ne(n,["prefixCls","size","className"]),h=e("btn-group",o),p="";switch(c){case"large":p="lg";break;case"small":p="sm";break}var C=w(h,(a={},u(a,"".concat(h,"-").concat(p),p),u(a,"".concat(h,"-rtl"),i==="rtl"),a),l);return d(yt.Provider,{value:c,children:d("div",{...m,className:C})})};const ie=ae;var M=function(){return{width:0,opacity:0,transform:"scale(0)"}},V=function(n){return{width:n.scrollWidth,opacity:1,transform:"scale(1)"}},oe=function(n){var a=n.prefixCls,t=n.loading,e=n.existIcon,i=!!t;return e?d("span",{className:"".concat(a,"-loading-icon"),children:d(vt,{})}):d(Mt,{visible:i,motionName:"".concat(a,"-loading-icon-motion"),removeOnLeave:!0,onAppearStart:M,onAppearActive:V,onEnterStart:M,onEnterActive:V,onLeaveStart:V,onLeaveActive:M,children:function(o,c){var l=o.className,m=o.style;return d("span",{className:"".concat(a,"-loading-icon"),style:m,ref:c,children:d(vt,{className:l})})}})};const ce=oe;var se=globalThis&&globalThis.__rest||function(r,n){var a={};for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&n.indexOf(t)<0&&(a[t]=r[t]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,t=Object.getOwnPropertySymbols(r);e<t.length;e++)n.indexOf(t[e])<0&&Object.prototype.propertyIsEnumerable.call(r,t[e])&&(a[t[e]]=r[t[e]]);return a},gt=/^[\u4e00-\u9fa5]{2}$/,H=gt.test.bind(gt);function le(r){return typeof r=="string"}function G(r){return r==="text"||r==="link"}function ue(r,n){if(r!=null){var a=n?" ":"";return typeof r!="string"&&typeof r!="number"&&le(r.type)&&H(r.props.children)?xt(r,{children:r.props.children.split("").join(a)}):typeof r=="string"?H(r)?d("span",{children:r.split("").join(a)}):d("span",{children:r}):Kt(r)?d("span",{children:r}):r}}function fe(r,n){var a=!1,t=[];return s.exports.Children.forEach(r,function(e){var i=Vt(e),o=i==="string"||i==="number";if(a&&o){var c=t.length-1,l=t[c];t[c]="".concat(l).concat(e)}else t.push(e);a=o}),s.exports.Children.map(t,function(e){return ue(e,n)})}q("default","primary","ghost","dashed","link","text");q("default","circle","round");q("submit","button","reset");function xe(r){return r==="danger"?{danger:!0}:{type:r}}var de=function(n,a){var t,e=n.loading,i=e===void 0?!1:e,o=n.prefixCls,c=n.type,l=c===void 0?"default":c,m=n.danger,h=n.shape,p=h===void 0?"default":h,C=n.size,b=n.disabled,y=n.className,g=n.children,f=n.icon,x=n.ghost,A=x===void 0?!1:x,E=n.block,I=E===void 0?!1:E,P=n.htmlType,Nt=P===void 0?"button":P,K=se(n,["loading","prefixCls","type","danger","shape","size","disabled","className","children","icon","ghost","block","htmlType"]),St=s.exports.useContext(qt),Et=s.exports.useContext(Jt),R=b!=null?b:Et,_t=s.exports.useContext(yt),kt=s.exports.useState(!!i),Q=dt(kt,2),S=Q[0],X=Q[1],It=s.exports.useState(!1),Y=dt(It,2),j=Y[0],Z=Y[1],D=s.exports.useContext(L),Tt=D.getPrefixCls,tt=D.autoInsertSpaceInButton,et=D.direction,_=a||s.exports.createRef(),rt=function(){return s.exports.Children.count(g)===1&&!f&&!G(l)},Pt=function(){if(!(!_||!_.current||tt===!1)){var O=_.current.textContent;rt()&&H(O)?j||Z(!0):j&&Z(!1)}},T=typeof i=="boolean"?i:(i==null?void 0:i.delay)||!0;s.exports.useEffect(function(){var N=null;return typeof T=="number"?N=window.setTimeout(function(){N=null,X(T)},T):X(T),function(){N&&(window.clearTimeout(N),N=null)}},[T]),s.exports.useEffect(Pt,[_]);var nt=function(O){var B=n.onClick;if(S||R){O.preventDefault();return}B==null||B(O)},v=Tt("btn",o),at=tt!==!1,it=Xt(v,et),Ot=it.compactSize,zt=it.compactItemClassnames,wt={large:"lg",small:"sm",middle:void 0},ot=Ot||_t||C||St,ct=ot&&wt[ot]||"",Lt=S?"loading":f,W=Gt(K,["navigate"]),st=w(v,(t={},u(t,"".concat(v,"-").concat(p),p!=="default"&&p),u(t,"".concat(v,"-").concat(l),l),u(t,"".concat(v,"-").concat(ct),ct),u(t,"".concat(v,"-icon-only"),!g&&g!==0&&!!Lt),u(t,"".concat(v,"-background-ghost"),A&&!G(l)),u(t,"".concat(v,"-loading"),S),u(t,"".concat(v,"-two-chinese-chars"),j&&at&&!S),u(t,"".concat(v,"-block"),I),u(t,"".concat(v,"-dangerous"),!!m),u(t,"".concat(v,"-rtl"),et==="rtl"),u(t,"".concat(v,"-disabled"),W.href!==void 0&&R),t),zt,y),lt=f&&!S?f:d(ce,{existIcon:!!f,prefixCls:v,loading:!!S}),ut=g||g===0?fe(g,rt()&&at):null;if(W.href!==void 0)return mt("a",{...W,className:st,onClick:nt,ref:_,children:[lt,ut]});var ft=mt("button",{...K,type:Nt,className:st,onClick:nt,disabled:R,ref:_,children:[lt,ut]});return G(l)?ft:d(re,{disabled:!!S,children:ft})},J=s.exports.forwardRef(de);J.Group=ie;J.__ANT_BUTTON=!0;const Ce=J;export{Ce as B,he as C,ge as N,re as W,Kt as a,xe as b,xt as c,ht as i,Xt as u};
