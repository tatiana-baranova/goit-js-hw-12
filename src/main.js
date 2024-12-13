import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import "./js/pixabay-api.js";
import getImages from "./js/pixabay-api.js";

import "./js/render-functions.js";
import reflectionImages from "./js/render-functions";


const formSearch = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loader = document.querySelector("#loader");
const buttonLoad = document.querySelector("#load-more")

let lightbox = new SimpleLightbox(".gallery-item", {
    captions: true,
    captionSelector: "img",
    captionType: "attr",
    captionsData: "alt",
    captionDelay: 250,
});

const showLoader = () => {
    loader.classList.replace("hidden", "loader");
    console.log("Loader shown - current class:", loader.className);
}
const hiddenLoader = () => {
    loader.classList.replace("loader", "hidden");
    console.log("Loader hidden")
};
const showMore = () => buttonLoad.classList.replace("hidden", "load-more");
const hiddenMore = () => buttonLoad.classList.replace("load-more", "hidden");

hiddenLoader();

let currentPage = 1;
const perPage = 15;
let searchQuery = "";
let totalHits = 0;

const updateLoadMoreButton = () => {
    if (currentPage * perPage >= totalHits) {
        hiddenMore();
        iziToast.info({
                title: "End results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
    } else {
        showMore();
    }
};

formSearch.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();

    showLoader();

    if (!query) {
        hiddenLoader();
        iziToast.error({
            title: "Error",
            message: "Please enter a search query!",
            position: "topRight",
        });
            event.target.reset();
        return;
    }

    searchQuery = query;
    currentPage = 1
    gallery.innerHTML = "";
    hiddenMore();
    

    try {
        const data = await getImages(searchQuery, currentPage);
        
        if (!data || !data.hits || data.hits.length === 0) {
            hiddenLoader();
            iziToast.info({
                title: "No results",
                message: "Sorry, no images found!",
                position: "topRight",
            });
            event.target.reset();
            return;
        }
        totalHits = data.totalHits || 0;
        const markup = reflectionImages(data.hits);
            gallery.insertAdjacentHTML("beforeend", markup);
            lightbox.refresh();
        
        hiddenLoader();
        updateLoadMoreButton();
        // totalHits = data.totalHits;
        // console.log(totalHits);
        
        event.target.reset();
    }
    catch (error) {
        hiddenLoader();
        console.error("Error during image fetch:", error);
        iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        });
        event.target.reset();
    }

});

buttonLoad.addEventListener("click", async () => {
    currentPage += 1;
    hiddenMore();
    showLoader();
    buttonLoad.disabled = true;
    
    
    try {
        const data = await getImages(searchQuery, currentPage);
        buttonLoad.disabled = false;

        if (!data || !data.hits || data.hits.length === 0) {
            hiddenLoader();
            hiddenMore(); 
            iziToast.info({
                title: "End results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
            return;
        }
        const markup = reflectionImages(data.hits);
        gallery.insertAdjacentHTML("beforeend", markup);
        lightbox.refresh();
        // console.log(markup);
        
        hiddenLoader();
        updateLoadMoreButton();
        
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });
    } catch (error) {
        hiddenLoader();
        hiddenMore();
        buttonLoad.disabled = false;
        console.error("Error during loading more images:", error);
        iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: "topRight",
        });
    }
});

