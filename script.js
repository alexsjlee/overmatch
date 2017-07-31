//====================
//  Global Variables
//====================
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var classNameArray = ["bastion", "dva", "genji", "hanzo", "junkrat", "lucio", "mcree", "mei", "mercy", "pharah", "reaper", "reinhardt", "soldier76", "symmetra", "torbjorn", "tracer", "widowmaker", "winston", "zenyatta"];

//====================
//   Document Ready
//====================
$(document).ready(function(){
    randomizer(classNameArray);
    setTimeout(delayedStarters, 500);
    $('.themesong').prop("volume", .37);
});

//====================
//     Functions
//====================

//Initialize After Randomizer
function delayedStarters() {
    $(".back").click(card_clicked);
    games_played++;
    display_stats();
    $('.reset').click(function() {
        reset_stats();
        games_played++;
        display_stats();
        $(".card").find(".back").removeClass("clicked");
        $("#winningMsg").text("");
        $("#game-area").html("");
        randomizer(classNameArray);
        $(".back").click(card_clicked);
    });
}

function card_clicked() {
    $('.click_sound').trigger('play');
    var thisParent = $(this).parent();
    if($(thisParent).find(".back").attr("class") === "back clicked") {
        return;
    } else {
        $(thisParent).find(".back").addClass("clicked");
        if(first_card_clicked === null) {
            first_card_clicked = $(thisParent);
        } else {
            $(".back").off();
            second_card_clicked = $(thisParent);
            if($(first_card_clicked).find(".front").find("img").attr("class") === $(second_card_clicked).find(".front").find("img").attr("class")) {
                setTimeout(matched, 750);
            } else {
                attempts++;
                setTimeout(resetCards, 1000);
            }
            accuracy = (matches/attempts);
            display_stats();
        }
    }
}

//Music
function audio_off(){
    $('.fa-volume-off').removeClass('clicked');
    $('.fa-volume-up').addClass('clicked');
    $('.themesong').trigger('pause');
}
function audio_on(){
    $('.fa-volume-up').removeClass('clicked');
    $('.fa-volume-off').addClass('clicked');
    $('.themesong').trigger('play');
}

//Reset Cards Function
function resetCards() {
    $('.no_match').trigger('play');
    $(first_card_clicked).find(".back").removeClass("clicked");
    $(second_card_clicked).find(".back").removeClass("clicked");
    first_card_clicked = null;
    second_card_clicked = null;
    $(".back").click(card_clicked);
}

//You Win Function
function youWin() {
    if(accuracy > .2) {
        $('#easyMode').modal("show");
        $('.easymode').trigger('play');
    } else if(accuracy <= .2) {
        $('#clapping').modal("show");
        $('.clapping').trigger('play');
    }
}

//Display Stats Function
function display_stats() {
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    var accuracyDisplay = (accuracy*100).toFixed(0);
    if(accuracyDisplay === "NaN") {
        $(".accuracy .value").text("100%");

    } else {
        $(".accuracy .value").text(accuracyDisplay + "%");
    }
}

//Reset Stats
function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

//Matched
function matched() {
    $('.match').trigger('play');
    $(".back").off();
    matches++;
    attempts++;
    first_card_clicked = null;
    second_card_clicked = null;
    if(matches === total_possible_matches) {
        setTimeout(youWin, 500);
    } else {
        $(".back").click(card_clicked);
    }
}

//Card Template Creator
function makeNewCard(charClass) {
    var newCardDiv = $("<div>").addClass("card col-xs-2");
    var newCardBack = $("<div>").addClass("back");
    var cardBackImg = $("<img>").attr("src", "images/cardback.png");
    var newCardFront = $("<div>").addClass("front");
    var cardFrontImg = $("<img>").addClass(charClass).attr("src", "images/" + charClass + ".png");
    $("#game-area").append(newCardDiv);
    $(newCardDiv).append(newCardBack);
    $(newCardBack).append(cardBackImg);
    $(newCardDiv).append(newCardFront);
    $(newCardFront).append(cardFrontImg);
}

//Randomizer
function randomizer(listOfAllHeroesAsAnArray) {
    var array = listOfAllHeroesAsAnArray.slice();
    var newHeroPoolClass = [];
    for(var i = 0; i < 9; i++) {
        var randomNum = Math.floor(Math.random()*array.length);
        newHeroPoolClass.push(array[randomNum],array[randomNum]);
        array.splice(randomNum, 1);
    }
    for(var j = 0; j < 18; j++){
        var randomNum2 = Math.floor(Math.random()*newHeroPoolClass.length);
        var charClass = newHeroPoolClass[randomNum2];
        makeNewCard(charClass);
        newHeroPoolClass.splice(randomNum2, 1);
    }
}