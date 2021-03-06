let axios = require("axios");

// Get data promise from Unsplash api
function getUnsplashDataForQuery(query, gallery, searchResultsArea) {

  let downloadPromise = axios
    .get(`https://api.unsplash.com/search/photos?client_id=LiQoq07yVTc7TFaKvKOgFGnr71nrZEDnrqoddfJ82MM&query=${query}`)
    .then((res) => {
      let fullCollection = res.data;
      let arrayOfItems = fullCollection.results;

      duplicateGalleryAndPopulateForUnsplash(arrayOfItems, gallery, searchResultsArea);
    })
    .catch((err) => {
      console.log(err);
    });

  return downloadPromise;
}

function duplicateGalleryAndPopulateForUnsplash(arrayOfItems, gallery, searchResultsArea) {
  for (let i = 0; i < arrayOfItems.length; i++) {
    // Make a copy of gallery
    let galleryCopy = gallery.cloneNode(true);
    galleryCopy.style.display = "block";

    // Find img and description elements within each copy
    let thumbnail = galleryCopy.querySelector(".thumbnail img");
    let thumbDescription = galleryCopy.querySelector(
      ".thumbnail-description");

    thumbnail.setAttribute("src", arrayOfItems[i].urls.full);
    console.log(thumbnail.getAttribute("src"));
    thumbDescription.innerHTML = arrayOfItems[i].alt_description;
    console.log(thumbDescription.innerHTML);

    // Insert gallery copy inside #search-results-area
    searchResultsArea.insertAdjacentElement("beforeend", galleryCopy);
  }
}

module.exports = {
  getUnsplashDataForQuery: getUnsplashDataForQuery
};