console.log("hi")

$.getJSON("/getarticles", (data)=>{
    for (var i = 0; i < 4; i++) {
        // Display the apropos information on the page
        $(".card").append("<div class="+"card-body"+">"+"<p data-id='" + data[i]._id + "'>" + "<h2>" +data[i].title + "</h2>" + "<br />"+ data[i].summary +"<br />" + data[i].link + "</p></div> <hr>"
        // "<button class="btn btn-dark" type="button">" + Save Article + "</button>");
        )}
})

{/* <h2>Title</h2>
        <p>This is some text within a card body.</p>
        <button class="btn btn-dark" type="button">Save Article</button> */}