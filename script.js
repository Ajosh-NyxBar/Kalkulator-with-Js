const display = document.getElementById("display")

function appendToDisplay(input) {
  if (input === '%' && display.value !== '') {
    display.value = parseFloat(display.value) / 100;
  } else {
    display.value += input;
  }
}

function toggleSign() {
  if (display.value.startsWith('-')) {
    display.value = display.value.substring(1);
  } else {
    display.value = '-' + display.value;
  }
}

function calculate() {
  try {
    let result = eval(display.value);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error("Invalid calculation");
    }
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

function clearDisplay(){
    display.value = ""
}

function validateInput(input) {
  const validInputs = "0123456789+-*/.%";
  return validInputs.includes(input);
}

document.querySelectorAll("#keys button").forEach(button => {
  button.addEventListener("click", (e) => {
    const input = e.target.textContent;
    if (validateInput(input) || input === "=" || input === "C" || input === "±") {
      if (input === "=") {
        calculate();
      } else if (input === "C") {
        clearDisplay();
      } else if (input === "±") {
        toggleSign();
      } else {
        appendToDisplay(input);
      }
    }
  });
});

document.getElementById("percent").addEventListener("click", () => appendToDisplay('%'));
document.getElementById("toggleSign").addEventListener("click", toggleSign);
