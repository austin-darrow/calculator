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
    a = Number(a);
    b = Number(b);
    switch (operation) {
        case '+':
            return add(a,b).toFixed(3);
        case '-':
            return subtract(a,b).toFixed(3);
        case '/':
            return divide(a,b).toFixed(3);
        case '*':
            return multiply(a,b).toFixed(3);
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
const history = document.querySelector('#history');

let a;
let b;
let operation;
let result;


//DISPLAY NUMBERS
nums.forEach(num => {
    num.addEventListener('click', () => {
        if (result) {
            a = result;
            b = undefined;
            result = undefined;
            display.textContent = '';
        };
        if (num.value === '.') {
            if ((display.textContent + num.value)% 1 === 0)
                display.textContent = display.textContent + num.value;
        } else {
        display.textContent = display.textContent + num.value;
        };
    });
});


//MAIN OPERATION
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (a === undefined) {
            a = display.textContent;
            display.textContent = '';
            operation = operator.value;
        } else if (b === undefined) {
            b = display.textContent;
            result = operate(operation,a,b);
            display.textContent = result;
            operation = operator.value;
        };
    });
});



//SPECIAL BUTTONS
equals.addEventListener('click', () => {
    b = display.textContent;
    result = operate(operation,a,b);
    display.textContent = result;
})

backspace.addEventListener('click', () => {
    let text = display.textContent.slice(0, -1);
    display.textContent = text;
});

clear.addEventListener('click', () => {
    display.textContent = '';
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
    if (result) {
        a = undefined;
        b = result;
    };
    if (a === undefined) {
        a = display.textContent;
        display.textContent = '';
        operation = e.key;
        if (b) {
            result = operate(operation,a,b);
            display.textContent = result;
            a = undefined;
            b = result;
            result = undefined;
        };
    } else if (b === undefined) {
        b = display.textContent;
        result = operate(operation,a,b);
        display.textContent = result;
        operation = e.key;
    };
};

window.addEventListener('keydown', (e) => {
    if (result) {
        a = result;
        b = undefined;
        result = undefined;
        display.textContent = '';
    };
    if (e.key === '.') {
        if (displayValue % 1 === 0)
            display.textContent = display.textContent + e.key;
    } else if (isFinite(e.key)) {
        display.textContent = display.textContent + e.key;
    } else if (e.key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1);
    } else if (e.key === 'Enter') {
        b = display.textContent;
        result = operate(operation,a,b);
        display.textContent = result;
    } else if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') {
        afterOp(e);
    };
});