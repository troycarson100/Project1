//Makes arrow Keys not affect page scroll
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
/////////////////////////////////////////


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


//Start Enemy Function
function startEnemy(){

};
//Enemy Spin
function spin(){
  setInterval(function(){
    $e1.toggleClass('enImg1');
    setTimeout(function(){
      $e1.toggleClass('enImg2');
    }, 100);
  }, 100);
}

//Start/Stop Button
$btn.on('click', spin);
