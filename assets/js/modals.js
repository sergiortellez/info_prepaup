// 4ºA

// Get the modal
var cuartoAModal = document.getElementById("4amodal");

// Get the button that opens the modal
var cuartoA = document.getElementById("4a");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
cuartoA.onclick = function () {
    cuartoAModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    cuartoAModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == cuartoAModal) {
        cuartoAModal.style.display = "none";
    }
}

// 5ºA

// Get the modal
var quintoAModal = document.getElementById("5amodal");

// Get the button that opens the modal
var cuartoA = document.getElementById("5a");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close2")[0];

// When the user clicks the button, open the modal 
cuartoA.onclick = function () {
    quintoAModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    quintoAModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == quintoAModal) {
        quintoAModal.style.display = "none";
    }
}