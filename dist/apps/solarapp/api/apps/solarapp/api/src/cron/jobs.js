var m=Object.create;var s=Object.defineProperty;var S=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,I=Object.prototype.hasOwnProperty;var b=(a,n)=>{for(var t in n)s(a,t,{get:n[t],enumerable:!0})},c=(a,n,t,r)=>{if(n&&typeof n=="object"||typeof n=="function")for(let e of f(n))!I.call(a,e)&&e!==t&&s(a,e,{get:()=>n[e],enumerable:!(r=S(n,e))||r.enumerable});return a};var C=(a,n,t)=>(t=a!=null?m(w(a)):{},c(n||!a||!a.__esModule?s(t,"default",{value:a,enumerable:!0}):t,a)),g=a=>c(s({},"__esModule",{value:!0}),a);var O={};b(O,{creditGenerator:()=>G});module.exports=g(O);var i=require("../app/utils/creditsUtils"),p=require("../shared/clients"),u=C(require("../shared/logger")),d=require("crypto");const G={cronExpression:"* * 12 * * *",func:async a=>{const n=(0,d.randomUUID)();(0,u.default)("[creditGenerator] @",a);const t=(0,p.DBClient)(),r=await t.device.findMany({where:{deletedAt:null},orderBy:{id:"asc"}}),e=[];r.forEach(o=>{o.type==="solar panel"&&e.push((0,i.calculateDailyCarbonCredits)(o.locationObject?.latitude,o.locationObject?.longitude,o.deviceSpecs.size,o.deviceSpecs.powerOutput,o.id)),o.type==="solar geyser"&&e.push((0,i.calculateDailyCarbonCredits)(o.locationObject?.latitude,o.locationObject?.longitude,o.deviceSpecs.capacity,o.deviceSpecs.occupants,o.id))});const y=(await Promise.allSettled(e)).map(o=>{const l=o?.value;return t.credits.create({data:{amount:l?.dailyCarbonReduction,deviceId:l?.deviceId,cronUuid:n}})});await Promise.allSettled(y)}};0&&(module.exports={creditGenerator});