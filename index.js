import{a as L,i as n,S}from"./assets/vendor-tnUJPedx.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const q="47418994-53b3f5e850acd57effb8c0e9d",b="https://pixabay.com/api/";async function w(s,o=1){try{const{data:e}=await L.get(b,{params:{key:q,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}});if(!e||!e.hits||e.hits.length===0)throw new Error("No images found for the query");return e}catch(e){return n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error("Error in getImages:",e),null}}function E(s){return s.map(({webformatURL:o,largeImageURL:e,tags:i,likes:t,views:r,comments:a,downloads:y})=>`
    <a class="gallery-item" href="${e}">
    <div class="gallery-image">
    <img class="image" src="${o}" alt="${i}">
    <div>
    <ul class="description">
    <li class="list-info">
    <h3 class="info-img">Likes</h3>
    <p class="text-img">${t}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Views</h3>
    <p class="text-img">${r}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Comments</h3>
    <p class="text-img">${a}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Downloads</h3>
    <p class="text-img">${y}</p>
    </li>
    </ul>
    </div>
    </div>
    </a>
    `).join("")}const P=document.querySelector(".search-form"),c=document.querySelector(".gallery");document.querySelector(".form-input");const h=document.querySelector("#loader"),f=document.querySelector("#load-more");let x=new S(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});const u=()=>h.classList.replace("hidden","loader"),d=()=>h.classList.replace("loader","hidden"),$=()=>f.classList.replace("hidden","load-more"),p=()=>f.classList.replace("load-more","hidden");let l=1;const v=15;let m="",g=0;p();P.addEventListener("submit",async s=>{s.preventDefault();const o=s.target.elements.searchQuery.value.trim();if(!o){n.error({title:"Error",message:"Please enter a search query!",position:"topRight"}),s.target.reset();return}m=o,l=1,c.innerHTML="",p(),u();try{const e=await w(m,l);if(u(),!e||!e.hits||e.hits.length===0){d(),n.info({title:"No results",message:"Sorry, no images found!",position:"topRight"});return}const i=E(e.hits);c.insertAdjacentHTML("beforeend",i),x.refresh(),g=e.totalHits,l*v<g&&$()}catch(e){console.error("Error during image fetch:",e),n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d(),s.target.reset()}});
//# sourceMappingURL=index.js.map
