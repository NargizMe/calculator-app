const input = document.querySelector('input');
const buttonNumbers = document.querySelectorAll('.numbers');
const oppButtons = document.querySelectorAll('.buttons-opp');

const minusPlus = document.querySelector('.minus-plus');
const commo = document.querySelector('.commo');
const equal = document.querySelector('.equal');
const percentage = document.querySelector('.percentage');
const clean = document.querySelector('.clean');

let operationObj = {};
let equality = false;
let newStr;

function count(){
    if(operationObj.opp === '/'){
        input.value = parseFloat(operationObj.num1) / parseFloat(operationObj.num2);
    }
    else if(operationObj.opp === '*'){
        input.value = parseFloat(operationObj.num1) * parseFloat(operationObj.num2);
    }
    else if(operationObj.opp === '+'){
        input.value = parseFloat(operationObj.num1) + parseFloat(operationObj.num2);
    }
    else if(operationObj.opp === '-'){
        input.value = parseFloat(operationObj.num1) - parseFloat(operationObj.num2);
    }
    else if(operationObj.opp === '%'){
        input.value = parseFloat(operationObj.num1) / 100;
    }
}

buttonNumbers.forEach((btn) => {
    btn.addEventListener('click', function () {
        let currentNumber = this.getAttribute('data-value');
        addNumbers(currentNumber);
    })
})

oppButtons.forEach(btn => {
    btn.addEventListener('click', function (){
        let currentOperator = this.getAttribute('data-value');
        mathOperators(currentOperator);
    })
})

input.addEventListener('keypress', function (e) {
    if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*'){
        input.value = e.key;
        console.log(input.value)
        // mathOperators();
    }
    if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' ||
        e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0'){
        // input.value += e.key;
        console.log(input.value)
        // addNumbers();
    }
})

function addNumbers(currentNumber){
    if(equality) {
        equality = false;
    }

    if(input.value === '0'){
        input.value = '';
    }

    // if(input.value.slice(input.value.length - 2) === '.0' ){
    //     let str = input.value.slice(0, - 1);
    //     input.value = str;
    //
    //     console.log(input.value)
    // }

    if(operationObj.opp && operationObj.num1 && !operationObj.num2){
        input.value = parseFloat(currentNumber);
        operationObj.num2 = input.value;
        return;
    }
    if(operationObj.num2){
        input.value += parseFloat(currentNumber);
        operationObj.num2 = input.value;
        return;
    }

    if(!operationObj.opp && operationObj.num1){
        input.value += parseFloat(currentNumber);
        operationObj.num1 = input.value;
        return;
    }

    if(!operationObj.opp && !operationObj.num1){
        input.value = parseFloat(currentNumber);
        operationObj.num1 = input.value;
        return;
    }
}

function mathOperators(currentOperator){
    if(equality){
        operationObj.num1 = input.value;
        equality = false;
    }
    if(operationObj.opp){
        count(operationObj.num1, operationObj.opp, operationObj.num2);
        operationObj.num1 = input.value;
        operationObj.num2 = '';
        operationObj.opp = currentOperator;
    }
    else{
        operationObj.opp = currentOperator;
    }
}

percentage.addEventListener('click', function() {
    // opp = '%'
    input.value = parseFloat(input.value) / 100;
})

equal.addEventListener('click', () => {
    equality = true;
    count(operationObj.num1, operationObj.opp, operationObj.num2);
    operationObj.num1 = '';
    operationObj.num2 = '';
    operationObj.opp = '';
})

minusPlus.addEventListener('click', () => {
    input.value = -parseFloat(input.value);

    if((operationObj.num1 && operationObj.num2)){
        operationObj.num2 = input.value;
    }
    if(operationObj.num1 && !operationObj.num2){
        operationObj.num1 = input.value;
    }
})

commo.addEventListener('click', () => {
    input.value += '.0';
})

clean.addEventListener('click', () => {
    operationObj = {};
    equality = false;
    input.value = '0';
})