//BASIC FUNCTIONS
function add(a,b) {
    return a+b;
};

function subtract(a,b) {
    return a-b;
};

function divide(a,b) {
    return a/b;
};

function multiply(a,b) {
    return a*b;
};

function operate(operation,a,b) {
    switch (true) {
        case operation==='+':
            return add(a,b);
        case operation==='-':
            return subtract(a,b);
        case operation==='/':
            return divide(a,b);
        case operation==='*':
            return multiply(a,b);
        default:
            return "OOPS";
    };
};

//CONSTANTS & VARIABLE ASSIGNMENT
const display = document.querySelector('#display');
const nums = document.querySelectorAll('.nums');
const operators = document.querySelectorAll('.operators');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');

let displayValue;
let a;
let b;
let operation;
let result;


//DISPLAY NUMBERS
nums.forEach(num => {
    num.addEventListener('click', () => {
        if (result) {
            a = Number(result);
            b = undefined;
            result = undefined;
            display.textContent = '';
        };
        if (num.value === '.') {
            if (displayValue % 1 === 0)
                display.textContent = `${display.textContent}${num.value}`;
                displayValue = Number(display.textContent);
        } else {
        display.textContent = `${display.textContent}${num.value}`;
        displayValue = Number(display.textContent);
        };
    });
});


//MAIN OPERATION
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (a === undefined) {
            a = displayValue;
            display.textContent = '';
            operation = operator.value;
        } else if (b === undefined) {
            b = displayValue;
            result = operate(operation,a,b).toFixed(3);
            display.textContent = result;
            operation = operator.value;
        };
    });
});



//SPECIAL BUTTONS
equals.addEventListener('click', () => {
    b = Number(display.textContent);
    result = operate(operation,a,b).toFixed(3);
    display.textContent = result;
})

backspace.addEventListener('click', () => {
    let text = display.textContent.slice(0, -1);
    display.textContent = text;
    displayValue = Number(text);
});

clear.addEventListener('click', () => {
    display.textContent = '';
    displayValue = Number(display.textContent);
    resetAll();
});

function resetAll () {
    a = undefined;
    b = undefined;
    operation = undefined;
    result = undefined;
};


//KEYBOARD FUNCTIONALITY
function afterOp (e) {
    if (a === undefined) {
        a = displayValue;
        display.textContent = '';
        operation = e.key;
    } else if (b === undefined) {
        b = displayValue;
        result = operate(operation,a,b).toFixed(3);
        display.textContent = result;
        operation = e.key;
    };
};

window.addEventListener('keydown', (e) => {
    if (result) {
        a = Number(result);
        b = undefined;
        result = undefined;
        display.textContent = '';
    };
    if (e.key === '.') {
        if (displayValue % 1 === 0)
            display.textContent = `${display.textContent}${e.key}`;
            displayValue = Number(display.textContent);
    } else if (isFinite(e.key)) {
        display.textContent = `${display.textContent}${e.key}`;
        displayValue = Number(display.textContent);
    } else if (e.key === 'Backspace') {
        let text = display.textContent.slice(0, -1);
        display.textContent = text;
        displayValue = Number(text);
    } else if (e.key === 'Enter') {
        b = Number(display.textContent);
        result = operate(operation,a,b).toFixed(3);
        display.textContent = result;
    } else if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') {
        afterOp(e);
    };
});