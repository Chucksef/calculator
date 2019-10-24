//global variables go here
var eqDisplay;
var mainDisplay;
var done = false;

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

    //attach an onClick event listener to each operator button
    for(i=0;i<operatorButtons.length;i++){
        operatorButtons[i].addEventListener("click", function(e) {
            //get clicked button's inner text and append it to the main display
            if(!done){
                var operation = ` ${e.target.innerText}`;
                var number = mainDisplay.innerText;
                if (number != ""){
                    eqDisplay.innerText += " "+number;
                    eqDisplay.innerText += operation;
                    mainDisplay.innerText = "";
                }
            } else {
                var operation = ` ${e.target.innerText}`;
                var number = mainDisplay.innerText;
                if (number != ""){
                    eqDisplay.innerText = number.replace(/,/g,"");
                    eqDisplay.innerText += operation;
                    mainDisplay.innerText = "";
                }
                done=false;
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
    if (number != "" && done==false){
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
        var answer = eqElems[0]
        if(answer==Infinity){
            answer="Compute Nicely..."
        }
        
        //make sure answer is no longer than 12 digits incl decimal
        answer = answer.toString().substring(0,15);
        answer = insertCommas(answer);
        mainDisplay.innerText = answer;
        done = true;
    }
}

function multiply(x,y){
    x = parseFloat(x);
    y = parseFloat(y);
    return x*y;
}

function divide(x,y){
    x = parseFloat(x);
    y = parseFloat(y);
    return x/y;
}

function add(x,y){
    x = parseFloat(x);
    y = parseFloat(y);
    return x+y;
}

function subtract(x,y){
    x = parseFloat(x);
    y = parseFloat(y);
    return x-y;
}

//inserts commas where they should go, even with negatives or floats
function insertCommas(num){
    var numLeft = num.toString();
    var numRight;
    var neg=false;
    if(numLeft.includes(".")){
        numRight = numLeft.split(".")[1];
        numLeft = numLeft.split(".")[0];
    }

    //checks if negative. If so, temporarily removes "-" sign
    if(numLeft.includes("-")){
        neg=true;
        numLeft = numLeft.replace("-","");
    }

    //iterates over numLeft and inserts commas Right-to-Left in separate variable
    var answer = "";
    for(i=0;i<numLeft.length;i++){
        var insert = numLeft[numLeft.length-(i+1)]
        if(i%3==0 && i>0){
            insert += ",";
        }
        answer = insert+answer;
    }

    // //remvoes final comma
    // answer = answer.substring(0,answer.length-1);

    //adds float info back on.
    if(numRight != undefined){
        answer += `.${numRight}`;
    }

    //adds back on negative sign if needed
    if(neg){
        answer = `-${answer}`;
    }
    return answer;
}