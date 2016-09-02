//Makes arrow Keys not affect page scroll
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

/////////////////////////////////////////


var game = {
  player1: {score: 0, alive: true},
  player2: {score: 0, alive: true}
};

game.currentPlayer = game.player1
//Switch Turns
function switchTurns(){
  if(game.currentPlayer == game.player1){
     game.currentPlayer = game.player2;
  }
};
//Get Winner
function getWinner() {
    if(game.player1.score > game.player2.score){
      $message.css("color", "gold")
      $message.text('PLAYER 1 WINS!');
      loop.play()
      $btn.text('restart');
      $btn.on('click', function(){
        location.reload()
      })
  } else if (game.player1.score < game.player2.score) {
      $message.text('PLAYER 2 WINS!');
        $message.css("color", "gold")
      loop.play();
      $btn.text('restart');
      $btn.on('click', function(){
        location.reload()
      })  } else {
        loop.play();
      $message.text('TIE GAME!');
        $message.css("color", "gold")
      $btn.text('restart');
      $btn.on('click', function(){
          location.reload()
      })  }
}

var $message = $('#message');
var $score = $('#score');
var $btn = $('#startBtn');
var $hero = $('#hero');
var $r1 = $('.r1');
var $r2 = $('.r2');
var $r3 = $('.r3');
var $r4 = $('.r4');
var $start1 = $('#start-top');
var $start2 = $('#start-left');
var $start3 = $('#start-right');
var $start4 = $('#start-bottom');
var $enemy = null;
var moveInterval = {};
var spinterval = {};
var blasterSound = new Audio('audio/laser.mp3');
var loop = new Audio('audio/loop.mp3')
var fart = new Audio('audio/fart-03.mp3')
//Waiting Music
loop.play();

//Random Speed Generater
function getRandom(min, max){
  return Math.random() * (max - min) + min
}

//Enemy Creator
function Enemy(direction) {

  $('#start-' + direction).append('<div id="enemy-' + direction + '" style="display:none" class="enImg1 enemy spikey"></div>')

  var $enemy = $('#enemy-' + direction)

  setTimeout(function(){
    $enemy.fadeIn()
  }, getRandom(700, 1000));

  moveInterval[direction] = setInterval(function() {
    $enemy.fadeOut(function(){
      setTimeout(function(){
        if(direction == 'top' || direction == 'left') {
          $enemy.parent().next().append($enemy)
        } else {
          $enemy.parent().prev().append($enemy)
        }
        $enemy.fadeIn()
      }, getRandom(700, 1500))
    })
  }, getRandom(800, 2000))

  spinterval[direction] = setInterval(function(){
    $enemy.toggleClass('enImg1');
    $enemy.toggleClass('enImg2');
  }, 100);

  setInterval(function(){
    dieMaster($enemy, direction);
  }, 100);
}

//Blast Enemy Function
function blastEnemy(heroBGPos, pathSelector, generateEnemySel, direction) {
  $hero.css("background-position", heroBGPos)
  pathSelector.css("background", "linear-gradient(to bottom, teal, yellow)")
  //determine hit/explode
  var $enemy = $('#enemy-' + direction)

  if ($enemy.css('display') === "block") {
      clearInterval(spinterval[direction])
      clearInterval(moveInterval[direction])
      $enemy.removeClass('enImg1 enImg2')
      $enemy.addClass('explode')
    setTimeout(function(){
      $enemy.fadeOut(1000, function(){
      $enemy.removeClass('explode')
      $enemy.remove()
      generateEnemySel(direction);
      game.currentPlayer.score += 100
      $score.eq(0).text(game.currentPlayer.score)
    })
    })
  } else if ($enemy.css('display') === "none") {
      game.currentPlayer.score -= 100
  }
}

//Keydown Up,Down,Left,Right Hero Functions
$(document).keydown(function(e){
  if (game.currentPlayer.alive == true) {
    if (e.key == "ArrowLeft") {
      blastEnemy('855px', $r2, Enemy, "left");
      blasterSound.play();
    }
    else if (e.key == "ArrowUp") {
      blastEnemy('1306px', $r1, Enemy, "top");
      blasterSound.play();
      }
    else if (e.key == "ArrowRight") {
      blastEnemy('167px', $r3, Enemy, "right")
    }
    else if (e.key == "ArrowDown") {
      blastEnemy('1160px', $r4, Enemy, "bottom")
    }
  }
});
//KeyUp
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

//Die Master function
function dieMaster (enemySelector, direction){
 if (enemySelector.parent().hasClass('end')) {

  $hero.css('background-image', 'url("./photos/death-poop.png")')
  $hero.css("background-position", "-237px")
  game.currentPlayer.alive = false;
  fart.play();
  if (game.player1.alive == false) {
    loop.play();
    $btn.text('Player2 Start!');
    $message.text('Player 2 Turn');
  }
  if (game.player2.alive == false) {
    getWinner()
  }
  $('.spikey').remove();
  clearInterval(moveInterval[direction])
  }
}

// Start Button
$btn.on('click', function(){
  loop.pause();
  Enemy("top");
  Enemy("left");
  Enemy("right");
  Enemy("bottom");

    $(this).off()
    //Round 2 button

    $(this).on('click', function(){
      loop.pause();
      switchTurns();
      $hero.css('background-image', 'url("./photos/main-character-project1-transparent.png")')
      $hero.css("background-position", "-189px")
      Enemy("top");
      Enemy("left");
      Enemy("right");
      Enemy("bottom");
  })
})
