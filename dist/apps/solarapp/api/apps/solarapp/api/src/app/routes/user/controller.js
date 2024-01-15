var D=Object.create;var c=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var F=Object.getOwnPropertyNames;var R=Object.getPrototypeOf,b=Object.prototype.hasOwnProperty;var q=(r,t)=>{for(var a in t)c(r,a,{get:t[a],enumerable:!0})},p=(r,t,a,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let e of F(t))!b.call(r,e)&&e!==a&&c(r,e,{get:()=>t[e],enumerable:!(s=I(t,e))||s.enumerable});return r};var A=(r,t,a)=>(a=r!=null?D(R(r)):{},p(t||!r||!r.__esModule?c(a,"default",{value:r,enumerable:!0}):a,r)),P=r=>p(c({},"__esModule",{value:!0}),r);var E={};q(E,{Users:()=>C});module.exports=P(E);var d=require("../../../shared/clients"),n=A(require("../../../shared/logger"));class C{static async Post(t,a){try{const s=(0,d.DBClient)();(0,n.default)("req.body");const e=t.body;(0,n.default)(e);const i=await s.user.create({data:{email:e.email,firstname:e.firstname,telephone:e.telephone,password:e.password,avatar:e.avatar,lastname:e.lastname}});(0,n.default)("response"),(0,n.default)(i),a.status(200).send({...i})}catch(s){if((0,n.default)(s),s.code==="P2002")throw new Error("Cannot create account, already exists")}}static async Login(t,a){try{const s=t.body,e=(0,d.DBClient)(),i=await e.user.findFirst({where:{email:{equals:s.email,mode:"insensitive"},password:s.password}});if(await e.user.update({data:{lastLogin:new Date},where:{id:i.id,deletedAt:null}}),(0,n.default)(`[Authenticated] ${i.email}`),i)a.status(200).send({...i});else throw new Error("Invalid email or Password")}catch{throw new Error("Invalid email or Password")}}static async Put(t,a){const s=(0,d.DBClient)(),e=t.body;if(!e.email)throw new Error("Email cannot be empty");try{const i=await s.user.update({data:{avatar:e?.avatar,createdAt:e?.createdAt,deletedAt:e?.deletedAt,updatedAt:new Date,email:e?.email,firstname:e.firstname,lastLogin:e.lastLogin,lastname:e.lastname,telephone:e.telephone},where:{id:e.id}});a.status(200).send({response:i})}catch(i){throw(0,n.default)(i),new Error(`Could not update data for ${e.email}`)}}static async GetDashboard(t,a){const s=t.params?.userId;(0,n.default)("Sending summary for",s);const e=(0,d.DBClient)(),i=await e.device.findMany({where:{userId:parseInt(s)},orderBy:{credits:{_count:"asc"}},take:3}),w=i.map(async o=>{const l=await e.credits.aggregate({_sum:{amount:!0},where:{deviceId:o.id}});return{...o,credits:l._sum.amount??0}}),m=(await Promise.allSettled(w))?.map(o=>o.value),h=(m.length?[...m.map(o=>o?.credits)]:[0])?.reduce((o,l)=>o+l),f=new Date,u=new Date;u.setDate(f.getDate()-7);const y=await e.credits.groupBy({by:["deviceId"],_sum:{amount:!0},where:{createdAt:{gte:u}}});(0,n.default)(y);const g=await e.credits.aggregate({_max:{amount:!0},where:{device:{OR:[...i.map(o=>({id:o.id}))]}}}),v={devices:m,totalCredits:h,creditsLastWeek:y.slice(0,5),highestCredits:g._max.amount};a.status(200).send(v)}}0&&(module.exports={Users});
