// first need to create a class of number buttons in calculator
 // it can display numbers
 // it has the method of operations associated with it
 
 
 class NumberButtons{
     constructor(num){
         this.num = num;
     }
     operators(sign, othernum){
         switch (sign){
            case "+":
                 return this.num + othernum;
            case "-":
                return this.num - othernum;
            case "/":
                return this.num/othernum;
            case "*":
                return this.num * othernum;
         }

     }
 }

 const one = new NumberButtons;
 const two = new NumberButtons;
 one.num = 1;
 two.num = 2;

 let x = one.operators("+",two.num);
 console.log(x);