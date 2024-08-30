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
  display.value = eval(myValue);
}
function replaceSymbols(inputString) {
  // Replace "÷" with "/" and "x" with "*"
  return inputString
    .replace(/÷/g, "/")
    .replace(/x/g, "*")
    .replace(/%/g, "*(1/100)");
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

document.addEventListener("click", function () {
  display.focus();
});
