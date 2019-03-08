var giphyQueries = ["Cat", "Dog", "Elephant"];

function renderButtons() {
  $("#giphy-buttons").empty();

  for (var i = 0; i < giphyQueries.length; i++) {
    var a = $("<button>");

    a.addClass("giphyButton btn btn-light align-items-center");

    a.attr("data-giphy", giphyQueries[i]);

    a.text(giphyQueries[i]);

    $("#giphy-buttons").append(a);
  }
}

$("#submitBtn").on("click", function(event) {
  event.preventDefault();

  var giphyQuery = $("#giphy-search")
    .val()
    .trim();

  giphyQueries.push(giphyQuery);

  $("#giphy-search").val("");

  renderButtons();
});

function fetchGiphy() {
  var giphyName = $(this).attr("data-giphy");

  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    giphyName +
    "&api_key=Tmzvpdyt1W5iEDGeW6c6BCNPC6STvYXG&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;
    console.log(results);

    $("#giphyImages").empty();
    for (var i = 0; i < results.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("displayedGiphy");

      var newRating = $("<h5>").html("Rating: " + results[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", results[i].images.fixed_height_still.url);
      newImg.attr("data-still", results[i].images.fixed_height_still.url);
      newImg.attr("data-animate", results[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      $("#giphyImages").append(newDiv);
    }
  });
}

function animateGiphy() {
  var state = $(this)
    .find("img")
    .attr("data-state");

  if (state === "still") {
    $(this)
      .find("img")
      .attr(
        "src",
        $(this)
          .find("img")
          .attr("data-animate")
      );
    $(this)
      .find("img")
      .attr("data-state", "animate");
  } else {
    $(this)
      .find("img")
      .attr(
        "src",
        $(this)
          .find("img")
          .attr("data-still")
      );
    $(this)
      .find("img")
      .attr("data-state", "still");
  }
}

$(document).ready(function() {
  renderButtons();
});

$(document).on("click", ".giphyButton", fetchGiphy);
$(document).on("click", ".displayedGiphy", animateGiphy);
