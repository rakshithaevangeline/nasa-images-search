let axios = require("axios");

class Downloader {
  // Allows downloading search results from arbitrary APIs. Make sure subclasses implement:
  //     1. getConfig
  //     2. getUrl
  //     3. buildArrayOfItemsFromResponse
  //     4. duplicateGalleryAndPopulate
  getDataForQuery(query, gallery, searchResultsArea) {
    let config = this.getConfig(query);

    let downloadPromise = axios
      .get(this.getUrl(query), config)
      .then((res) => {
        let arrayOfItems = this.buildArrayOfItemsFromResponse(res);
        this.duplicateGalleryAndPopulate(arrayOfItems, gallery, searchResultsArea);
      })
      .catch((e) => {
        console.log(e);
      });

    // return the promise so it can be accesed outside of this function
    return downloadPromise;
  };
}

module.exports = Downloader;