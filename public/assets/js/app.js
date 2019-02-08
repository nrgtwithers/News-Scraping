// Test connection
console.log("hi")

// Display the articles information on the page && with limit of 5
$.getJSON("/getarticles", (data) => {
    for (var i = 0; i < 4; i++) {
        // Display the articles information on the page // with limit of 5
        $(".card").append("<div class=" + "card-body" + ">" + "<p data-id='" + data[i]._id + "'>" + "<h2>" + data[i].title + "</h2>" + "<br />" + data[i].summary + "<br/>" + "<a href="+data[i].link + ">Click here to read</a></p></div>")
        $(".card").append(`<button id="${data[i]._id}" class="btn btn-dark" type="button">Save Article</button> <hr>`);
    }
})

// $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

// Initiates scrape
$("#scrape").on("click", function(){
	$.ajax({
		method: "GET",
		url: "/scrape",
	}).done(function(data){
		console.log(data)
	})
});