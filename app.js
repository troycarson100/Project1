//Makes arrow Keys not affect page scroll
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
/////////////////////////////////////////

// var game = {
//   player1: {score: 0},
//   player2: {score: 0}
// };
//
// game.currentPlayer = game.player1
//
//
// function reset(){
//   game.player1.score = 0;
//   game.player2.score = 0;
// };
// function switchTurns(){
//   if(game.currentPlayer == game.player1){
//      game.currentPlayer = game.player2
//   } else {
//      game.currentPlayer = game.player1
//   }
// };
//
// function increaseScore(){
// game.currentPlayer.score += 1
// };

$score = $('#score');
$btn = $('#startBtn');
$enemy = $('#enemy');
$hero = $('#hero');
$r1 = $('.r1');
$r2 = $('.r2');
$r3 = $('.r3');
$r4 = $('.r4');
$start1 = $('#start1');


function init(){
   move = setInterval(function() {
    $enemy.fadeOut(function(){
       setTimeout(function(){
          $enemy.parent().next().append($enemy)
          $enemy.fadeIn()
       }, 1000)
    })
    }, 2000)

   spin = setInterval(function(){
       $enemy.toggleClass('enImg1');
       $enemy.toggleClass('enImg2');
     }, 100);
}

function generateEnemy() {
    setTimeout(function(){
    $start1.append('<div id="enemy" class="enImg1 enemy"></div>')
    $enemy = $('#enemy')
  }, 1000);
  init();
}

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
            $enemy.fadeOut(300, function(){
            $enemy.removeClass('explode')
            $enemy.remove()
            generateEnemy()
            $score.eq(0).text(Number($score.eq(0).text()) + 100)
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

function die(){
  if ($enemy.parent().hasClass('end')) {
    $hero.css('background-image', 'url("./photos/death-poop.png")')
    $hero.css("background-position", "-237px")
  }
}

setInterval(function(){
    die();
}, 100);



//
// // sample enemy advancement function:
// function advanceEnemy(speed) {
//   var enemyAdvancement = setInterval(function() {
//     // appending the enemy to subsequent squares
//   }, speed)
// }
// advanceEnemy(Math.random * 1000)
//



// Start/Stop Button
$btn.on('click', generateEnemy);
