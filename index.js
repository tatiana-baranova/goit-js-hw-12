import{a as q,i,S as w}from"./assets/vendor-tnUJPedx.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const P="47418994-53b3f5e850acd57effb8c0e9d",R="https://pixabay.com/api/";async function f(t,s=1){try{const{data:e}=await q.get(R,{params:{key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}});if(!e||!e.hits||e.hits.length===0)throw new Error("No images found for the query");return e}catch(e){return i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error("Error in getImages:",e),null}}function p(t){return t.map(({webformatURL:s,largeImageURL:e,tags:a,likes:r,views:o,comments:l,downloads:S})=>`
    <a class="gallery-item" href="${e}">
    <div class="gallery-image">
    <img class="image" src="${s}" alt="${a}">
    <div>
    <ul class="description">
    <li class="list-info">
    <h3 class="info-img">Likes</h3>
    <p class="text-img">${r}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Views</h3>
    <p class="text-img">${o}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Comments</h3>
    <p class="text-img">${l}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Downloads</h3>
    <p class="text-img">${S}</p>
    </li>
    </ul>
    </div>
    </div>
    </a>
    `).join("")}const v=document.querySelector(".search-form"),u=document.querySelector(".gallery");document.querySelector(".form-input");const y=document.querySelector("#loader"),n=document.querySelector("#load-more");let L=new w(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});const g=()=>y.classList.replace("hidden","loader"),h=()=>y.classList.replace("loader","hidden"),b=()=>n.classList.replace("hidden","load-more"),c=()=>n.classList.replace("load-more","hidden");let d=1;const x=15;let m="",E=0;c();v.addEventListener("submit",async t=>{t.preventDefault();const s=t.target.elements.searchQuery.value.trim();if(!s){i.error({title:"Error",message:"Please enter a search query!",position:"topRight"}),t.target.reset();return}m=s,d=1,u.innerHTML="",c(),g();try{const e=await f(m,d);if(g(),!e||!e.hits||e.hits.length===0){h(),i.info({title:"No results",message:"Sorry, no images found!",position:"topRight"}),t.target.reset();return}const a=p(e.hits);u.insertAdjacentHTML("beforeend",a),L.refresh(),E=e.totalHits,b(),t.target.reset()}catch(e){console.error("Error during image fetch:",e),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),h(),t.target.reset()}});n.addEventListener("click",async()=>{d+=1,n.disabled=!0,c(),g();try{const t=await f(m,d);if(h(),n.disabled=!1,b(),!t||!t.hits||t.hits.length===0){c(),i.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}const s=p(t.hits);u.insertAdjacentHTML("beforeend",s),L.refresh(),d*x>=E&&(c(),i.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:e}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(t){h(),n.disabled=!1,console.error("Error during loading more images:",t),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}});
//# sourceMappingURL=index.js.map
