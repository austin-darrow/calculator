//basic calculator functions
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

//display functions
let display = document.querySelector('#display');
let nums = document.querySelectorAll('.nums');
let operators = document.querySelectorAll('.operators');
let equals = document.querySelector('#equals');
let clear = document.querySelector('#clear');

let displayValue;
let a;
let b;
let operation;

nums.forEach(num => {
    num.addEventListener('click', () => {
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

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (operator === '=') {
            display.textContent = operate(operation,a,b);
            a = Number(display.textContent);
            b = undefined;
            operation = undefined;
            displayValue = undefined;
        };
        if (a === undefined) {
            a = displayValue;
            display.textContent = '';
            operation = operator.value;
        } else if (b === undefined) {
            b = displayValue;
            display.textContent = operate(operation,a,b);
            a = undefined;
        };
    });
});

clear.addEventListener('click', () => {
    display.textContent = '';
    displayValue = Number(display.textContent);
    a = undefined;
    b = undefined;
    operation = undefined;
});