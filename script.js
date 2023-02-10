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

function clear(){
    calc = {};
}
function operate(operator, x , y) {
    
 
    x = parseInt(x);
    y = parseInt(y);

    let result = operations[operator](x,y);
    
    updateDisplay(result);
    clear();
    console.log(operatorActive);
    buildCalculation(currentOperator,result);

    
}

function buildCalculation(dataValue, previousResult){

    let secondOperatorPressed = operatorActive && 'first-value' in calc;
    let equalsPressed = operatorActive && currentOperator == '=';
    // If operator pressed and first value not set. Set first value
    
    if(operatorActive && !('first-value' in calc)) {
        if(previousResult) {
            calc['first-value'] = previousResult;
        } else {
            calc['first-value'] = displayText.textContent;
        }
        
        calc['operator'] = dataValue;
    } else if ( secondOperatorPressed || equalsPressed) {
        calc['second-value'] = displayText.textContent;
        console.log(calc);
        operate(calc['operator'],calc['first-value'], calc['second-value'])


    }

    console.log(calc);
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

function toggleActive(operatorEvent) {
    buttonClassList = operatorEvent.target.classList;
    
    if(buttonClassList.contains('active')) {
        buttonClassList.remove('active');
        operatorActive = false;
    } else {
        buttonClassList.add('active')
        operatorActive = true;
        
    }

   
    
}

function updateOperator(operator) {
    numberPressed = false;
    currentOperator = getDataValue(operator);
    operatorButtons.forEach(btn => {
        if(btn.classList.contains('active')) {
            btn.classList.remove('active');
        }
    });
    toggleActive(operator);
    buildCalculation(getDataValue(operator));
    
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



