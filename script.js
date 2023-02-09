const numberButtons = Array.from(document.querySelectorAll('.btn-number'));
const operatorButtons = Array.from(document.querySelectorAll('.btn-operator'));
const displayText = document.querySelector('.calculator__text');
const operators = ['+', '*', '/', '-','.'];

let displayValue = '';
let secondValue = '';
let operatorValue = null;
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
    }
}


function operate(operator, x , y) {
    x = parseInt(x);
    y = parseInt(y);

    let result = operations[operator](x,y);
    operatorValue = null;
    



    return result;
    
}


function getDataValue(event){
   return event.target.getAttribute('data-value');
}

function updateDisplay(value){
    if(displayText.textContent !== '0' && operatorValue == null) {
        displayText.textContent += value;
    } else if (displayText.textContent !== null) {
        displayText.textContent = value;
    }
    
}

function updateOperator(operator) {
   
    if(operatorValue !== null) {
        let secondValue = displayText.textContent;
        displayText.textContent = operate(operatorValue,firstValue,secondValue);
    }
    
    firstValue = displayText.textContent;
    operatorValue = operator;
    
}



numberButtons.forEach(button => {
    button.addEventListener('click', (e) => updateDisplay(getDataValue(e)));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => updateOperator(getDataValue(e)));
})