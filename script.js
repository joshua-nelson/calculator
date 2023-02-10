const numberButtons = Array.from(document.querySelectorAll('.btn-number'));
const operatorButtons = Array.from(document.querySelectorAll('.btn-operator'));
const displayText = document.querySelector('.calculator__text');
const operators = ['+', '*', '/', '-',];

// let displayValue = '';
// let secondValue = '';
// let firstValue = '';
// let operatorValue = null;
// let operatorPressed = false;
// let shouldResetDisplay = false;

let calculationArray = [];
let numberPressed = false;
let operatorActive = false;
let currentOperator;
let previousOperator;
let currentNumber;

console.log(calculationArray.length);

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

let calc = {};


function operate(operator, x , y) {
    
 
    x = parseInt(x);
    y = parseInt(y);

    let result = operations[operator](x,y);
    calculationArray = [];
    updateDisplay(result);
    
}

function buildCalculation(){
    // If operator pressed and first value not set. Set first value
  
    if(operatorActive && !('first-value' in calc)) {
        calc['first-value'] = displayText.textContent;
        calc['operator'] = currentOperator;
    } else if (operatorActive && 'first-value' in calc) {
        calc['second-value'] = displayText.textContent;
        operate(calc['operator'],calc['first-value'], calc['second-value'])
    }
}


function getDataValue(event){
   return event.target.getAttribute('data-value');
}

function updateDisplay(value){
   
    if(calculationArray.length == 0 && numberPressed == false) {
        displayText.textContent = value;
    } else if (numberPressed && !operatorActive) {
        displayText.textContent += value;
    } else if (!numberPressed  && operatorActive){
        displayText.textContent += value;
    } else if (numberPressed && operatorActive) {
        displayText.textContent += value;
    }
    
}

function toggleActive(button) {
    buttonClassList = button.target.classList;
    
    if(buttonClassList.contains('active')) {
        buttonClassList.remove('active');
        operatorActive = false;
    } else {
        buttonClassList.add('active')
        operatorActive = true;
        console.log(currentOperator);
        buildCalculation();
    }
    
}

function updateOperator(operator) {
    numberPressed = false;
    currentOperator = getDataValue(operator);
    toggleActive(operator);
    
}

function updateNumber(number) {
    currentNumber = getDataValue(number); 
    updateDisplay(currentNumber);
    numberPressed = true;
   
}

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => updateNumber(e));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', (e) => updateOperator(e));
})



