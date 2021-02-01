let axios = require("axios");


// Function to get thumbails and description for a query
const getDataForQuery = (query) => {
  let config = {
    params: {
      q: query,
    },
  };

  // Get the entire collection for the query
  axios
    .get("https://images-api.nasa.gov/search", config)
    .then((res) => {
      let fullCollection = res.data;

      // Get the first three items in the collection
      let firstThreeItems = fullCollection.collection.items.slice(0, 3);
      console.log(firstThreeItems);

      // Get a link for each item's thumbnail
      firstThreeItems.forEach((item) => {
        console.log(item.links[0].href);
      });

      // Get the description for each item
      firstThreeItems.forEach((item) => {
        console.log(item.data[0].description);
      });

      // Get alt name for each item
      firstThreeItems.forEach((item) => {
        console.log(item.data[0].title);
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

// Search using text input and button
document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelector("button");
  let textInput = document.querySelector("#text-input");


  button.addEventListener("click", () => {
    getDataForQuery(textInput.value);
  });
});
