import{a as S,i as a,S as q}from"./assets/vendor-tnUJPedx.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function e(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=e(r);fetch(r.href,o)}})();const P="47418994-53b3f5e850acd57effb8c0e9d",R="https://pixabay.com/api/";async function f(t,s=1){try{const{data:e}=await S.get(R,{params:{key:P,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15}});if(!e||!e.hits||e.hits.length===0)throw new Error("No images found for the query");return e}catch(e){return a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),console.error("Error in getImages:",e),null}}function p(t){return t.map(({webformatURL:s,largeImageURL:e,tags:n,likes:r,views:o,comments:c,downloads:w})=>`
    <a class="gallery-item" href="${e}">
    <div class="gallery-image">
    <img class="image" src="${s}" alt="${n}">
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
    `).join("")}const v=document.querySelector(".search-form"),u=document.querySelector(".gallery"),g=document.querySelector("#loader"),l=document.querySelector("#load-more");let y=new q(".gallery-item",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});const L=()=>{g.classList.replace("hidden","loader"),console.log("Loader shown - current class:",g.className)},i=()=>{g.classList.replace("loader","hidden"),console.log("Loader hidden")},x=()=>l.classList.replace("hidden","load-more"),d=()=>l.classList.replace("load-more","hidden");i();let h=1;const M=15;let m="",b=0;const E=()=>{h*M>=b?(d(),a.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):x()};v.addEventListener("submit",async t=>{t.preventDefault();const s=t.target.elements.searchQuery.value.trim();if(L(),!s){i(),a.error({title:"Error",message:"Please enter a search query!",position:"topRight"}),t.target.reset();return}m=s,h=1,u.innerHTML="",d();try{const e=await f(m,h);if(!e||!e.hits||e.hits.length===0){i(),a.info({title:"No results",message:"Sorry, no images found!",position:"topRight"}),t.target.reset();return}b=e.totalHits||0;const n=p(e.hits);u.insertAdjacentHTML("beforeend",n),y.refresh(),i(),E(),t.target.reset()}catch(e){i(),console.error("Error during image fetch:",e),a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),t.target.reset()}});l.addEventListener("click",async()=>{h+=1,d(),L(),l.disabled=!0;try{const t=await f(m,h);if(l.disabled=!1,!t||!t.hits||t.hits.length===0){i(),d(),a.info({title:"End results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}const s=p(t.hits);u.insertAdjacentHTML("beforeend",s),y.refresh(),i(),E();const{height:e}=u.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}catch(t){i(),d(),l.disabled=!1,console.error("Error during loading more images:",t),a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}});
//# sourceMappingURL=index.js.map
