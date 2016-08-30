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

// function reset(){
//   game.player1.score = 0;
//   game.player2.score = 0;
// };
// function switchTurns(){
//   if(game.currentPlayer == game.player1){
//      game.currentPlayer = game.player2
//   } else {
//      alert('winner')
//   }
// };
//
// function increaseScore(){
// game.currentPlayer.score += 1
// };

var $score = $('#score');
var $btn = $('#startBtn');
var $hero = $('#hero');
var $r1 = $('.r1');
var $r2 = $('.r2');
var $r3 = $('.r3');
var $r4 = $('.r4');
var $start1 = $('#start1');
var $start2 = $('#start2');
var $start3 = $('#start3');
var $start4 = $('#start4');
var $enemy = null;
var $enemyL = null;
var $enemyR = null;
var $enemyD = null;

function generateEnemy() {
  $start1.append('<div id="enemy" style="display:none" class="enImg1 enemy"></div>')
  $enemy = $('#enemy')
  setTimeout(function(){
    $enemy.fadeIn()
  }, 1000);

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

    setInterval(function(){
        die();
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

    setInterval(function(){
        dieL();
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

    setInterval(function(){
        dieR();
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

    setInterval(function(){
        dieD();
    }, 100);
}




// function blastEnemy(heroBGPos, enemySelector, pathSelector, spinterval, moveInterval) {
//   $hero.css("background-position", heroBGPos)
//   pathSelector.css("background", "linear-gradient(to bottom, teal, yellow)")
//   //determine hit/explode
//   if (enemySelector.css('display') === "block") {
//       clearInterval(spinterval)
//       clearInterval(moveInterval)
//       enemySelector.removeClass('enImg1 enImg2')
//       enemySelector.addClass('explode')
//     setTimeout(function(){
//       enemySelector.fadeOut(1000, function(){
//       enemySelector.removeClass('explode')
//       enemySelector.remove()
//       generateEnemyL()
//       $score.eq(0).text(Number($score.eq(0).text()) + 100)
//     })
//     })
//   }
// }
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
      $score.eq(0).text(Number($score.eq(0).text()) + 100)
    })
    })
  }
}

//Key Up,Down,Left,Right Hero Functions
$(document).keydown(function(e){
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
    $enemy.hide();
    $enemyL.hide();
    $enemyR.hide();
    $enemyD.hide();
  }
}
function dieL(){
  if ($enemyL.parent().hasClass('end')) {
    $hero.css('background-image', 'url("./photos/death-poop.png")')
    $hero.css("background-position", "-237px")
    $enemy.hide();
    $enemyL.hide();
    $enemyR.hide();
    $enemyD.hide();
  }
}
function dieR(){
  if ($enemyR.parent().hasClass('end')) {
    $hero.css('background-image', 'url("./photos/death-poop.png")')
    $hero.css("background-position", "-237px")
    $enemy.hide();
    $enemyL.hide();
    $enemyR.hide();
    $enemyD.hide();
  }
}
function dieD(){
  if ($enemyD.parent().hasClass('end')) {
    $hero.css('background-image', 'url("./photos/death-poop.png")')
    $hero.css("background-position", "-237px")
    $enemy.hide();
    $enemyL.hide();
    $enemyR.hide();
    $enemyD.hide();
  }
}






// // sample enemy advancement function:
// function advanceEnemy(speed) {
//   var enemyAdvancement = setInterval(function() {
//     // appending the enemy to subsequent squares
//   }, speed)
// }
// advanceEnemy(Math.random * 1000)




// Start/Stop Button
$btn.on('click', generateEnemy);
$btn.on('click', generateEnemyL);
$btn.on('click', generateEnemyR);
$btn.on('click', generateEnemyD);
