//////////////////////////////////////////////////////////////
//  Shuffler for randomly arranging images from random set  //
//////////////////////////////////////////////////////////////

// Selector for one of three image sets
var imgset = Math.floor (Math.random() * 3)+1;

// Array pre-structure
var arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

// Randomizer to shuffle the order of elements in the index array
function shuffle(arr) {
    for(var j, x, i = arr.length; i; j = Math.floor(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
}

// Perform shuffle
shuffle(arr);

// Assign images to existing <img> slots in order defined by array
for (var i = 0; i < 12; i++) {
    document.getElementById((i+1).toString()).src = "./images" + imgset.toString() + "/img" + imgset.toString() + "-" + arr[i] + ".jpg";
    document.getElementById((i+1).toString()).alt = (parseInt(arr[i]) - 1);
}




//////////////////////////////////////////////////////////////
//    Handler Functions for dragging and dropping images    //
//////////////////////////////////////////////////////////////
var diffX, diffY, theElement;

// Provided code for handling grabbing/ungrabbing
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



//////////////////////////////////////////////////////////////
//       Verification Function For Checking Placement       //
//////////////////////////////////////////////////////////////

function verify() {
    return function() {
        var serial;
        var correct = true;
        var imgs = document.getElementsByClassName("slot");
        for (i = 0; i < 12; i ++) {
            serial = parseInt(imgs[i].alt);
            if (((imgs[i].offsetLeft - 500) - (100 * (serial % 4)) != 0) && ((imgs[i].offsetTop - 50)  - (100 * (serial % 3)) != 0)) {
               correct = false;
            }
        }
        if (correct) {
            alert("Congratulations! You got it.");
        } else {
            alert("Better luck next time");
        }
    }
}
document.getElementById("doneButton").onclick = verify();