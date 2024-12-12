import{a as b,i,S as w}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const E="47418994-53b3f5e850acd57effb8c0e9d",v="https://pixabay.com/api/";async function g(s,r=1){try{const{data:t}=await b.get(v,{params:{key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}});if(console.log(t),!t||!t.hits||t.hits.length===0)throw new Error("No images found for the query");return t}catch(t){return i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error("Error in getImages:",t),null}}function m(s){const r=s.map(({webformatURL:t,largeImageURL:l,tags:e,likes:o,views:n,comments:S,downloads:q})=>`
    <a class="gallery-item" href="${l}">
    <div class="gallery-image">
    <img class="image" src="${t}" alt="${e}">
    <div>
    <ul class="description">
    <li class="list-info">
    <h3 class="info-img">Likes</h3>
    <p class="text-img">${o}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Views</h3>
    <p class="text-img">${n}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Comments</h3>
    <p class="text-img">${S}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Downloads</h3>
    <p class="text-img">${q}</p>
    </li>
    </ul>
    </div>
    </div>
    </a>
    `).join("");gallery.insertAdjacentHTML("beforeend",r)}const P=document.querySelector(".search-form"),x=document.querySelector(".gallery");document.querySelector(".form-input");const p=document.querySelector("#loader"),u=document.querySelector("#load-more");let f=new w(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});const y=()=>p.classList.replace("hidden","loader"),c=()=>p.classList.replace("loader","hidden"),R=()=>u.classList.replace("hidden","load-more"),h=()=>u.classList.replace("load-more","hidden");let a=1;const L=15;let d="";h();P.addEventListener("submit",async s=>{s.preventDefault();const r=s.target.elements.searchQuery.value.trim();if(console.log(r),!r){i.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}d=r,a=1,x.innerHTML="",h(),y();try{const t=await g(d,a);if(totalHits=t.totalHits||0,c(),!t.hits.length){i.info({title:"No results",message:"Sorry, no images found!",position:"topRight"});return}m(t.hits),f.refresh(),a*L<totalHits&&R()}catch{c(),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}});u.addEventListener("click",async()=>{a+=1,y();try{const s=await g(d,a);c(),m(s.hits),f.refresh(),a*L>=totalHits&&(h(),i.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}));const{height:r}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}catch{c(),i.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}});
//# sourceMappingURL=index.js.map
