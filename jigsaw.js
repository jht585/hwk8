var imgset = Math.floor (Math.random() * 3)+1;
var arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;}

shuffle(arr);
for (var i = 0; i < 12; i++) {
    document.getElementById((i+1).toString()).src = "./images" + imgset.toString() + "/img" + imgset.toString() + "-" + arr[i] + ".jpg";}






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

    snapper(event);

    document.removeEventListener("mouseup", dropper, true);
    document.removeEventListener("mousemove", mover, true);

    event.stopPropagation();
}



function snapper(event) {
    if (500 < event.clientX < 900 && 50 < event.clientY < 350) {
        theElement.style.top = ((Math.floor((event.clientY - 50) / 100) * 100) + 50) + "px";
        theElement.style.left = (Math.floor(event.clientX / 100) * 100) + "px";
    }

}
