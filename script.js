const display = document.querySelector("#display");

function appendToDisplay(input) {
  if (input === "/") input = "÷";
  if (input === "*") input = "x";
  display.value += input;
}

function clearDisplay() {
  // display.value = "";
  display.value = display.value.substring(0, display.value.length - 1);
}
function calculate() {
  const myValue = replaceSymbols(display.value);
  // const absoluteValue = calculateAbsolute(display.value);
  display.value = eval(myValue);
}
function replaceSymbols(inputString) {
  // Replace "÷" with "/" and "x" with "*"
  return inputString
    .replace(/÷/g, "/")
    .replace(/x/g, "*")
    .replace(/%/g, "*(1/100)");
}

function calculateAbsolute() {
  console.log(display.value);
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

function toggleAbsoluteLastNumber(expression) {
  // Remove any whitespace from the string
  expression = expression.trim();

  // Find the last index of a mathematical operator
  const lastOperatorIndex = Math.max(
    expression.lastIndexOf("+"),
    expression.lastIndexOf("-"),
    expression.lastIndexOf("*"),
    expression.lastIndexOf("/"),
    expression.lastIndexOf("x"), // if you're using 'x' for multiplication
    expression.lastIndexOf("÷") // if you're using '÷' for division
  );

  // Get the substring after the last operator
  let lastNumber = expression.substring(lastOperatorIndex + 1).trim();
  let prefix = expression.substring(0, lastOperatorIndex + 1);

  // Determine if the last number is negative or wrapped in (-)
  if (lastNumber.startsWith("(-")) {
    // If the last number is in the form (-75), remove the (-) to return the positive number
    lastNumber = lastNumber.slice(2, -1); // Remove the (-)
  } else if (lastNumber.startsWith("-")) {
    // If the last number starts with a negative sign, remove it to make it positive
    lastNumber = lastNumber.slice(1); // Remove the negative sign
  } else if (lastNumber !== "") {
    // If the last number is positive, wrap it in parentheses with a minus sign to make it negative
    lastNumber = `${lastNumber}`;
  }

  // Combine the prefix (the part before the last number) with the modified last number
  const updatedExpression = prefix + lastNumber;

  return updatedExpression;
}

function toggleAbsoluteLastNumber(expression) {
  // Remove any whitespace from the string
  expression = expression.trim();

  // Find the last index of a mathematical operator
  const lastOperatorIndex = Math.max(
    expression.lastIndexOf("+"),
    expression.lastIndexOf("-"),
    expression.lastIndexOf("*"),
    expression.lastIndexOf("/"),
    expression.lastIndexOf("x"), // if you're using 'x' for multiplication
    expression.lastIndexOf("÷") // if you're using '÷' for division
  );

  // Get the substring after the last operator
  let lastNumber = expression.substring(lastOperatorIndex + 1).trim();
  let prefix = expression.substring(0, lastOperatorIndex + 1);

  // Toggle the sign and handle absolute values
  if (lastNumber.startsWith("(-")) {
    // If the last number is in the form (-70), remove the (-) to return the positive number
    lastNumber = lastNumber.slice(2, -1); // Remove the "(-" and ")"
  } else if (lastNumber.startsWith("-")) {
    // If the last number starts with a negative sign, remove it to make it positive
    lastNumber = lastNumber.slice(1); // Remove the negative sign
  } else if (lastNumber !== "") {
    // If the last number is positive, wrap it in parentheses with a minus sign to make it negative
    lastNumber = `(-${lastNumber})`;
  }

  // Combine the prefix (the part before the last number) with the modified last number
  const updatedExpression = prefix + lastNumber;

  return updatedExpression;
}

// Example usage:
// console.log((display.value = toggleAbsoluteLastNumber("85+65")));
document.querySelector("#absolute").addEventListener("click", function () {
  const input = document.querySelector("#display");
  const newvalue = toggleAbsoluteLastNumber(input.value);
  input.value = newvalue;
});
document.querySelector("#newAbsolute").addEventListener("click", function () {
  const input = document.querySelector("#display");
  const newvalue = toggleAbsoluteLastNumber(input.value);
  input.value = newvalue;
});
