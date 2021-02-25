let axios = require("axios");

// Function to get thumbails and description for a query
// Pass gallery as a parameter so it can be accessed within the scope
const getDataForQuery = (query, gallery, searchResultsArea) => {
  let config = {
    params: {
      q: query,
    }
  };

  let downloadPromise = axios
    .get("https://images-api.nasa.gov/search", config)
    .then((res) => {
      let fullCollection = res.data;
      let arrayOfItems = fullCollection.collection.items;
      // console.log(arrayOfItems);

      // Display images and description for query by making a copy of gallery
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
    })
    .catch((e) => {
      console.log(e);
    });

  // return the promise so it can be accesed outside of this function
  return downloadPromise;
};

// Function that's called when the button is clicked
function handleClick(textInput, gallery, searchResultsArea,) {
  // Move to gallery section only after the download has happened.
  // i.e., only after the Promise from axios is fulfilled and not just pending
  getDataForQuery(textInput.value, gallery, searchResultsArea).then(() => {
    searchResultsArea.scrollIntoView(true);
  });
}


// Search using text input and button
document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelector("button");
  let textInput = document.querySelector("#text-input");
  let gallery = document.querySelector(".gallery");
  let searchResultsArea = document.querySelector("#search-results-area");

  button.addEventListener("click", () => {
    handleClick(textInput, gallery, searchResultsArea);

  });
});