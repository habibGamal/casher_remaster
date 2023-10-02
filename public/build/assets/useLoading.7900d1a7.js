var u=Object.defineProperty;var g=(o,t,e)=>t in o?u(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var i=(o,t,e)=>(g(o,typeof t!="symbol"?t+"":t,e),e);import{v as r,x as n,r as b}from"./app.3aad4e87.js";class f{constructor(){i(this,"tableGlobalSettings");i(this,"formGlobalSettings")}static setTableGlobalSettings(t){const e=new this;return e.tableGlobalSettings=t,e}flattenTableGlobalSettings(){const t=this.tableGlobalSettings;if(t.sortInfo){const{stateLoading:e,sortInfo:{order:s,columnKey:a},...l}=t;return{columnKey:a,order:s,...l}}else{const{stateLoading:e,...s}=t;return s}}addSlug(t,e){const s={};for(const a in e)s[t+"_"+a]=e[a];return s}getTableGlobalSettings(t){return this.addSlug(t,this.flattenTableGlobalSettings())}updateTableData(t){!this.tableGlobalSettings||r.Inertia.reload({only:[t],data:{...this.getTableGlobalSettings(t)},...this.tableGlobalSettings.stateLoading,preserveState:!0})}static setFormGlobalSettings(t){const e=new this;return e.formGlobalSettings=t,e}update(t){this.formGlobalSettings!==void 0&&(!this.formGlobalSettings.modelId||r.Inertia.post(`${t}/update/${this.formGlobalSettings.modelId}`,this.formGlobalSettings.formValues,{...this.formGlobalSettings.stateLoading,onSuccess:()=>{n.success("\u062A\u0645 \u0627\u0644\u062A\u0639\u062F\u064A\u0644 \u0628\u0646\u062C\u0627\u062D"),this.formGlobalSettings.closeFormModal()},onError:e=>{this.formGlobalSettings.setErrors(e)}}))}create(t,e){if(this.formGlobalSettings===void 0)return;const s=e||`${t}/store`;r.Inertia.post(s,this.formGlobalSettings.formValues,{...this.formGlobalSettings.stateLoading,onSuccess:()=>{n.success("\u062A\u0645\u062A \u0627\u0644\u0627\u0636\u0627\u0641\u0629 \u0628\u0646\u062C\u0627\u062D"),this.formGlobalSettings.form.resetFields()},onError:a=>{this.formGlobalSettings.setErrors(a)}})}static delete(t,e){r.Inertia.delete(`${e}/${t}`,{onError:s=>{n.error("\u062D\u062F\u062B \u062E\u0637\u0623 \u0645\u0627"),s.message&&n.error(s.message)},preserveState:!0})}}const c=()=>{const[o,t]=b.exports.useState(!1);return{loading:o,setLoading:t,stateLoading:{onStart:()=>t(!0),onFinish:()=>t(!1)}}};export{f as M,c as u};