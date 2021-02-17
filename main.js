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
      let imageThumbnails = document.querySelectorAll(".image-content img");
      let imageDescriptions = document.querySelectorAll(".thumbnail-description");
      

      // Get the first three items in the collection
      let firstThreeItems = fullCollection.collection.items.slice(0, 3);
      console.log(firstThreeItems);

      // Use for loop to link image url to corresponding thumbnail
      for (let i = 0; i < firstThreeItems.length; i++) {
        let imageLink = firstThreeItems[i].links[0].href;
        imageThumbnails[i].setAttribute("src", imageLink);
      }

      // Link image description to corresponding paragraph
      for (let i = 0; i < firstThreeItems.length; i++) {
        let imageDescription = firstThreeItems[i].data[0].description;
        imageDescriptions[i].innerHTML = imageDescription;
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// Function that's called when the button is clicked
function handleClick(gallery, textInput) {

  // Get data for the given query
  getDataForQuery(textInput.value);

  // Display gallery on click
  gallery.style.display = "flex";

   // Move the view to gallery div element after click
   gallery.scrollIntoView(true);
}


// Search using text input and button
document.addEventListener("DOMContentLoaded", () => {
  let button = document.querySelector("button");
  let textInput = document.querySelector("#text-input");
  let gallery = document.querySelector(".gallery");


  button.addEventListener("click", () => handleClick(gallery, textInput));
});