//Makes arrow Keys not affect page scroll
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
/////////////////////////////////////////

var game = {
  player1: {score: 0},
  player2: {score: 0}
};

game.currentPlayer = game.player1

function reset(){
  game.player1.score = 0;
  game.player2.score = 0;
};
function switchTurns(){
  if(game.currentPlayer == game.player1){
    game.currentPlayer = game.player2
  } else {
    game.currentPlayer = game.player1
  }
};
function increaseScore(){
  game.currentPlayer.score += 1
};

$btn = $('#startBtn');
$hero = $('#hero');
$r1 = $('.r1');
$r2 = $('.r2');
$r3 = $('.r3');
$r4 = $('.r4');

//Individual Enemy Cells
$e1 = $('#en-a');
$e2 = $('#en-b');
$e3 = $('#en-c');
$e4 = $('#en-d');

$top4 = [$e1, $e2, $e3, $e4];

$e5 = $('#en-e');
$e6 = $('#en-f');
$e7 = $('#en-g');
$e8 = $('#en-h');

$e9 = $('#en-i');
$e10 = $('#en-j');
$e11 = $('#en-k');
$e12 = $('#en-l');

$e13 = $('#en-m');
$e14 = $('#en-n');
$e15 = $('#en-o');
$e16 = $('#en-p');

//Key Up,Down,Left,Right Hero Functions
$(document).keydown(function(e){
    if (e.key == "ArrowLeft") {
       $hero.css("background-position", "855px")
       $r2.css("background", "linear-gradient(to bottom, teal, yellow)")
    }
    else if (e.key == "ArrowUp") {
        $hero.css("background-position", "1306px")
        $r1.css("background", "linear-gradient(to right, teal, yellow)")
        //determine hit/explode
        if ($enemy.css('display') === "block") {
          clearInterval(spin)
          clearInterval(move)
          $enemy.removeClass('enImg1 enImg2')
          $enemy.addClass('explode')
          setTimeout(function(){
            $enemy.fadeOut(1000, function(){
            $enemy.removeClass('explode')
          })
        })
    }
  }
    else if (e.key == "ArrowRight") {
        $hero.css("background-position", "167px")
        $r3.css("background", "linear-gradient(to bottom, teal, yellow)")
    }
    else if (e.key == "ArrowDown") {
        $hero.css("background-position", "1160px")
        $r4.css("background", "linear-gradient(to right, teal, yellow)")
    }
});
$(document).keyup(function(e){
    if (e.key == "ArrowLeft") {
       $hero.css("background-position", "549px")
       $r2.removeAttr("style")
    }
    else if (e.key == "ArrowUp") {
        $r1.removeAttr("style")
    }
    else if (e.key == "ArrowRight") {
         $hero.css("background-position", "429px")
         $r3.removeAttr("style")
    }
    else if (e.key == "ArrowDown") {
         $hero.css("background-position", "1014px")
         $r4.removeAttr("style")
    }
});


//Explode Enemy Functions
function explode(){

}



// sample enemy advancement function:
// function advanceEnemy(speed) {
//   var enemyAdvancement = setInterval(function() {
//     // appending the enemy to subsequent squares
//   }, speed)
// }
// advanceEnemy(Math.random * 1000)


 $enemy = $('#enemy');

// in the HTML, let's start off the enemy with class enImg1, and run this code to then switch between enImg1 and enImg2:
var spin = setInterval(function(){
   $enemy.toggleClass('enImg1');
   $enemy.toggleClass('enImg2');
 }, 100);

// Hide the 'enemy', then after a second goes by, move it to new div, and show it:
var move = setInterval(function() {
  $enemy.fadeOut(function(){
     setTimeout(function(){
        $enemy.parent().next().append($enemy)
        $enemy.fadeIn()
     }, 1000)
  })
  }, 2000)


// // Enemy Move
// setTimeout(function(){
//   $top4[i].removeClass('enImg1 enImg2')
// }, 2000);
//   setInterval(function(){
//     i += 1;
//   }, 100);



//Start/Stop Button
// $btn.on('click', spin);
