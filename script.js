let displayValue = "0";
let calculateValue = "";
const display = document.querySelector("#display");
const result = document.querySelector("#result");
const MAX_DISPLAY_LENGTH = 21;

function updateDisplay() {
  display.textContent = displayValue;
}
function appendToDisplay(value, actualValue) {
  // Check if we are at the maximum length and prevent further input
  if (displayValue.length < MAX_DISPLAY_LENGTH) {
    if (displayValue === "0" && value !== ".") {
      displayValue = value;
      calculateValue = actualValue;
    } else {
      displayValue += value;
      calculateValue += actualValue;
    }
    updateDisplay();
    resetDisplayPosition();
  } else {
    // Optionally, you could alert the user or log a message if they hit the limit
    console.log("Maximum input length reached.");
  }
}
function clearDisplay() {
  // Add the current display (calculation) and result to history before clearing
  if (displayValue !== "0" || result.textContent !== "") {
    addToHistory(displayValue, result.textContent);
  }

  // Remove the last character from displayValue
  if (displayValue.length > 1) {
    displayValue = displayValue.slice(0, -1); // Remove the last character
  } else {
    displayValue = "0"; // If only one character, reset to "0"
  }

  // Reset calculateValue accordingly
  calculateValue = ""; // Resetting this if necessary, else you can keep it if you want to retain previous calculations

  // Update the result display and main display
  result.textContent = ""; // Clear the result
  updateDisplay(); // This updates the main display

  // Ensure display resets to original position with zero displayed
  display.classList.remove("moved");
  result.classList.remove("visible");
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
// Adding an event listener for "Enter" key
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default action (like form submission)
    calculate(); // Call the calculate function
  }
});
// Adding an event listener for the "Escape" key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearAll(); // Call a new function to clear everything
  }
});

function clearAll() {
  displayValue = "0"; // Reset display value
  calculateValue = ""; // Reset calculation value
  result.textContent = ""; // Clear result display
  updateDisplay(); // Update the display to show "0"
  resetDisplayPosition(); // Reset the display position if necessary
}
// document.addEventListener("keydown", function (event) {
//   if (event.key === "Escape") {
//     display.value = "";
//   }
// });

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
dropupcontent.addEventListener("click", function (event) {
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
dropcontent.addEventListener("click", function (event) {
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
/*building calculator history*/
// Sample data for demonstration
let historyData = [
  // { id: 1, calculation: "6×8", result: "48" },
  // { id: 2, calculation: "6,000-4,700", result: "1,300" },
  // { id: 3, calculation: "8-3", result: "5" },
  // { id: 4, calculation: "50-12.50", result: "37.5" },
  // { id: 5, calculation: "7!", result: "5,040" },
  // { id: 6, calculation: "3²", result: "9" },
  // { id: 7, calculation: "5-9", result: "-4" },
  // { id: 8, calculation: "4×9", result: "36" },
  // { id: 9, calculation: "5×5", result: "25" },
];

const editButton = document.getElementById("edit-button");
const historyList = document.getElementById("history-list");
const menuIcon = document.getElementById("menu-icon");
function renderHistory() {
  historyList.innerHTML = ""; // Clear the current history list

  historyData.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";

    // Show both the calculation and result in the history
    historyItem.innerHTML = `
      <div style="display:flex; flex-direction:row; align-items:center;">
      <button class="delete-button" data-id="${item.id}">×</button>
        <div><div class="calculation">${item.calculation}</div>
        <div class="old-result">${item.result}</div>
        </div>
      </div>
    `;

    historyList.appendChild(historyItem);
  });
  console.log(historyData);
}

function deleteAllHistory() {
  historyData = []; // Clear the history array
  localStorage.removeItem("calculatorHistory"); // Remove from local storage
  renderHistory(); // Update the displayed history
}
document
  .getElementById("delete-all-button")
  .addEventListener("click", deleteAllHistory);
function loadHistoryFromLocalStorage() {
  const storedHistory = localStorage.getItem("calculatorHistory");
  if (storedHistory) {
    historyData = JSON.parse(storedHistory);
    renderHistory();
  }
}

function toggleEditMode() {
  historyList.classList.toggle("edit-mode");
  editButton.textContent = historyList.classList.contains("edit-mode")
    ? "Done"
    : "Edit";
}

function deleteHistoryItem(id) {
  historyData = historyData.filter((item) => item.id !== id);
  renderHistory();
}

function updateResult(value) {
  calculateValue = value;
  result.textContent = calculateValue;
}

function addToHistory(calculation, res) {
  const newItem = {
    id: Date.now(),
    calculation: calculation,
    result: res, // Now storing the result too
  };

  // Add new item to the top of the history
  historyData.unshift(newItem);

  // Limit history to 30 entries
  if (historyData.length > 30) {
    historyData.pop();
  }

  renderHistory(); // Re-render the updated history
}
editButton.addEventListener("click", toggleEditMode);

historyList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const id = parseInt(e.target.getAttribute("data-id"));
    deleteHistoryItem(id);
  }
});

// Example of how to use the new functions
// This would typically be called after a calculation is performed
function performCalculation(calculation) {
  let res;
  try {
    res = eval(calculation); // Note: eval is used for simplicity, but it's not recommended for production use
  } catch (error) {
    res = "Error";
  }
  updateDisplay(calculation);
  updateResult(res);
  addToHistory(calculation, res);
}

// Initial render
renderHistory();
function showDrawer() {
  const drawer = document.getElementById("calculator-history");

  // Apply styles specifically to the calculator history drawer
  drawer.style.width = "90%";
  drawer.style.paddingLeft = "5px";
  drawer.style.paddingRight = "5px";
  drawer.style.right = "0"; // Ensure it slides in from the right if needed
}

function closeDrawer() {
  const drawer = document.getElementById("calculator-history");

  // Close the drawer by setting width and padding to 0
  drawer.style.width = "0";
  drawer.style.padding = "0";
}
