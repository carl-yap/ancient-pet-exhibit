const dave = $("#dave");
const doggos_btn = $("#doggos");
const hissy_btn = $("#hissys");
const birb_btn = $("#birbs");
const smol_btn = $("#smols");
const about_button = $("#about-btn");
const next_button = $("#next-btn");
const leave_button = $("#leave-btn");

const name = $("#userId");


$(document).ready(function() {

    dave.mouseenter(function() { hover(dave) });
    dave.mouseleave(function() { unhover(dave) });

    //About-btn
    let dialogue_number = 0;
    
    about_button.click(function(){
        dialogue_number = 0;
        next_button.show()
        leave_button.hide();
        fetch_dialogue(dialogue_number);
    });

    next_button.click(function(){
        dialogue_number += 1;
        fetch_dialogue(dialogue_number);

        if (dialogue_number == 3) {
            leave_button.show();
            next_button.hide();
        }
    });
    //Doggos
    doggos_btn.mouseenter(function() { hover(doggos_btn) });
    doggos_btn.mouseleave(function() { unhover(doggos_btn) });
    doggos_btn.click(function() {
        window.location.href = '/doggos';
    })
    //El Gato
    hissy_btn.mouseenter(function() { hover(hissy_btn) });
    hissy_btn.mouseleave(function() { unhover(hissy_btn) });
    hissy_btn.click(function() {
        window.location.href = '/hissys'
    })
    //Birds :>
    birb_btn.mouseenter(function() { hover(birb_btn)});
    birb_btn.mouseleave(function() { unhover(birb_btn) });
    birb_btn.click(function() {
        window.location.href = '/birbs'
    })
    //Smol uwu
    smol_btn.mouseenter(function() { hover(smol_btn)});
    smol_btn.mouseleave(function() { unhover(smol_btn) });
    smol_btn.click(function() {
        window.location.href = '/smols'
    })
});

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

function fetch_dialogue(dialogue_number) {   
    const url = window.location.href + "/next";
    $.post(url, 
    {
        dialogue_number: dialogue_number
    },
    async function(data, status) {
        if (status == 404) return;
        $("#sprite").attr("src", "assets/"+data.sprite);
        if (dialogue_number == 0) {
            await $.get(window.location.href+'/name', function (data) { $("#userId").val(data) });
            $(".modal-body").text(data.text.slice(0, 13) + $("#userId").val() + data.text.slice(13));
        } else
            $(".modal-body").text(data.text);
    });
};