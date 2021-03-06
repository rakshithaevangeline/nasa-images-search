let axios = require("axios");

// Function that promises to fetch data using Nasa Api
const getNasaDataForQuery = (query, gallery, searchResultsArea) => {
  let config = {
    params: {
      q: query
    }
  };

  let downloadPromise = axios
    .get("https://images-api.nasa.gov/search", config)
    .then((res) => {
      let fullCollection = res.data;
      let arrayOfItems = fullCollection.collection.items;
      
      duplicateGalleryAndPopulateForNasa(arrayOfItems, gallery, searchResultsArea);
    })
    .catch((e) => {
      console.log(e);
    });

  // return the promise so it can be accesed outside of this function
  return downloadPromise;
};

// Create duplicates of gallery, populate it, and insert in the right place
function duplicateGalleryAndPopulateForNasa(arrayOfItems, gallery, searchResultsArea) {
  for (let i = 0; i < arrayOfItems.length; i++) {
    // Make a copy of gallery
    let gallerySearchResult = gallery.cloneNode(true);
    gallerySearchResult.style.display = "block";

    // Find img and description elements within each copy
    let thumbnail = gallerySearchResult.querySelector(".thumbnail img");
    let thumbDescription = gallerySearchResult.querySelector(
      ".thumbnail-description");

    thumbnail.setAttribute("src", arrayOfItems[i].links[0].href);
    thumbDescription.innerHTML = arrayOfItems[i].data[0].description;

    // Insert gallery copy inside #search-results-area
    searchResultsArea.insertAdjacentElement("beforeend", gallerySearchResult);
  }
}

module.exports = {
  getNasaDataForQuery: getNasaDataForQuery
};