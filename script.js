var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

$(document).ready(function(){
    $(".card").click(card_clicked);
});

//In an event, "this" points to the element that registered the event.

function card_clicked() {
    $(this).find(".back").addClass("clicked");
    if(first_card_clicked === null) {
        first_card_clicked = $(this);
    } else {
        $(".card").off();
        second_card_clicked = $(this);
        if($(first_card_clicked).find(".front").find("img").attr("class") === $(second_card_clicked).find(".front").find("img").attr("class")) {
            $(".card").off();
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter === total_possible_matches) {
                setTimeout(youWin, 500);
            } else {
                $(".card").click(card_clicked);
            }
        } else {
            setTimeout(resetCards, 1000);
        }
    }
}

function resetCards() {
    $(first_card_clicked).find(".back").removeClass("clicked");
    $(second_card_clicked).find(".back").removeClass("clicked");
    first_card_clicked = null;
    second_card_clicked = null;
    $(".card").click(card_clicked);
}
function youWin() {
    alert("You Win!")
}