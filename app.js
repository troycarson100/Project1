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


function switchTurns(){
  if(game.currentPlayer == game.player1){
     game.currentPlayer = game.player2;
  }
};

function getWinner() {
    if(game.player1.score > game.player2.score){
      $message.text('PLAYER 1 WINS!');
      $btn.text('restart');
      $btn.on('click', function(){
        location.reload()
      })
  } else if (game.player1.score < game.player2.score) {
      $message.text('PLAYER 2 WINS!');
      $btn.text('restart');
      $btn.on('click', function(){
        location.reload()
      })  } else {
      $message.text('TIE GAME!');
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
var $enemyL = null;
var $enemyR = null;
var $enemyD = null;

function Enemy(direction) {

  $('#start-' + direction).append('<div id="enemy-' + direction + '" style="display:none" class="enImg1 enemy spikey"></div>')

  var $enemy = $('#enemy-' + direction)

  setTimeout(function(){
    $enemy.fadeIn()
  }, 1000);

  var moveInterval = setInterval(function() {
    $enemy.fadeOut(function(){
      setTimeout(function(){
        if(direction == 'top' || direction == 'left') {
          $enemy.parent().next().append($enemy)
        } else {
          $enemy.parent().prev().append($enemy)
        }
        $enemy.fadeIn()
      }, 1000)
    })
  }, 2000)

  setInterval(function(){
    $enemy.toggleClass('enImg1');
    $enemy.toggleClass('enImg2');
  }, 100);

  setInterval(function(){
    dieMaster($enemy);
  }, 100);

}





function generateEnemy() {
  $start1.append('<div id="enemy" style="display:none" class="enImg1 enemy"></div>')
  $enemy = $('#enemy')
  setTimeout(function(){
    $enemy.fadeIn()
  }, 1000);

  move = setInterval(function() {
   $enemy.fadeOut(function(){
     if (game.currentPlayer.alive == true) {
        dieMaster($enemy);
     }
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

function generateEnemyL() {
  $start2.append('<div id="enemyL" style="display:none" class="enImg1 enemy"></div>')
  $enemyL = $('#enemyL')
  setTimeout(function(){
    $enemyL.fadeIn()
  }, 1000);

  moveL = setInterval(function() {
   $enemyL.fadeOut(function(){
     if (game.currentPlayer.alive == true) {
        dieMaster($enemyL);
     }
      setTimeout(function(){
         $enemyL.parent().next().append($enemyL)
         $enemyL.fadeIn()
      }, 750)
   })
 }, 1500)

 spinL = setInterval(function(){
      $enemyL.toggleClass('enImg1');
      $enemyL.toggleClass('enImg2');
    }, 100);
}

function generateEnemyR() {
  $start3.append('<div id="enemyR" style="display:none" class="enImg1 enemy"></div>')
  $enemyR = $('#enemyR')
  setTimeout(function(){
    $enemyR.fadeIn()
  }, 1000);

 moveR = setInterval(function() {
   $enemyR.fadeOut(function(){
     if (game.currentPlayer.alive == true) {
        dieMaster($enemyR);
     }
      setTimeout(function(){
         $enemyR.parent().prev().append($enemyR)
         $enemyR.fadeIn()
      }, 500)
   })
 }, 1000)

 spinR = setInterval(function(){
      $enemyR.toggleClass('enImg1');
      $enemyR.toggleClass('enImg2');
    }, 100);
}

function generateEnemyD() {
 $start4.append('<div id="enemyD" style="display:none" class="enImg1 enemy"></div>')
  $enemyD = $('#enemyD')
  setTimeout(function(){
    $enemyD.fadeIn()
  }, 1000);

  moveD = setInterval(function() {
   $enemyD.fadeOut(function(){
     if (game.currentPlayer.alive == true) {
        dieMaster($enemyD);
     }
      setTimeout(function(){
         $enemyD.parent().prev().append($enemyD)
         $enemyD.fadeIn()
      }, 600)
   })
 }, 1200)

  spinD = setInterval(function(){
      $enemyD.toggleClass('enImg1');
      $enemyD.toggleClass('enImg2');
    }, 100);
}

function blastEnemy(heroBGPos, enemySelector, pathSelector, spinterval, moveInterval, generateEnemySel) {
  $hero.css("background-position", heroBGPos)
  pathSelector.css("background", "linear-gradient(to bottom, teal, yellow)")
  //determine hit/explode
  if (enemySelector.css('display') === "block") {
      clearInterval(spinterval)
      clearInterval(moveInterval)
      enemySelector.removeClass('enImg1 enImg2')
      enemySelector.addClass('explode')
    setTimeout(function(){
      enemySelector.fadeOut(1000, function(){
      enemySelector.removeClass('explode')
      enemySelector.remove()
      generateEnemySel();
      game.currentPlayer.score += 100
      $score.eq(0).text(game.currentPlayer.score)
    })
    })
  }
}

//Key Up,Down,Left,Right Hero Functions
$(document).keydown(function(e){
  if (game.currentPlayer.alive == true) {
    if (e.key == "ArrowLeft") {
      blastEnemy('855px', $enemyL, $r2, spinL, moveL, generateEnemyL);
    }
    else if (e.key == "ArrowUp") {
      blastEnemy('1306px', $enemy, $r1, spin, move,   generateEnemy);

      }
    else if (e.key == "ArrowRight") {
      blastEnemy('167px', $enemyR, $r3, spinR, moveR, generateEnemyR)
    }
    else if (e.key == "ArrowDown") {
      blastEnemy('1160px', $enemyD, $r4, spinD, moveD, generateEnemyD)
    }
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

//Die Master function
function dieMaster (enemySelector){
 if (enemySelector.parent().hasClass('end')) {
  $hero.css('background-image', 'url("./photos/death-poop.png")')
  $hero.css("background-position", "-237px")
  game.currentPlayer.alive = false;

  if (game.player1.alive == false) {
    $btn.text('Player2 Start!');
    $message.text('Player 2 Turn');
  }
  if (game.player2.alive == false) {
    getWinner()
  }
  $('.spikey').remove();
  clearInterval(move)
  clearInterval(moveR)
  clearInterval(moveL)
  clearInterval(moveD)
  }
}

// Start/Stop Button
$btn.on('click', function(){
  generateEnemy();
  generateEnemyL();
  generateEnemyR();
  generateEnemyD();

    $(this).off()
    //Round 2 button
    $(this).on('click', function(){
      switchTurns();
      $hero.css('background-image', 'url("./photos/main-character-project1-transparent.png")')
      $hero.css("background-position", "-189px")
      generateEnemy();
      generateEnemyL();
      generateEnemyR();
      generateEnemyD();
  })
})
