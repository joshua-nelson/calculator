const btns = Array.from(document.querySelectorAll('.btn'));
let calculation = [];
let currentCalculation = [];
const operators = ['+', '-', '*', '/','.','='];



function readInput(event){
   return event.target.getAttribute('data-value');
}

function buildCalculation(input){
    
    

    // If not in operator list push to currentCalc
    if(!operators.includes(input)) {
        currentCalculation.push(input);
    } else if(operators.includes(input)){
        calculation.push(currentCalculation);
        currentCalculation.push(input);
    }

    // if in operator list push currentCalc and start new currentCalc

    


    console.log(calculation);
}

btns.forEach(btn => {
    btn.addEventListener('click',function(e){
        buildCalculation(readInput(e));
    });
});