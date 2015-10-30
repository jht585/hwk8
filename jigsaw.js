////////////////////////////////
//  Randomizing the Image Set //
////////////////////////////////
var imgset = Math.floor (Math.random() * 3)+1;
var arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;}

shuffle(arr);
for (var i = 0; i < 12; i++) {
    document.getElementById((i+1).toString()).src = "./images" + imgset.toString() + "/img" + imgset.toString() + "-" + arr[i] + ".jpg";}




//////////////////////////////////////////////////////////////
//    Handler Functions for dragging and dropping images    //
//////////////////////////////////////////////////////////////
var diffX, diffY, theElement;


function grabber(event) {

    theElement = event.currentTarget;

    var posX = parseInt(theElement.style.left);
    var posY = parseInt(theElement.style.top);

    diffX = event.clientX - posX;
    diffY = event.clientY - posY;

    document.addEventListener("mousemove", mover, true);
    document.addEventListener("mouseup", dropper, true);

    event.stopPropagation();
    event.preventDefault();

}


function mover(event) {

    theElement.style.left = (event.clientX - diffX) + "px";
    theElement.style.top = (event.clientY - diffY) + "px";

    event.stopPropagation();
}


function dropper(event) {
// Perform snap when mouse released
    snapper(event);

    document.removeEventListener("mouseup", dropper, true);
    document.removeEventListener("mousemove", mover, true);

    event.stopPropagation();
}


// Reads X, Y values of pointer
// If values within range of puzzleback.gif, will round down X and Y to multiple of 100
function snapper(event) {
    if ((event.clientX > 500) && (event.clientX < 900) && (event.clientY > 50) && (event.clientY < 350)) {
        theElement.style.top = ((Math.floor((event.clientY - 50) / 100) * 100) + 50) + "px";
        theElement.style.left = (Math.floor(event.clientX / 100) * 100) + "px";
    }
}

///////////////////////
//  Timing Function  //
///////////////////////
var secondElapsed = 0;
var min = 0;
var sec = 0;
var minStr = "";
var secStr = "";
var continuing = true;

function Timer() {
  setInterval("countTime()",1000);
}

function countTime() {
  if (continuing == true) {
    min = Math.floor(secondElapsed/60);
    sec = secondElapsed - min*60;}
    if (min < 10) { minStr = "0" + min.toString()} else {minStr = min.toString()}
    if (sec < 10) { secStr = "0" + sec.toString()} else {secStr = sec.toString()}
    document.getElementById("timer").innerHTML = minStr + ":" + secStr;
    secondElapsed++;
}

function endCount() {
  continuing = false;}
