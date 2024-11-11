let displayValue = '';
let operation = '';
let firstOperand = null;

document.addEventListener('keydown', handleKeyboardInput);

function appendNumber(number) {
    displayValue += number;
    updateDisplay();
}

function performOperation(op) {
    if (op === '√') {
        displayValue = Math.sqrt(parseFloat(displayValue)).toString();
    } else if (op === '^') {
        firstOperand = parseFloat(displayValue);
        displayValue = '';
        operation = '^';
    } else if (op === '!') {
        displayValue = factorial(parseInt(displayValue)).toString();
    } else if (op === 'log') {
        displayValue = Math.log10(parseFloat(displayValue)).toString();
    } else {
        firstOperand = parseFloat(displayValue);
        displayValue = '';
        operation = op;
    }
    updateDisplay();
}

function calculate() {
    let secondOperand = parseFloat(displayValue);
    if (operation === '+') displayValue = (firstOperand + secondOperand).toString();
    if (operation === '-') displayValue = (firstOperand - secondOperand).toString();
    if (operation === '×') displayValue = (firstOperand * secondOperand).toString();
    if (operation === '÷') {
        if (secondOperand === 0) {
            displayValue = "Error";
        } else {
            displayValue = (firstOperand / secondOperand).toString();
        }
    }
    if (operation === '^') {
        displayValue = Math.pow(firstOperand, secondOperand).toString();
    }
    updateDisplay();
    resetCalculator();
}

function factorial(n) {
    if (n < 0) return "Error";
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

function clearDisplay() {
    displayValue = '';
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = displayValue;
}

function resetCalculator() {
    operation = '';
    firstOperand = null;
}

// Keyboard Input Handler
function handleKeyboardInput(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        // If a number key is pressed, append the number
        appendNumber(key);
    } else if (key === '+') {
        performOperation('+');
    } else if (key === '-') {
        performOperation('-');
    } else if (key === '*') {
        performOperation('×');
    } else if (key === '/') {
        performOperation('÷');
    } else if (key === '^') {
        performOperation('^');
    } else if (key === 'Enter' || key === '=') {
        // Enter or '=' to calculate
        calculate();
    } else if (key === 'Backspace') {
        // Backspace to delete last character
        deleteLast();
    } else if (key === 'c' || key === 'C') {
        // 'C' to clear the display
        clearDisplay();
    } else if (key === '!') {
        // '!' to calculate factorial
        performOperation('!');
    } else if (key.toLowerCase() === 'l') {
        // 'L' to calculate logarithm (log10)
        performOperation('log');
    } else if (key === 'r') {
        // 'R' for square root
        performOperation('√');
    }
}
