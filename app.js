//Makes arrow Keys not affect page scroll
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
/////////////////////////////////////////

$hero = $('#hero');
$r1 = $('.r1');
$r2 = $('.r2');
$r3 = $('.r3');
$r4 = $('.r4');

//Key Up,Down,Left,Right Hero Functions
$(document).keydown(function(e){
    if (e.key == "ArrowLeft") {
       $hero.css("background-position", "855px")
       $r2.css("background", "linear-gradient(to bottom right, teal, yellow)")
    }
    else if (e.key == "ArrowUp") {
        $hero.css("background-position", "1306px")
        $r1.css("background", "linear-gradient(to bottom right, teal, yellow)")
    }
    else if (e.key == "ArrowRight") {
        $hero.css("background-position", "167px")
        $r3.css("background", "linear-gradient(to bottom right, teal, yellow)")
    }
    else if (e.key == "ArrowDown") {
        $hero.css("background-position", "1160px")
        $r4.css("background", "linear-gradient(to bottom right, teal, yellow)")
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
