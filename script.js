class Button{
    constructor(value, addHere){
        this.value = value;
        this.addHere = addHere;
    }

    buttonadder(){
        let button = document.createElement("button");
        button.innerHTML = `${this.value}`;
        button.classList.add("button");
        this.addHere.appendChild(button);
        return button;
    }
}


class Expression{
    constructor(operation){
        this.operation = operation;
    }

    evaluator(total, second, third){
        switch (second){
            case ("+"):
                total +=third;
                // console.log(total);
                break;
            case("-"):
                total -= third; 
                // console.log(total);
                break;
            case ("*"):
                total *= third;
                break;
            case ("/"):
                total /= third;
                break;
        }
    return total;
    }
    BODMAS(){
        //to be written
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
    let expression = this.stringToExpression(this.operation);
    let total = expression[0];
    for (let i = 0; i < expression.length-2; i++) {
        if(i%2 == 0 || i == 0){
            total = this.evaluator(total, expression[i+1], expression[i+2]);
            
        }
    }  
    return total;
    } 


}

// let pro = prompt("Type an operation");
// const calculation = new Expression(pro);
// console.log(calculation.operate());

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


// buttonCreator();
// need a way to store a variable which gets updated each time a button is pressed



function expressionGenerator() {
    let a = '';
    let counter = 0;
    buttonCreator().forEach((function (button){
        button.onclick = function (){
            if (counter == 0){
               a = `${button.textContent}`; 
            }

            else if(isNan(Number(button.textContent))){
                a += ` ${button.textContent} ` 
            }
            else{
                a += `${button.textContent}`;
            }
            counter = 1;
        }
    }));
    console.log(a);
}

expressionGenerator();