import axios from 'axios';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export default getImages;

const API_KEY = "47418994-53b3f5e850acd57effb8c0e9d";
const BASE_URL = 'https://pixabay.com/api/';

async function getImages(query, page = 1) {
    try {
        const { data } = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page,
                per_page: 15,
            }
        });
        console.log(data);
        
        if (!data || !data.hits || data.hits.length === 0) {
            throw new Error('No images found for the query');
        }
        
        return data;
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        });
        console.error("Error in getImages:", error); 
        return null;
    }
}




