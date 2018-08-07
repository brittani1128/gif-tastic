$( document ).ready();

var cartoons = ["rugrats", "hey arnold", "pinky and the brain", "doug", "catdog", "sailor moon", "johnny bravo", "rockos modern life", "powerpuff girls", "dexters laboratory"];


var results;

//function to render buttons on page

function renderButtons(){
    $("#cartoonButtons").empty();
    for (i = 0; i < cartoons.length; i++){
        console.log(cartoons[i]);
        var btn = $("<button>");
        btn.addClass("button");
        btn.attr("data-name", cartoons[i]);
        btn.text(cartoons[i]);
        $("#cartoonButtons").append(btn);
    }       
}

 //  form for user input to add cartoon to array, and button to page
$("#submitBtn").on("click", function(event){
    event.preventDefault();
    var newCartoon = $("#cartoonInput").val().trim();
    cartoons.push(newCartoon);
    renderButtons();
});

//on click event that makes ajax call to retrieve gifs
function getCartoon(){
    $(".button").on("click", function(){
        var limit = 10;
        var cartoon = $(this).attr("data-name");
        var api = "0OJAMidpTmJ1JC0FZoZHFGAy0ChWqHKj";
        var queryUrl = "http://api.giphy.com/v1/gifs/search?limit=10&q=" + cartoon +
        "&api_key=" + api;

        $.ajax ({
            url:queryUrl,
            method:"GET"
        }).then(function(response){
         
            results = response.data;
            console.log(results);

            for (var i = 0; i < 10; i++) {
                //store rating and still image url in variables
                var rating = results[i].rating.toUpperCase();
                var imageUrl = results[i].images.original_still.url;
                var dataAnimate = results[i].images.original.url;
                
                //create wrapper to hold image and rating
                var wrapper = $("<div class='wrapper'>");
                var imageDiv = $("<img>")

                //set attributes
                imageDiv.attr("src", imageUrl);
                imageDiv.attr({
                    "data-still": imageUrl, 
                    "data-animate": dataAnimate, 
                    "data-state": "still", 
                    "class":"gif", 
                    "alt": "cartoon image"});
                var ratingDiv = $("<p>").addClass("rating").text(rating);
                    
                //add to page
                $("#gifs").prepend(wrapper);
                wrapper.prepend(imageDiv);
                wrapper.prepend(ratingDiv);   
            }
        
            //click event to animate gif
            $(".gif").on("click", function(){
                
                var state = $(this).attr("data-state");
                
                if (state === "still"){
                    var url = $(this).attr("data-animate");
                    $(this).attr("src", url);
                    $(this).attr("data-state", "animate");
                }
                else if (state === "animate"){
                    var url = $(this).attr("data-still");
                    $(this).attr("src", url);
                    $(this).attr("data-state", "still");
                }
            });
        })     
    }); 
}


            


$(document).on("click", ".button", getCartoon);
// $(document).on("click", ".gif", getCartoon);
            
            //EXTRAS
            //  mobile responsive
            // list additional metadata (title, tags, etc)




  
renderButtons();

