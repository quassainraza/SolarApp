var n=Object.defineProperty;var c=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var A=Object.prototype.hasOwnProperty;var t=(f,r)=>{for(var o in r)n(f,o,{get:r[o],enumerable:!0})},S=(f,r,o,e)=>{if(r&&typeof r=="object"||typeof r=="function")for(let i of s(r))!A.call(f,i)&&i!==o&&n(f,i,{get:()=>r[i],enumerable:!(e=c(r,i))||e.enumerable});return f};var g=f=>S(n({},"__esModule",{value:!0}),f);var N={};t(N,{CONSTANTS:()=>I,FORECAST_DAYS:()=>x,GMAP_API:()=>p,NREL_API:()=>U});module.exports=g(N);const p="AIzaSyAdGHobM3nBRqt4QejpnTUHfRbiDukMrWg",x=5,U="nrnK87iKUxsYBl9fGEIcKpgfZUpV2ISb5NC0TLxS",I=[{region:"AF",srf:5.5,cif:.556},{region:"AS",srf:5,cif:.773},{region:"EU",srf:4,cif:.329},{region:"NA",srf:4.5,cif:.475},{region:"SA",srf:4.5,cif:.475},{region:"US",srf:4.5,cif:.475},{region:"United States of America",srf:4.5,cif:.475}];0&&(module.exports={CONSTANTS,FORECAST_DAYS,GMAP_API,NREL_API});