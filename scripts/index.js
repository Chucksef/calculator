//global variables go here
var eqDisplay;
var mainDisplay;

function initialSetup(){
    //sets two main output display variables
    eqDisplay = document.querySelector("#eqDisplay");
    mainDisplay = document.querySelector("#mainDisplay");
    
    //get all input buttons
    inputButtons = Array.from(document.querySelectorAll("button.input"));
    //attach an onClick event listener to each input button
    for(i=0;i<inputButtons.length;i++){
        inputButtons[i].addEventListener("click", function(e) {
            //get clicked button's inner text and append it to the main display
            mainDisplay.innerText += e.target.innerText;
        })
    }

    //reset displays
    eqDisplay.innerText="";
    mainDisplay.innerText="";
}

//run these function on window.load()
window.addEventListener('load', function () {
    initialSetup();
})
