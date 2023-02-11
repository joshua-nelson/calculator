const buttons = Array.from(document.querySelectorAll('.btn'));
//const operatorButtons = Array.from(document.querySelectorAll('.btn-operator'));
const calculatorDisplay = document.querySelector('.calculator__text');
const operators = ['+', '*', '/', '-',];

// let displayValue = '';
// let secondValue = '';
// let firstValue = '';
// let operatorValue = null;
// let operatorPressed = false;
// let shouldResetDisplay = false;

let currentNumberArray = [];
let numberPressed = false;
let operatorActive = false;
let currentOperator;
let previousOperator;
let currentNumber;

calculatorDisplay.textContent = '0'

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
    currentNumberArray = [];
    calc = {};
    buttons.forEach(button => {
        if(button.classList.contains('active')) {
            button.classList.remove('active')
            operatorActive = false;
        };
    
    });

};

function resetCalculation() {
    currentNumberArray = [];
    delete calc['second-value'];
}
function operate(operator, x , y) {
    
 
    x = parseInt(x);
    y = parseInt(y);

    let result = operations[operator](x,y);

    if(String(result).includes('.')) {
        result = result.toFixed(8);
    }
    //console.log(calc['operator']);
    updateDisplay(result);
   
    console.log(result);
    resetCalculation();
    return result;
    
}

// function buildCalculation(dataValue, previousResult){

//     let secondOperatorPressed = operatorActive && 'first-value' in calc;
//     let equalsPressed = operatorActive && currentOperator == '=';
//     // If operator pressed and first value not set. Set first value
    
//     if(operatorActive && !('first-value' in calc)) {
//         if(previousResult) {
//             calc['first-value'] = previousResult;
//         } else {
//             calc['first-value'] = calculatorDisplay.textContent;
//         }
//             calc['operator'] = dataValue;
        
//     } else if ( secondOperatorPressed)  {

//         calc['second-value'] = calculatorDisplay.textContent;
//         //operate(calc['operator'],calc['first-value'], calc['second-value'])


//     } 
//     console.log(calc);
// }

function buildCalculation(buttonType, buttonValue) {
 
    if(buttonType == 'number' && !operatorActive) {
        currentNumberArray.push(buttonValue);
        currentNumber = currentNumberArray.join('');
        updateDisplay(currentNumber);
        calc['first-value'] = currentNumber;

    } else if (buttonType == 'number' && operatorActive) {
        currentNumberArray.push(buttonValue);
        currentNumber = currentNumberArray.join('');
        updateDisplay(currentNumber);
       
        calc['second-value'] = currentNumber;
       
    } else if (buttonType == 'operator' && !operatorActive) {
        calc['operator'] = buttonValue;
        currentNumberArray = [];
    } else if (buttonType == 'operator' && operatorActive) {
        console.log(calc);
        calc['first-value'] = operate(calc['operator'], calc['first-value'], calc['second-value']);
        calc['operator'] = buttonValue;
    } else if (buttonType == 'operator' && buttonValue == '=') {
        operate(calc['operator'], calc['first-value'], calc['second-value']);
    }

    console.log(calc);

}

function getDataValue(event){
   return event.target.getAttribute('data-value');
}

function updateDisplay(value){
    
    calculatorDisplay.textContent = value;

    // if(currentNumberArray.length == 0 || calculatorDisplay.textContent == '0' && numberPressed == false) {
    //     calculatorDisplay.textContent = value;
    // } else if (numberPressed && !operatorActive) {
    //     calculatorDisplay.textContent += value;
    // } else if (!numberPressed  && operatorActive){
    //     calculatorDisplay.textContent += value;
    // } else if (numberPressed && operatorActive) {
    //     calculatorDisplay.textContent += value;
    // }
    // console.log(calc);
}

function toggleActive(operatorEvent) {
    buttonClassList = operatorEvent.target.classList;
    
    buttons.forEach(button => {
        if(button.classList.contains('active')) {
            button.classList.remove('active')
            operatorActive = false;
        }
    });

    buttonClassList.add('active');
    operatorActive = true;


    // if(buttonClassList.contains('active')) {
    //     buttonClassList.remove('active');
    //     operatorActive = false;
    // } else {
    //     buttonClassList.add('active')
    //     operatorActive = true;
        
    // }

   
    
}


function getButtonValue(ButtonEvent) {
    let type = ButtonEvent.target.getAttribute('data-type');
    let value = ButtonEvent.target.getAttribute('data-value');


    
    
    if(type == 'operator') {
        buildCalculation(type, value);
        toggleActive(ButtonEvent);
    } else if (value == 'clear') {
        clear()
    } else {
        buildCalculation(type, value);
    }
    

   
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => getButtonValue(e));
});




