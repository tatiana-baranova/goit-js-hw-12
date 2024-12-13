import{a as q,i,S as P}from"./assets/vendor-tnUJPedx.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const R="47418994-53b3f5e850acd57effb8c0e9d",v="https://pixabay.com/api/";async function m(t,s=1){try{const{data:e}=await q.get(v,{params:{key:R,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}});if(!e||!e.hits||e.hits.length===0)throw new Error("No images found for the query");return e}catch(e){return i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error("Error in getImages:",e),null}}function f(t){return t.map(({webformatURL:s,largeImageURL:e,tags:a,likes:r,views:o,comments:c,downloads:w})=>`
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
    <p class="text-img">${c}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Downloads</h3>
    <p class="text-img">${w}</p>
    </li>
    </ul>
    </div>
    </div>
    </a>
    `).join("")}const x=document.querySelector(".search-form"),u=document.querySelector(".gallery"),p=document.querySelector("#loader"),n=document.querySelector("#load-more");let y=new P(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});const L=()=>p.classList.replace("hidden","loader"),l=()=>p.classList.replace("loader","hidden"),b=()=>n.classList.replace("hidden","load-more"),d=()=>n.classList.replace("load-more","hidden");let h=1;const M=15;let g="",E=0;const S=()=>{h*M>=E?(d(),i.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):b()};x.addEventListener("submit",async t=>{t.preventDefault();const s=t.target.elements.searchQuery.value.trim();if(!s){i.error({title:"Error",message:"Please enter a search query!",position:"topRight"}),t.target.reset();return}g=s,h=1,u.innerHTML="",d(),L();try{const e=await m(g,h);if(l(),!e||!e.hits||e.hits.length===0){i.info({title:"No results",message:"Sorry, no images found!",position:"topRight"}),t.target.reset();return}E=e.totalHits||0;const a=f(e.hits);u.insertAdjacentHTML("beforeend",a),y.refresh(),l(),S(),t.target.reset()}catch(e){l(),console.error("Error during image fetch:",e),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.target.reset()}});n.addEventListener("click",async()=>{h+=1,n.disabled=!0,d(),L();try{const t=await m(g,h);if(l(),n.disabled=!1,b(),!t||!t.hits||t.hits.length===0){d(),i.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}const s=f(t.hits);u.insertAdjacentHTML("beforeend",s),y.refresh(),l(),S();const{height:e}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(t){l(),d(),n.disabled=!1,console.error("Error during loading more images:",t),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}});
//# sourceMappingURL=index.js.map
