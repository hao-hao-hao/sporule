if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,n)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const t={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return t;default:return e(r)}})).then(e=>{const r=n(...e);return s.default||(s.default=r),s})}))}}define("./sw.js",["./workbox-df65e9fb"],(function(e){"use strict";e.skipWaiting(),e.precacheAndRoute([{url:"/404.html",revision:"933f18a57a24232150f8561285ac17a8"},{url:"/index.html",revision:"f655a53be5fecae5f6e860081ed5e8f8"},{url:"/main.2d28433d28b4f799826a.js",revision:"5b54b484e90ae807e0bc00a431ce3acb"},{url:"/main.30655359c38731c7e6a9.css",revision:"ef594cc2ed987966d3016afb3e7e6c9d"},{url:"/md.js",revision:"ab05dfb7b5c7832b742d134206c8623c"}],{}),e.registerRoute(/\/.(js|css)$\/i/,new e.StaleWhileRevalidate,"GET")}));
