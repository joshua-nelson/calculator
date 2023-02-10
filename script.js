const numberButtons = Array.from(document.querySelectorAll('.btn-number'));
const operatorButtons = Array.from(document.querySelectorAll('.btn-operator'));
const displayText = document.querySelector('.calculator__text');
const operators = ['+', '*', '/', '-','.'];

let displayValue = '';
let secondValue = '';
let firstValue = '';
let operatorValue = null;
let operatorPressed = false;
let shouldResetDisplay = false;



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
    }
}


function operate(operator, x , y) {
    
 
    x = parseInt(x);
    y = parseInt(y);

    let result = operations[operator](x,y);
    operatorPressed = false;
    
    return result;
    
}

function clear() {
    updateDisplay(' ');
    firstValue = '';
    secondValue = '';
    operatorValue = '';
    operatorPressed = false;
}


function getDataValue(event){
   return event.target.getAttribute('data-value');
}

function updateDisplay(value){
   
    displayText.textContent = value;
    
}

function updateOperator(operator) {
    if(operator == 'clear') clear();
 
    if(operatorPressed == true && operate != '=') {
        let secondValue = displayText.textContent;
        firstValue = operate(operatorValue,firstValue,secondValue);
        updateDisplay(firstValue);
        operatorPressed = false;
        shouldResetDisplay = true;
    } else {
        firstValue = displayText.textContent;
        operatorValue = operator;
        operatorPressed = true;
    }
    
    
    
}



numberButtons.forEach(button => {
    button.addEventListener('click', (e) => updateDisplay(getDataValue(e)));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => updateOperator(getDataValue(e)));
})