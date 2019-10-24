//global variables go here
var eqDisplay;
var mainDisplay;
var done;

function initialSetup(){
    //sets two main output display variables
    eqDisplay = document.querySelector("#eqDisplay");
    mainDisplay = document.querySelector("#mainDisplay");
    
    //get all input buttons
    var inputButtons = Array.from(document.querySelectorAll("button.input"));
    //attach an onClick event listener to each input button
    for(i=0;i<inputButtons.length;i++){
        inputButtons[i].addEventListener("click", function(e) {
            //get clicked button's inner text and append it to the main display
            if(done){
                clearAll();
                done=false;
            }
            mainDisplay.innerText += e.target.innerText;
        })
    }

    //get all operator buttons
    var operatorButtons = Array.from(document.querySelectorAll("button.operator"));
    //attach an onClick event listener to each input button
    for(i=0;i<operatorButtons.length;i++){
        operatorButtons[i].addEventListener("click", function(e) {
            //get clicked button's inner text and append it to the main display
            var operation = ` ${e.target.innerText}`;
            var number = mainDisplay.innerText;
            if (number != ""){
                eqDisplay.innerText += " "+number;
                eqDisplay.innerText += operation;
                mainDisplay.innerText = "";
            }
        })
    }

    clearAll();
}

//run these function on window.load()
window.addEventListener('load', function () {
    initialSetup();
})

function clearAll(){
    //resets displays
    eqDisplay.innerText = "";
    mainDisplay.innerText = "";
}

function backspace(){
    //stores current main display as text string
    var disp = mainDisplay.innerText;
    //removes the last character
    disp = disp.substring(0,disp.length-1);
    mainDisplay.innerText = disp;
}

function calculate(){
    //only runs if main display is not blank
    var number = mainDisplay.innerText;
    if (number != ""){
        console.clear();
        eqDisplay.innerText += " "+number;
        var eq = eqDisplay.innerText;
        eq = eq.trim(); //remove leading or trailing space characters
        eqElems = eq.split(" ");
        console.log(eqElems);
        
        //
        var adds = eqElems.includes("+");
        var subs = eqElems.includes("-");
        var mults = eqElems.includes("x");
        var divs = eqElems.includes("/");
        
        //take care of all multiplication
        while(mults){
            var pos = eqElems.indexOf("x");
            var product = multiply(eqElems[pos-1],eqElems[pos+1]);
            eqElems.splice(pos-1,3,product);
            console.log(eqElems);
            mults = eqElems.includes("x");
        }
        
        //take care of all division
        while(divs){
            var pos = eqElems.indexOf("/");
            var divisor = divide(eqElems[pos-1],eqElems[pos+1]);
            eqElems.splice(pos-1,3,divisor);
            console.log(eqElems);
            divs = eqElems.includes("/");
        }
        
        //do all addition
        while(adds){
            var pos = eqElems.indexOf("+");
            var sum = add(eqElems[pos-1],eqElems[pos+1]);
            eqElems.splice(pos-1,3,sum);
            console.log(eqElems);
            adds = eqElems.includes("+");
        }
        
        //do all subtraction
        while(subs){
            var pos = eqElems.indexOf("-");
            var diff = subtract(eqElems[pos-1],eqElems[pos+1]);
            eqElems.splice(pos-1,3,diff);
            console.log(eqElems);
            subs = eqElems.includes("-");
        }
        
        //set main display to answer
        mainDisplay.innerText = eqElems[0];
        done = true;
    }
}

function parseEq(eq){
}

function multiply(x,y){
    x = parseInt(x);
    y = parseInt(y);
    return x*y;
}

function divide(x,y){
    x = parseInt(x);
    y = parseInt(y);
    return x/y;
}

function add(x,y){
    x = parseInt(x);
    y = parseInt(y);
    return x+y;
}

function subtract(x,y){
    x = parseInt(x);
    y = parseInt(y);
    return x-y;
}