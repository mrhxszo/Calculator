class Button{
    constructor(value, addHere){
        this.value = value;
        this.addHere = addHere;
    }

    buttonadder(){
        let button = document.createElement("button");
        button.innerHTML = `${this.value}`;
        if (this.value == "="){
            button.classList.add("equal");
        }
        button.classList.add("button");
        this.addHere.appendChild(button);
        return button;

}
}


class Expression{
    constructor(operation){
        this.operation = operation;
    }


    BODMASevaluator(expression){
        let counter = 0;

        while (!(expression.length == 1)){
            while(true){
                counter++;
                if (expression.includes("/")){
                    expression[expression.indexOf("/")-1] = expression[expression.indexOf("/")-1] / expression[expression.indexOf("/")+1] 
                    expression.splice(expression.indexOf("/"), 2);
                    break;

                }

                if (expression.includes("x")){
                    expression[expression.indexOf("x")-1] = expression[expression.indexOf("x")-1] * expression[expression.indexOf("x")+1] 
                    expression.splice(expression.indexOf("x"), 2);
                    break;   
                }

                if (expression.includes("+")){
                    expression[expression.indexOf("+")-1] = expression[expression.indexOf("+")-1] + expression[expression.indexOf("+")+1]; 
                    expression.splice(expression.indexOf("+"), 2);
                    break;   
                }
                if (expression.includes("-")){
                    expression[expression.indexOf("-")-1] = expression[expression.indexOf("-")-1] - expression[expression.indexOf("-")+1] 
                    expression.splice(expression.indexOf("-"), 2);
                    break;   
                }
                if (counter >20){
                    console.log(counter);
                    break;
                }
            }
        }

        return expression;
    }

    stringToExpression(arr){
        arr = arr.split(" ");//need to seprate each object with a space
        arr.forEach(element => {
            if (!isNaN(parseFloat(element,10)) ){
                arr[arr.indexOf(element)] = parseFloat(element,10);
        }});
    return arr;
    }

    operate(){
    let expression = this.stringToExpression(this.operation.join(''));
    let total = this.BODMASevaluator(expression); 
    return total;
    } 
}

function buttonCreator(){
    let arr = [];
    for (let i = 0; i <= 10; i++) {
        if (!(i == 0) && !(i  == 10)){    
            const button = new Button(`${i}` , document.querySelector(".numbers-container") );
            arr.push(button.buttonadder());
            
        }
    
        else if (i == 10){
            const point = new Button("." , document.querySelector(".numbers-container") );
            arr.push(point.buttonadder());
    
            const button = new Button("0" , document.querySelector(".numbers-container") );
            arr.push(button.buttonadder());
    
            const equalTo = new Button("=" , document.querySelector(".numbers-container") );
            arr.push(equalTo.buttonadder());
        }
    }
    
    document.querySelectorAll(".operation").forEach((element) => arr.push(element));
    
    return arr;
}


function expressionGenerator(counter, a, button){
    if (counter == 0){
            a.push(`${button.textContent}`);
        }

    else if(isNaN(Number(button.textContent)) && !button.textContent.includes(".")){
        a.push(" ");
        a.push(`${button.textContent}`);
        a.push(" ");        
    }
    else if ( !(isNaN(Number(button.textContent))) || button.textContent.includes(".") ){
        a.push(`${button.textContent}`);
    }
    return a;
}

let buttons = buttonCreator();
let counter = 0;
const equalTo = document.querySelector(".equal");
const upScreen = document.querySelector(".up");
const downScreen = document.querySelector(".down");
const buttonsArea = document.querySelector(".buttons");
const clear = document.querySelector(".Clear");
const back = document.querySelector(".Delete");

let expressionArray = [];
buttons.forEach((function (button){
    button.onclick = function (){
    expressionArray = expressionGenerator(counter, expressionArray, button);   
    counter = 1;
    }
    }));

back.onclick = function() {
    if (expressionArray[expressionArray.length-1] == " " ||expressionArray[expressionArray.length-1] == "\t" ||expressionArray[expressionArray.length-1] == "\n"){
        expressionArray.splice(expressionArray.length-1);
        expressionArray.splice(expressionArray.length-2);
    }
    else {
        expressionArray.pop();
    }
    let expression = new Expression(expressionArray);
    upScreen.innerHTML = expression.operation.join('');
    downScreen.innerHTML = '';
}
clear.onclick = function(){
    expressionArray = [];
    upScreen.innerHTML = '';
    downScreen.innerHTML = '';
}

buttonsArea.onclick = function () {
    let expression = new Expression(expressionArray);
    upScreen.innerHTML = expression.operation.join('');

}
equalTo.onclick = function (){
    let expression = new Expression(expressionArray);
    console.log(expressionArray[0],expressionArray[expressionArray.length - 1 ]);
    if(isNaN(expressionArray[0]) || isNaN(expressionArray[expressionArray.length - 1 ])){
        console.log(expressionArray[expressionArray.length - 1 ]);
        downScreen.innerHTML = "Syntax Error";
    }
    else{
        downScreen.innerHTML = expression.operate();
    }
}
