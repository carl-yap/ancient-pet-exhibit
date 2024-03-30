const interactables = $(".interact");
const modal = $("#smolModal");

$(document).ready(function() {

    $("#interactables").delegate(".interact", "mouseenter", function() {
        hover($(this));
    });

    $("#interactables").delegate(".interact", "mouseleave", function() {
        unhover($(this));
    });
    
    $("#interactables").delegate(".interact", "click", async function() {
        var id = $(this).attr('id');
        
        const url = window.location.href + '/' + id;
        await $.get(url, function (data, status) { 
            if (status == 404) return;                  // NO SMOL :( FOUND

            $("#smolModalLabel").text(data.name);      //set modal title to Doggo Name
            $(".modal-body").html(createModalBody(data.petcode, data.in_gallery, data.description));
        });
    });
})


function hover(element) {
    let filename = element.attr('src');
    filename = filename.slice(0, -4);
    filename += '_hover.png';
    element.attr('src', filename);
}

function unhover(element) {
    let filename = element.attr('src');
    filename = filename.slice(0, -10);
    filename += '.png';
    element.attr('src', filename);
}

function createModalBody(petcode, in_gallery, description) {
    var carousel_items = '';
    for (let i = 1; i < in_gallery; i++) {
        carousel_items += `<div class="carousel-item"><img src="assets/smol_gallery/${petcode}_img${i}.png" class="d-block w-100" alt="${petcode}_img${i}.jpg"></div>`;
    }
    const html = `
    <div id="carouselSmol" class="carousel slide">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="assets/smol_gallery/${petcode}_img0.png" class="d-block w-100" alt="${petcode}_img0.jpg">
      </div>` +
        carousel_items
      + `
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselSmol" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselSmol" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
    </div>
    <br> ${description}
    `;
    return html;
}