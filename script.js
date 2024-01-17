const MIN = 3;
const MAX = 7;
$(document).ready(() => {
  console.log("Loaded");

  // With a function and the minimum and maximum constants we get a random number of pairs
  let pairs = getRandom(MIN, MAX);

  //We create a number array with a pair of each of the ids
  let num = new Array();
  for (let i = 1; i < pairs; i++) {
    num.push(i);
    num.push(i);
  }

  //We shuffle randomly the entire array
  //We use the sort function alongside the random function
  num = num.sort((a, b) => 0.5 - Math.random());

  console.log(num);

  //We create a variable for the elements
  let str = "";

  //We create the cards, going through the shuffled array we asign each element an id 
  for (let i = 0; i < num.length; i++) {
    let number = num[i];
    str +=
      ' <div class="card "><div class="card-inner" id="' +
      number +
      '"><div class="back"><img src="./img/back.png" alt="" /></div><div class="front"><img src="./img/' +
      number +
      '.png" alt="" /></div></div></div>';
  }

  //We store the body into a variable, then we create 2 divs and place them into their place
  let body = $("body");
  let content = $("<div class='content'> </div>");   
  let message = $("<h1 class='message hide'> Pene</h1>");   
  let cards = $("<div class='cards'> </div>");   
  content.append(message);
  content.append(cards);
  body.html(content);
  
  
  //We add the cards string we just created into the cards div
  //The string gets turned into DOM elements 
  cards.append(str);

  //We add an "on click" function to all the cards
  $(".card").on("click", function () {
    //We get the inner element of the card we clicked, we flip it
    $(this).children(".card-inner").addClass("card-flipped");
    //If there's 2 or more cards flipped
    if ($(".card-flipped").length >= 2) {
      $(".card").addClass("disable");
      //We get the ids 
      let id1 = $(".card-flipped").get(0).id;
      let id2 = $(".card-flipped").get(1).id;
      //If they have matching ids
      if (id1 == id2) {
        //We add another class to signify that the card was guessed correctly
        //This class also disables pointer events for the element
        //We also remove the card-flipped class
        $(".card-flipped").addClass("card-guessed");
        $(".card-inner").removeClass("card-flipped");
        //We add another class to add a glow to the guessed cards
        //We use a timer for esthetic purposes
        setTimeout(function () {
          $(".card").has("div.card-guessed").addClass("glow");
          $(".card").removeClass("disable");
        }, 600);
        let guessedCards = $(".card").has("div.card-guessed").length;
        let allCards = $(".card").length;
        if(guessedCards == allCards){
          message.text("You won the game!").removeClass("hide");
        }else{
          showText("You guessed a pair correctly!", message);
        }

      } 
      //If the cards don't have matching ids
      else {
        setTimeout(function () {
          //We turn all the flipped cards to their initial state
          $(".card-inner").removeClass("card-flipped");
          //We display an animation
          cards
            .addClass("shake")
            .on("animationend", () => {
              $(".cards").removeClass("shake");
              $(".card").removeClass("disable");
            });
        }, 800);
        showText("You didn't guess it right", message);
      }
    }
  });
});

function getRandom(min, max) {
  return Math.random() * (max + 1 - min) + min;
}

function showText(string, element){
  element.text(string).removeClass("hide");
  setTimeout(function () {
    element.addClass("hide")
  }, 2000);
}