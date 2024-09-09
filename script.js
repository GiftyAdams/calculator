let displayValue = "0";
let calculateValue = "";
const display = document.querySelector("#display");
const result = document.querySelector("#result");

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

// function calculateAbsolute(expression) {
//   // Remove any whitespace from the string
//   expression = expression.trim();

//   // Find the last index of a mathematical operator
//   const lastOperatorIndex = Math.max(
//     expression.lastIndexOf("+"),
//     expression.lastIndexOf("-"),
//     expression.lastIndexOf("*"),
//     expression.lastIndexOf("/"),
//     expression.lastIndexOf("x"), // if you're using 'x' for multiplication
//     expression.lastIndexOf("÷") // if you're using '÷' for division
//   );

//   // Get the substring after the last operator
//   let lastNumber = expression.substring(lastOperatorIndex + 1).trim();
//   let prefix = expression.substring(0, lastOperatorIndex + 1);

//   // Determine if the last number is negative or wrapped in (-)
//   if (lastNumber.startsWith("(-")) {
//     // If the last number is in the form (-75), remove the (-) to return the positive number
//     lastNumber = lastNumber.slice(2, -1); // Remove the (-)
//   } else if (lastNumber.startsWith("-")) {
//     // If the last number starts with a negative sign, remove it to make it positive
//     lastNumber = lastNumber.slice(1); // Remove the negative sign
//   } else if (lastNumber !== "") {
//     // If the last number is positive, wrap it in parentheses with a minus sign to make it negative
//     lastNumber = `${lastNumber}`;
//   }

//   // Combine the prefix (the part before the last number) with the modified last number
//   const updatedExpression = prefix + lastNumber;

//   return updatedExpression;
// // }
// f
// unction calculateAbsolute(expression) {
//   // Remove any whitespace from the string
//   expression = expression.trim();

//   // Find the last index of a mathematical operator
//   const lastOperatorIndex = Math.max(
//     expression.lastIndexOf("+"),
//     expression.lastIndexOf("-"),
//     expression.lastIndexOf("*"),
//     expression.lastIndexOf("/"),
//     expression.lastIndexOf("x"), // if you're using 'x' for multiplication
//     expression.lastIndexOf("÷") // if you're using '÷' for division
//   );

//   // Get the substring after the last operator
//   let lastNumber = expression.substring(lastOperatorIndex + 1).trim();
//   let prefix = expression.substring(0, lastOperatorIndex + 1);

//   // Toggle the sign and handle absolute values
//   if (lastNumber.startsWith("(-")) {
//     // If the last number is in the form (-70), remove the (-) to return the positive number
//     lastNumber = lastNumber.slice(2, -1); // Remove the "(-" and ")"
//   } else if (lastNumber.startsWith("-")) {
//     // If the last number starts with a negative sign, remove it to make it positive
//     lastNumber = lastNumber.slice(1); // Remove the negative sign
//   } else if (lastNumber !== "") {
//     // If the last number is positive, wrap it in parentheses with a minus sign to make it negative
//     lastNumber = `(-${lastNumber})`;
//   }

//   // Combine the prefix (the part before the last number) with the modified last number
//   const updatedExpression = prefix + lastNumber;

//   return updatedExpression;
// }

// // Example usage:
// // console.log((display.value = toggleAbsoluteLastNumber("85+65")));
// document.querySelector("#absolute").addEventListener("click", function () {
//   const input = document.querySelector("#display");
//   const newvalue = calculateAbsolute(displayValue);
//   displayValue = newvalue;
// });
// document.querySelector("#newAbsolute").addEventListener("click", function () {
//   const input = document.querySelector("#display");
//   const newvalue = calculateAbsolute(displayValue);
//   displayValue = newvalue;
// });
// // function calculateAbsolute() {
// //   console.log(displayValue);
// // }
// ... existing code ...

function calculateAbsolute() {
  let lastOperatorIndex = Math.max(
    displayValue.lastIndexOf("+"),
    displayValue.lastIndexOf("-"),
    displayValue.lastIndexOf("*"),
    displayValue.lastIndexOf("/"),
    displayValue.lastIndexOf("x"),
    displayValue.lastIndexOf("÷")
  );

  if (lastOperatorIndex === -1) {
    // No operator found, toggle the sign of the entire expression
    if (displayValue.startsWith("(-") && displayValue.endsWith(")")) {
      displayValue = displayValue.slice(2, -1);
    } else {
      displayValue = `(-${displayValue})`;
    }
  } else {
    let prefix = displayValue.substring(0, lastOperatorIndex + 1);
    let lastNumber = displayValue.substring(lastOperatorIndex + 1);

    if (lastNumber === "") {
      // If there's nothing after the operator, do nothing
      return;
    }

    if (prefix.endsWith("-")) {
      // Change subtraction to addition
      prefix = prefix.slice(0, -1) + "+";
      if (lastNumber.startsWith("(-") && lastNumber.endsWith(")")) {
        lastNumber = lastNumber.slice(2, -1);
      } else {
        lastNumber = `-${lastNumber}`;
      }
    } else if (prefix.endsWith("+")) {
      // Toggle between positive and negative for addition
      if (lastNumber.startsWith("-") && lastNumber.endsWith(")")) {
        lastNumber = lastNumber.slice(2, -1);
      } else {
        lastNumber = `(-${lastNumber})`;
      }
    } else {
      // For multiplication and division, just toggle the sign
      if (lastNumber.startsWith("(-") && lastNumber.endsWith(")")) {
        lastNumber = lastNumber.slice(2, -1);
      } else {
        lastNumber = `(-${lastNumber})`;
      }
    }

    displayValue = prefix + lastNumber;
  }

  updateDisplay();
}

// ... rest of the existing code ...

// Add event listeners for both absolute buttons
document
  .querySelector("#absolute")
  .addEventListener("click", calculateAbsolute);
document
  .querySelector("#newAbsolute")
  .addEventListener("click", calculateAbsolute);
