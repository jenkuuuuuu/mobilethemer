var D=Object.defineProperty;var O=(t,n,e)=>n in t?D(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var f=(t,n,e)=>O(t,typeof n!="symbol"?n+"":n,e);function q(){}function G(t,n){for(const e in n)t[e]=n[e];return t}function I(t){return t()}function it(){return Object.create(null)}function z(t){t.forEach(I)}function lt(t){return typeof t=="function"}function ct(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function st(t){return Object.keys(t).length===0}function F(t,...n){if(t==null){for(const i of n)i(void 0);return q}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function rt(t,n,e){t.$$.on_destroy.push(F(n,e))}function ot(t,n,e,i){if(t){const l=L(t,n,e,i);return t[0](l)}}function L(t,n,e,i){return t[1]&&i?G(e.ctx.slice(),t[1](i(n))):e.ctx}function ut(t,n,e,i){if(t[2]&&i){const l=t[2](i(e));if(n.dirty===void 0)return l;if(typeof l=="object"){const r=[],c=Math.max(n.dirty.length,l.length);for(let o=0;o<c;o+=1)r[o]=n.dirty[o]|l[o];return r}return n.dirty|l}return n.dirty}function at(t,n,e,i,l,r){if(l){const c=L(n,e,i,r);t.p(c,l)}}function ft(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function _t(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function dt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}let p=!1;function ht(){p=!0}function mt(){p=!1}function R(t,n,e,i){for(;t<n;){const l=t+(n-t>>1);e(l)<=i?t=l+1:n=l}return t}function U(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const s=[];for(let u=0;u<n.length;u++){const a=n[u];a.claim_order!==void 0&&s.push(a)}n=s}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let l=0;for(let s=0;s<n.length;s++){const u=n[s].claim_order,a=(l>0&&n[e[l]].claim_order<=u?l+1:R(1,l,B=>n[e[B]].claim_order,u))-1;i[s]=e[a]+1;const N=a+1;e[N]=s,l=Math.max(N,l)}const r=[],c=[];let o=n.length-1;for(let s=e[l]+1;s!=0;s=i[s-1]){for(r.push(n[s-1]);o>=s;o--)c.push(n[o]);o--}for(;o>=0;o--)c.push(n[o]);r.reverse(),c.sort((s,u)=>s.claim_order-u.claim_order);for(let s=0,u=0;s<c.length;s++){for(;u<r.length&&c[s].claim_order>=r[u].claim_order;)u++;const a=u<r.length?r[u]:null;t.insertBefore(c[s],a)}}function W(t,n){if(p){for(U(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function J(t,n,e){t.insertBefore(n,e||null)}function K(t,n,e){p&&!e?W(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function x(t){t.parentNode&&t.parentNode.removeChild(t)}function pt(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function M(t){return document.createElement(t)}function H(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function w(t){return document.createTextNode(t)}function gt(){return w(" ")}function yt(){return w("")}function bt(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function xt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function vt(t){return function(n){n.target===this&&t.call(this,n)}}function Q(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function Et(t,n){for(const e in n)Q(t,e,n[e])}function wt(t){return t.dataset.svelteH}function Tt(t){return Array.from(t.childNodes)}function S(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function j(t,n,e,i,l=!1){S(t);const r=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const o=t[c];if(n(o)){const s=e(o);return s===void 0?t.splice(c,1):t[c]=s,l||(t.claim_info.last_index=c),o}}for(let c=t.claim_info.last_index-1;c>=0;c--){const o=t[c];if(n(o)){const s=e(o);return s===void 0?t.splice(c,1):t[c]=s,l?s===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,o}}return i()})();return r.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,r}function P(t,n,e,i){return j(t,l=>l.nodeName===n,l=>{const r=[];for(let c=0;c<l.attributes.length;c++){const o=l.attributes[c];e[o.name]||r.push(o.name)}r.forEach(c=>l.removeAttribute(c))},()=>i(n))}function Nt(t,n,e){return P(t,n,e,M)}function At(t,n,e){return P(t,n,e,H)}function V(t,n){return j(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>w(n),!0)}function kt(t){return V(t," ")}function A(t,n,e){for(let i=e;i<t.length;i+=1){const l=t[i];if(l.nodeType===8&&l.textContent.trim()===n)return i}return-1}function Lt(t,n){const e=A(t,"HTML_TAG_START",0),i=A(t,"HTML_TAG_END",e+1);if(e===-1||i===-1)return new g(n);S(t);const l=t.splice(e,i-e+1);x(l[0]),x(l[l.length-1]);const r=l.slice(1,l.length-1);if(r.length===0)return new g(n);for(const c of r)c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new g(n,r)}function Mt(t,n){n=""+n,t.data!==n&&(t.data=n)}function Ht(t,n){t.value=n??""}function St(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,"")}function jt(t,n,e){t.classList.toggle(n,!!e)}function X(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}class Y{constructor(n=!1){f(this,"is_svg",!1);f(this,"e");f(this,"n");f(this,"t");f(this,"a");this.is_svg=n,this.e=this.n=null}c(n){this.h(n)}m(n,e,i=null){this.e||(this.is_svg?this.e=H(e.nodeName):this.e=M(e.nodeType===11?"TEMPLATE":e.nodeName),this.t=e.tagName!=="TEMPLATE"?e:e.content,this.c(n)),this.i(i)}h(n){this.e.innerHTML=n,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(n){for(let e=0;e<this.n.length;e+=1)J(this.t,this.n[e],n)}p(n){this.d(),this.h(n),this.i(this.a)}d(){this.n.forEach(x)}}class g extends Y{constructor(e=!1,i){super(e);f(this,"l");this.e=this.n=null,this.l=i}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let i=0;i<this.n.length;i+=1)K(this.t,this.n[i],e)}}function Pt(t,n){return new t(n)}let m;function y(t){m=t}function T(){if(!m)throw new Error("Function called outside component initialization");return m}function Ct(t){T().$$.on_mount.push(t)}function Bt(t){T().$$.after_update.push(t)}function Dt(){const t=T();return(n,e,{cancelable:i=!1}={})=>{const l=t.$$.callbacks[n];if(l){const r=X(n,e,{cancelable:i});return l.slice().forEach(c=>{c.call(t,r)}),!r.defaultPrevented}return!0}}const h=[],k=[];let d=[];const v=[],C=Promise.resolve();let E=!1;function Z(){E||(E=!0,C.then(tt))}function Ot(){return Z(),C}function $(t){d.push(t)}function qt(t){v.push(t)}const b=new Set;let _=0;function tt(){if(_!==0)return;const t=m;do{try{for(;_<h.length;){const n=h[_];_++,y(n),nt(n.$$)}}catch(n){throw h.length=0,_=0,n}for(y(null),h.length=0,_=0;k.length;)k.pop()();for(let n=0;n<d.length;n+=1){const e=d[n];b.has(e)||(b.add(e),e())}d.length=0}while(h.length);for(;v.length;)v.pop()();E=!1,b.clear(),y(t)}function nt(t){if(t.fragment!==null){t.update(),z(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach($)}}function Gt(t){const n=[],e=[];d.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),d=n}export{Dt as $,z as A,it as B,tt as C,lt as D,st as E,$ as F,Gt as G,m as H,y as I,I as J,h as K,Z as L,ht as M,mt as N,G as O,H as P,g as Q,At as R,Lt as S,Et as T,dt as U,_t as V,qt as W,jt as X,bt as Y,vt as Z,xt as _,ut as a,pt as a0,Ht as a1,wt as a2,gt as b,ot as c,Nt as d,M as e,Tt as f,ft as g,V as h,x as i,kt as j,K as k,W as l,Mt as m,q as n,rt as o,yt as p,Bt as q,Ct as r,ct as s,w as t,at as u,Q as v,St as w,k as x,Pt as y,Ot as z};
