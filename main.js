let axios = require("axios");

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
  


// Function that's called when the button is clicked
function handleClick(textInput, gallery, searchResultsArea,) {
  let unsplashRadioButton = document.querySelector("#unsplash-radio");
  let nasaRadioButton = document.querySelector("#nasa-radio");

  nasaRadioButton.addEventListener("click", () => {
    // Move to gallery only after download, not while in pending state
    getNasaDataForQuery(textInput.value, gallery, searchResultsArea).then(() => {
      searchResultsArea.scrollIntoView(true);
    });
  });

  unsplashRadioButton.addEventListener("click", () => {
    getUnsplashDataForQuery(textInput.value, gallery, searchResultsArea).then(() => {
      searchResultsArea.scrollIntoView(true);
    });
  });
}


// Search using text input and button
document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelector("button");
  let textInput = document.querySelector("#text-input");
  let gallery = document.querySelector(".gallery");
  let searchResultsArea = document.querySelector("#search-results-area");

  button.addEventListener("click", () => {
    // Clear previous search result before new query
    searchResultsArea.innerHTML = "";

    // Write code to reset both radio buttons to "off"

    handleClick(textInput, gallery, searchResultsArea);
  });
});