// Initial array of animals
var topics = ["Badger", "Dog", "Giraffe", "Elephant", "Penguin", "Nautilus", "Octopus"];

// displaygiphyInfo function re-renders the HTML to display the appropriate content
function displaygiphyInfo() {

  var animalChosen = $(this).attr("data-name");
  var apiKey = "WCHN2qn2SF0CSj3127OzqiC8YPm0oUXl"
  var q = animalChosen;

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + q + "&api_key=" + apiKey + "&limit=10"

  // Creating an AJAX call for the specific giphy button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Creating a div to hold the giphy
    var giphyDiv = $("<div class='container'>");

    //Filling up the div with 10 cards:

    for (var i = 0; i < response.data.length; i++) {
      var giphyCard = $("<div class='card'>");
      var rating = response.data[i].rating.toUpperCase();
      var pOne = $("<p>").text("Rating: " + rating);
      giphyCard.append(pOne);

      // Retrieving the URLs for the image
      var image = $("<img class = 'gif'>").attr("src", response.data[i].images.original_still.url);
      image.attr("data-still", response.data[i].images.original_still.url);
      image.attr("data-animate", response.data[i].images.original.url );
      image.attr("data-state", "still");
      giphyCard.append(image);

      giphyDiv.append(giphyCard);
    }

    // Adding the div to the page
    $("#giphys-here").empty().prepend(giphyDiv);
  });

}

// Function for displaying giphy data
function renderButtons() {

  // Deleting the giphys prior to adding new giphys
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of topics
  for (var i = 0; i < topics.length; i++) {

    // Then dynamicaly generating buttons for each giphy in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of giphy-btn to our button
    a.addClass("giphy-btn btn btn-dark btn-block rounded-pill");
    // Adding a data-attribute
    a.attr("data-name", topics[i]);
    // Providing the initial button text
    a.text(topics[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where a topic button is clicked
$("#add-giphy").on("click", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var giphy = $("#giphy-input").val().trim();

  // Adding giphy from the textbox to our array
  topics.push(giphy);
  // Calling renderButtons which handles the processing of our button array
  renderButtons();
});

// This function handles events when an image is clicked
function animateGif() {
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
};

// Adding a few event listeners
$(document).on("click", ".giphy-btn", displaygiphyInfo);
$(document).on("click", ".gif", animateGif);
// Calling the renderButtons function to display the initial buttons
renderButtons();