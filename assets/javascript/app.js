var giphyQueries = ["Cat", "Dog", "Elephant"];

renderButtons();

function renderButtons(){

    $("#buttons-view").empty();

    for (var i = 0; i < giphyQueries.length; i++) {
        var a = $("<button>");

        a.addClass("giphy-btn");

        a.attr ("data-name", giphyQueries[i]);

        a.text(giphyQueries[i]);

        $("#searchQueries").append(a);
    }
}

$("#submitBtn").on("click", function(event){

    event.preventDefault();

    var giphyQuery = $("#giphy-search").val().trim();

    giphyQueries.push(giphyQueries);

    renderButtons();
})


$("button").on("click", function() {
 var giphy = $(this).attr("dataname");
 //console.log("this is my giphyQuery in submit button" + giphyQuery); 
 console.log("giphy" + giphy);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphy + "&api_key=Tmzvpdyt1W5iEDGeW6c6BCNPC6STvYXG&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(response);
        for (var i=0; i < results.length; i++){
            if (results[i].rating !== "r" && results[i].rating !== "pg-13"){
                var gifDiv=$("<div>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
                var giphyimage = $("<img>");
                giphyimage.attr("src", results[i].images.fixed_height_still.url);
                giphyimage.attr("data-still",  results[i].images.fixed_height_still.url);
                giphyimage.attr("data-animate", results[i].images.fixed_height.url);
                giphyimage.attr("data-state", 'still');
                giphyimage.addClass("gif");
                gifDiv.append(p);
                gifDiv.append(giphyimage);
                $("#giphyImages").prepend(gifDiv);
            }
        }
        
       
    });

    //var giphyStill = results[i].images.fixed_height_still.url
    //var giphyAnimate = results[i].images.fixed.height.url

 $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
    if (state === "still") {
         $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
      });
    

    
});
