var n=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var c=Object.getOwnPropertyNames;var d=Object.prototype.hasOwnProperty;var f=(a,o)=>{for(var l in o)n(a,l,{get:o[l],enumerable:!0})},g=(a,o,l,t)=>{if(o&&typeof o=="object"||typeof o=="function")for(let e of c(o))!d.call(a,e)&&e!==l&&n(a,e,{get:()=>o[e],enumerable:!(t=y(o,e))||t.enumerable});return a};var p=a=>g(n({},"__esModule",{value:!0}),a);var s={};f(s,{default:()=>r});module.exports=p(s);var r=(a,...o)=>{console.log(a,...o)};