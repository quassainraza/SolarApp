var p=Object.create;var i=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames;var l=Object.getPrototypeOf,u=Object.prototype.hasOwnProperty;var F=(t,r)=>{for(var e in r)i(t,e,{get:r[e],enumerable:!0})},o=(t,r,e,n)=>{if(r&&typeof r=="object"||typeof r=="function")for(let f of y(r))!u.call(t,f)&&f!==e&&i(t,f,{get:()=>r[f],enumerable:!(n=c(r,f))||n.enumerable});return t};var s=(t,r,e)=>(e=t!=null?p(l(t)):{},o(r||!t||!t.__esModule?i(e,"default",{value:t,enumerable:!0}):e,t)),I=t=>o(i({},"__esModule",{value:!0}),t);var d={};F(d,{default:()=>b});module.exports=I(d);var a=s(require("fastify-plugin")),m=s(require("@fastify/sensible")),b=(0,a.default)(async function(t){t.register(m.default)});