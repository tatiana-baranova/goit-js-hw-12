export default reflectionImages;
function reflectionImages(images) {
    return images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <a class="gallery-item" href="${largeImageURL}">
    <div class="gallery-image">
    <img class="image" src="${webformatURL}" alt="${tags}">
    <div>
    <ul class="description">
    <li class="list-info">
    <h3 class="info-img">Likes</h3>
    <p class="text-img">${likes}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Views</h3>
    <p class="text-img">${views}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Comments</h3>
    <p class="text-img">${comments}</p>
    </li>
    <li class="list-info">
    <h3 class="info-img">Downloads</h3>
    <p class="text-img">${downloads}</p>
    </li>
    </ul>
    </div>
    </div>
    </a>
    `).join("");
    
}