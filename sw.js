if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,c)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}})).then(e=>{const r=c(...e);return s.default||(s.default=r),s})}))}}define("./sw.js",["./workbox-df65e9fb"],(function(e){"use strict";e.skipWaiting(),e.precacheAndRoute([{url:"/404.html",revision:"933f18a57a24232150f8561285ac17a8"},{url:"/index.html",revision:"d4c01d153837fb26a34e4ea007b2cb82"},{url:"/main.3f97c8246e64f009c926.css",revision:"28d6146726e9102c844cdb3ddcaac0e3"},{url:"/main.a63eab3cddffc02bc82e.js",revision:"8459082b54132b46e4d0c9b8af0a0a71"},{url:"/md.js",revision:"eee6b73fd175ce8b47d06a42d4a910d8"}],{}),e.registerRoute(/\/.(js|css)$\/i/,new e.StaleWhileRevalidate,"GET")}));
