let Downloader = require("./downloader");

class NASADownloader extends Downloader {
  getConfig(query) {
    return {
      params: {
        q: query
      }
    };
  }

  getUrl(query) {
    return "https://images-api.nasa.gov/search";
  }

  buildArrayOfItemsFromResponse(res) {
    return res.data.collection.items;
  }

  // Create duplicates of gallery, populate it, and insert in the right place
  duplicateGalleryAndPopulate(arrayOfItems, gallery, searchResultsArea) {
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
}


module.exports = NASADownloader;