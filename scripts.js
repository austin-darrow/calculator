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
let enterPressed = false;
display.textContent = '0';

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
    history.textContent = `${a} ${operation} ${b} =`;
    switch (operation) {
        case '+':
            return Number(add(a,b).toFixed(3));
        case '-':
            return Number(subtract(a,b).toFixed(3));
        case '/':
            return Number(divide(a,b).toFixed(3));
        case '*':
            return Number(multiply(a,b).toFixed(3));
        default:
            return "OOPS";
    };
};

//DISPLAY NUMBERS
nums.forEach(num => {
    num.addEventListener('click', () => {
        if (enterPressed) {
            enterPressed = false;
            a = undefined;
            b = undefined;
            operation = undefined;
            result = undefined;
            history.textContent = '';
            display.textContent = '';
        };
        if (result) { //When pressing a number key, if there's already a result on display, set a to that, reset everything else
            a = result;
            b = undefined;
            result = undefined;
            display.textContent = '0';
        };
        if (num.value === '.' && display.textContent.includes('.')) return
        if (display.textContent === '0') {
            display.textContent = num.value;
        } else {
            display.textContent = display.textContent + num.value;
        };
    });
});


//MAIN OPERATION
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if (enterPressed) enterPressed = false;
        if (operator === '-') {
            if (display.textContent === '0' || display.textContent === '') {
                display.textContent = '-';
                return;
            };
        };
        if (a === undefined) { //if a hasn't been set, set a to the display, reset the display, set the operator to what was chosen
            a = display.textContent;
            display.textContent = '';
            operation = operator.value;
            history.textContent = `${a} ${operation}`;
        } else if (b === undefined) { //a has been set. If b hasn't, set b to display, operate, display the results, set the op to what was chosen
            b = display.textContent;
            result = operate(operation,a,b);
            display.textContent = result;
            operation = operator.value;
            history.textContent = `${history.textContent.slice(0, -1)} ${operation}`;
        } else { //a & b have been set, operate was performed with equals, result is set.
            a = display.textContent;
            display.textContent = '';
            operation = operator.value;
            history.textContent = `${history.textContent.slice(0, -1)} ${operation}`;
        };
    });
});



//SPECIAL BUTTONS
equals.addEventListener('click', () => {
    b = display.textContent;
    result = operate(operation,a,b);
    display.textContent = result;
    enterPressed = true;
});

backspace.addEventListener('click', () => {
    display.textContent = display.textContent.slice(0, -1);
});

clear.addEventListener('click', reset);

function reset () {
    location.reload()
};


//KEYBOARD FUNCTIONALITY
function afterOp (e) {
    if (a === undefined) {
        a = display.textContent;
        display.textContent = '';
        operation = e.key;
        history.textContent = `${a} ${operation}`;
    } else if (b === undefined) {
        b = display.textContent;
        result = operate(operation,a,b);
        display.textContent = result;
        operation = e.key;
        history.textContent = `${history.textContent.slice(0, -1)} ${operation}`;
    } else {
        a = display.textContent;
        display.textContent = '';
        operation = e.key;
        history.textContent = `${history.textContent.slice(0, -1)} ${operation}`;
    };
};

window.addEventListener('keydown', (e) => {
    if (isFinite(e.key) || e.key === '.') {
        if (enterPressed) {
            enterPressed = false;
            a = undefined;
            b = undefined;
            operation = undefined;
            result = undefined;
            history.textContent = '';
            display.textContent = '';
        };
        if (result) {
            a = result;
            b = undefined;
            result = undefined;
            display.textContent = '0';
        };
        if (e.key === '.' && display.textContent.includes('.')) return 
        if (display.textContent === '0') {
            display.textContent = e.key;
        } else {
            display.textContent = display.textContent + e.key;
        };
    };
    if (e.key === '-' || e.key === '+' || e.key === '/' || e.key === '*') {
        if (enterPressed) enterPressed = false;
        if (e.key === '-') {
            if (display.textContent === '0' || display.textContent === '') {
                display.textContent = '-';
                return;
            };
        };
        afterOp(e);
    };
    if (e.key === 'Enter' || e.key === '=') {
        b = display.textContent;
        result = operate(operation,a,b);
        display.textContent = result;
        enterPressed = true;
    };
    if (e.key === 'Backspace') {
        display.textContent = display.textContent.slice(0, -1);
    };
    if (e.key === 'Escape') reset();
});