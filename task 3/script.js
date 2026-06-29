const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousValue = null;
let currentOperator = null;
let shouldResetDisplay = false;

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const action = button.dataset.action;

    if (action === 'number') {
        button.addEventListener('click', handleNumber);
    } else if (action === 'operator') {
        button.addEventListener('click', handleOperator);
    } else if (action === 'equals') {
        button.addEventListener('click', handleEquals);
    } else if (action === 'clear') {
        button.addEventListener('click', handleClear);
    } else if (action === 'delete') {
        button.addEventListener('click', handleDelete);
    }
}

function handleNumber(e) {
    const value = e.target.dataset.value;

    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }

    if (value === '.' && currentInput.includes('.')) {
        return;
    }

    currentInput += value;
    updateDisplay();
}

function handleOperator(e) {
    const operator = e.target.dataset.value;

    if (currentInput === '' && previousValue === null) {
        return;
    }

    if (currentInput === '' && previousValue !== null) {
        currentOperator = operator;
        return;
    }

    if (previousValue !== null) {
        calculate();
    }

    currentOperator = operator;
    previousValue = parseFloat(currentInput);
    currentInput = '';
}

function handleEquals() {
    if (previousValue === null || currentOperator === null) {
        return;
    }

    calculate();
    shouldResetDisplay = true;
}

function handleClear() {
    currentInput = '';
    previousValue = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function handleDelete() {
    if (shouldResetDisplay) {
        handleClear();
        return;
    }

    currentInput = currentInput.slice(0, -1);

    if (currentInput === '') {
        updateDisplay();
    } else {
        updateDisplay();
    }
}

function calculate() {
    let result;
    const current = parseFloat(currentInput);

    if (isNaN(current) || isNaN(previousValue)) {
        return;
    }

    if (currentOperator === '+') {
        result = previousValue + current;
    } else if (currentOperator === '-') {
        result = previousValue - current;
    } else if (currentOperator === '*') {
        result = previousValue * current;
    } else if (currentOperator === '/') {
        if (current === 0) {
            display.innerText = 'Error';
            currentInput = '';
            previousValue = null;
            currentOperator = null;
            return;
        }
        result = previousValue / current;
    } else if (currentOperator === '%') {
        result = previousValue % current;
    }

    display.innerText = result;
    currentInput = result.toString();
    previousValue = null;
    currentOperator = null;
}

function updateDisplay() {
    if (currentInput === '') {
        display.innerText = '0';
    } else {
        display.innerText = currentInput;
    }
}
