let displayValue = "0";
let calculateValue = "";
const display = document.querySelector("#display");
const result = document.querySelector("#result");
let memory = 0;

function updateDisplay() {
  display.textContent = displayValue;
}
function appendToDisplay(value, actualValue) {
  if (displayValue === "0" && value !== ".") {
    displayValue = value;
    calculateValue = actualValue;
  } else {
    displayValue += value;
    calculateValue += actualValue;
  }
  updateDisplay();
  resetDisplayPosition();
}

function clearDisplay() {
  displayValue = "0";
  updateDisplay();
  resetDisplayPosition();
}
function toggleSign() {
  displayValue = displayValue.startsWith("-")
    ? displayValue.slice(1)
    : "-" + displayValue;
  updateDisplay();
}

function calculate() {
  // try {
  let calculatedResult = eval(calculateValue).toString();
  result.textContent = calculatedResult;
  display.classList.add("moved");
  result.classList.add("visible");
}
function resetDisplayPosition() {
  display.classList.remove("moved");
  result.classList.remove("visible");
}

//Adding an event lister for "Enter" key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculate();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    display.value = "";
  }
});

// document.addEventListener("click", function () {
//   display.focus();
// });

function switchDisplay() {
  document.querySelector("#scientific").style.display = "block";
  document.querySelector("#calculator").style.display = "none";
}
function secondSwitchDisplay() {
  document.querySelector("#scientific").style.display = "none";
  document.querySelector("#calculator").style.display = "block";
}

//for basic button
const dropbutton = document.querySelector(".dropbutton");
const dropupcontent = document.querySelector(".dropupcontent");

dropbutton.addEventListener("click", function () {
  if (dropupcontent.style.display === "block") {
    dropupcontent.style.display = "none";
  } else {
    dropupcontent.style.display = "block";
  }
});
document.addEventListener("click", function (event) {
  if (
    !dropbutton.contains(event.target) &&
    !dropupcontent.contains(event.target)
  ) {
    dropupcontent.style.display = "none";
  }
});

//for scientific button
const dropbtn = document.querySelector(".dropbtn");
const dropcontent = document.querySelector(".dropcontent");

dropbtn.addEventListener("click", function () {
  if (dropcontent.style.display === "block") {
    dropcontent.style.display = "none";
  } else {
    dropcontent.style.display = "block";
  }
});
document.addEventListener("click", function (event) {
  if (!dropbtn.contains(event.target) && !dropcontent.contains(event.target)) {
    dropcontent.style.display = "none";
  }
});
//for absolute button
function toggleAbsoluteLastNumber(expression) {
  // Regular expressions to match different types of numbers
  const regexNumber = /([+-]?\d+)(?=[^\d]*$)/;
  const regexParenthesizedNumber = /\(-\d+\)(?=[^\d]*$)/;

  if (regexParenthesizedNumber.test(expression)) {
    // If the last number is parenthesized negative, remove the parentheses and minus sign
    return expression.replace(regexParenthesizedNumber, (match) =>
      match.slice(2, -1)
    );
  } else if (regexNumber.test(expression)) {
    const match = expression.match(regexNumber);
    const lastNumber = match[1];

    if (lastNumber.startsWith("-")) {
      // If the number starts with a minus sign, remove it
      return expression.replace(regexNumber, lastNumber.substring(1));
    } else {
      // If the number does not start with a minus sign, add parentheses and a minus sign
      return expression.replace(regexNumber, `(-${lastNumber})`);
    }
  }

  // If no relevant match is found, return the expression unchanged
  return expression;
}

document.querySelector("#absolute").addEventListener("click", function () {
  displayValue = toggleAbsoluteLastNumber(displayValue);
  calculateValue = toggleAbsoluteLastNumber(calculateValue);
  console.log(displayValue, calculateValue);
  updateDisplay();
});

function handleExponent(superscript) {
  let number = parseFloat(displayValue);
  let calculateValue = calculateExponent(number, 2);
  displayVlaue = handleExponent(displayValue);
  calculateValue = handleExponent(displayValue);

  updateDisplay();
}

function calculateExponent(base, exponent) {
  return base ** exponent;
}

//memory functions
function memoryAdd() {
  const display = document.getElementById("#display");
  try {
    let expression = display.value.replace(/x/g, "*").replace(/÷/g, "/");
    const result = eval(expression);
    memory += result;
    console.log(`Memory added: ${memory}`); // For debugging
  } catch (error) {
    console.error("Error in memoryAdd:", error);
  }
}

function memorySubtract() {
  const display = document.getElementById("#display");
  try {
    let expression = display.value.replace(/x/g, "*").replace(/÷/g, "/");
    const result = eval(expression);
    memory -= result;
    console.log(`Memory subtracted: ${memory}`); // For debugging
  } catch (error) {
    console.error("Error in memorySubtract:", error);
  }
}

function memoryRecall() {
  const display = document.getElementById("#display");
  display.value += memory; // Append memory value to display
  console.log(`Memory recalled: ${memory}`); // For debugging
}

function memoryClear() {
  memory = 0;
  console.log("Memory cleared"); // For debugging
}
function calculateSquare() {
  const displayValue = parseFloat(displayValue);
  const calculatedResult = Math.pow(displayValue, 2); // Square the number
  // result.textContent = calculatedResult;
}
