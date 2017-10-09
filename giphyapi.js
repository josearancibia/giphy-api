$(document).ready(function() {

  var foods = [
    "hotdog", "cheeseburger", "french fries", "lasagna", "cheese"
  ];

  // function to make buttons and add to page
  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }

  }

  $(document).on("click", ".foods-button", function() {
    $("#foods").empty();
    $(".foods-button").removeClass("active");
    $(this).addClass("active");

    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=9e23f9cc532e485798bcf268d5509830&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var foodsDiv = $("<div class=\"foods-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var foodsImage = $("<img>");
        foodsImage.attr("src", still);
        foodsImage.attr("data-still", still);
        foodsImage.attr("data-animate", animated);
        foodsImage.attr("data-state", "still");
        foodsImage.addClass("foods-image");

        foodsDiv.append(p);
        foodsDiv.append(foodsImage);

        $("#foods").append(foodsDiv);
      }
    });
  });

  $(document).on("click", ".foods-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  $("#add-foods").on("click", function(event) {
    event.preventDefault();
    var newFoods = $("input").eq(0).val();

    if (newFoods.length > 2) {
      foods.push(newFoods);
    }

    populateButtons(foods, "foods-button", "#foods-buttons");

  });

  populateButtons(foods, "foods-button", "#foods-buttons");
});