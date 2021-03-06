let NASADownloader = require('./downloader/nasa');
let UnsplashDownloader = require('./downloader/unsplash');

// Function that's called when the button is clicked
function handleClick(textInput, gallery, searchResultsArea,) {
  let nasaRadioButton = document.querySelector("#nasa-radio");

  let downloader = undefined;
  if(nasaRadioButton.checked) {
    downloader = new NASADownloader();
  } else {
    downloader = new UnsplashDownloader();
  }

  downloader.getDataForQuery(textInput.value, gallery, searchResultsArea).then(() => {
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
    // Clear previous search result before new query
    searchResultsArea.innerHTML = "";

    handleClick(textInput, gallery, searchResultsArea);
  });
});