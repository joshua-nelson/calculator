const numberButtons = Array.from(document.querySelectorAll('.btn-number'));
const operatorButtons = Array.from(document.querySelectorAll('.btn-operator'));
const displayText = document.querySelector('.calculator__text');
const operators = ['+', '*', '/', '-','.'];

let displayValue = '';
let secondValue = '';
let operatorValue = '';
let calculation = [];
let operatorPressed = false;



const operations = {

    '+' : function (x, y) {
        return x + y;
    },
    
    '*' : function (x,y) {
        return x * y;
    },
    
    '/' : function (x,y){
        return x / y;
    },
    
    '-' : function (x,y) {
        return x - y;
    },

    'clear' : function() {
        displayValue = '';
        updateDisplay();
    }
}


function operate(operator, x , y) {
    
    return operations[operator](x,y);
    
}


function getDataValue(event){
   return event.target.getAttribute('data-value');
}

function updateDisplay(value){
    displayText.textContent = value;
}

function updateOperator(operator) {
    operatorValue = operator;
    console.log(operator);
}



numberButtons.forEach(button => {
    button.addEventListener('click', (e) => updateDisplay(getDataValue(e)));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => updateOperator(getDataValue(e)));
})