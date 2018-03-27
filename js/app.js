/*
 * Create a list that holds all of your cards
 */

let list = ["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt",
        "fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond",
        "fa fa-bomb","fa fa-leaf","fa fa-bomb","fa fa-bolt","fa fa-bicycle",
        "fa fa-paper-plane-o","fa fa-cube"];

 let move_counter = 0;
 let ImgFound = 0;
 open_card = [];
 $ratingStars = $('i');


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

list = shuffle(list);

let text = "";
for (const card of list) {
    text += `
    <li class = "card">
      <i class = "${card}"></i>
    </li>`;
}
document.getElementsByClassName("deck")[0].innerHTML = text;

let gameStarted = false;
//flipping the card when it is clicked
$('.card').click(function() {
  if (!$(this).hasClass('open')) {
    $(this).toggleClass('open show');
    gameStarted = true;
    openCard(this);
    $ratingStars = $('i');
    setRating();
    gameWon();
  }
});

// Comparison of two cards in order to match
function openCard(card) {
  open_card.push(card);
  // check if open_card array contains more than one cards
  if (open_card.length > 1) {
    // if yes then compare two cards
    if ($(open_card).children().first().attr('class') !=
        $(open_card).children().last().attr('class')) {
          // add animations
          setTimeout(function() {
            $(open_card).removeClass('open show')
              .addClass('animated infinite rubberBand');
            open_card = [];
          }, 400);
        } else { // on successful match
          $(open_card).addClass('match animated infinite wobble');
          ImgFound++;
          open_card = [];
       }
       moveCounter();
    }
  };

// Increment of moves when a card is clicked
function moveCounter() {
  move_counter++;
  document.getElementsByClassName("moves")[0].innerHTML = move_counter;
};

//SetRating as per the decrement of move_counter as stars will decrement
var rating;
function setRating() {
    if(move_counter < 12) {
      //$ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
      rating = 3;
    } else if (move_counter > 13 && move_counter < 20) {
      $ratingStars.eq(3).removeClass('fa-star').addClass('fa-star-o');
      rating = 2;
    } else if (move_counter > 21) {
      $ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
      rating = 1;
    }
};


let gameWonStatus = 0;
//logic of finishing the game
function gameWon() {
  if(ImgFound == list.length/2) {
    // make modal appear
    $('.modal-wrapper').toggleClass('open');
    $('.container').toggleClass('blur-it');
    document.getElementsByClassName("content")[0].insertAdjacentHTML("afterbegin",
      `<h3>You won!
      Count: ${move_counter},
      Rating : ${rating} star,
      Time: ${(Math.floor(secondsElapsed / 60) < 10) ?
      ('0' + Math.floor(secondsElapsed / 60)) :
      Math.floor(secondsElapsed / 60)}:${
      (secondsElapsed % 60 < 10)  ?
      ('0' + secondsElapsed % 60) : secondsElapsed % 60} .
    Do You want to play again?</h3>
  `);
    gameWonStatus = 1;
  }
};
// Refersh the game if user click YES
$('.play').click(function(){
  location.reload()
})
// close modal
$('.btn-close').click(function() {
  $('.modal-wrapper').toggleClass('open');
  $('.container').toggleClass('blur-it');
})


//Restart the game
$('.restart').click(function() {
  location.reload()
})

//Timer goes here
var secondsElapsed = 0;
// Update the count down every 1 second
var x = setInterval(function() {
  if (!gameWonStatus && gameStarted) {
    secondsElapsed++;
  }
  // Display the result in the element with id="timer"
  document.getElementsByClassName("timer")[0].innerHTML =
  `<i class='fa fa-clock-o'></i>
  ${(Math.floor(secondsElapsed / 60) < 10) ?
    ('0' + Math.floor(secondsElapsed / 60)) :
    Math.floor(secondsElapsed / 60)}:${
    (secondsElapsed % 60 < 10) ?
    ('0' + secondsElapsed % 60) : secondsElapsed % 60}`;
  }, 1000
);