import{x as s}from"./app.3aad4e87.js";const a=r=>typeof r!="string"?!1:(console.log(r),r.includes("ERR:")?(s.error(r.replace("ERR:","")),!0):!1),t=r=>{Object.keys(r).forEach(e=>{s.error(r[e].message)})},n=r=>r.props.flash.error!==null;export{t as d,n as f,a as h};