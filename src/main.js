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
const input = document.querySelector(".form-input")
const loader = document.querySelector("#loader");
const buttonLoad = document.querySelector("#load-more")

let lightbox = new SimpleLightbox(".gallery-item", {
    captions: true,
    captionSelector: "img",
    captionType: "attr",
    captionsData: "alt",
    captionDelay: 250,
});

const showLoader = () => loader.classList.replace("hidden", "loader");
const hiddenLoader = () => loader.classList.replace("loader", "hidden");
const showMore = () => buttonLoad.classList.replace("hidden", "load-more");
const hiddenMore = () => buttonLoad.classList.replace("load-more", "hidden")

let currentPage = 1;
const perPage = 15;
let searchQuery = "";

hiddenMore();
formSearch.addEventListener("submit", async (event) => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    console.log(query);
    if (!query) {
        iziToast.error({
            title: "Error",
            message: "Please enter a search query!",
            position: "topRight",
        });
        return;
    }

    searchQuery = query;
    currentPage = 1
    gallery.innerHTML = "";
    hiddenMore();
    showLoader();

    try {
        const data = await getImages(searchQuery, currentPage);
        totalHits = data.totalHits || 0;
        hiddenLoader();

        if (!data.hits.length) {
            iziToast.info({
                title: "No results",
                message: "Sorry, no images found!",
                position: "topRight",
            });
            return;
        }
        reflectionImages(data.hits); 
        lightbox.refresh();

        if (currentPage * perPage < totalHits) {
            showMore();
        }

    } catch (error) {
        hiddenLoader();
        iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        });
        
    }

});

buttonLoad.addEventListener("click", async () => {
    currentPage += 1; 
    showLoader();

    try {
        const data = await getImages(searchQuery, currentPage);
        hiddenLoader();
        reflectionImages(data.hits);
        lightbox.refresh();

        if (currentPage * perPage >= totalHits) {
            hiddenMore();
            iziToast.info({
                title: "End results",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
        }
        const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
    behavior: "smooth",
    });
    } catch (error) {
        hiddenLoader();
        iziToast.error({
                title: "Error",
                message: "Sorry, there are no images matching your search query. Please try again!",
                position: 'topRight',
        });
        
    }
})
