const display = document.getElementById('display');

// Add a number or operator to the screen
function press(value) {
  if (display.value === '0' && value !== '.') {
    display.value = value;      // replace the starting 0
  } else {
    display.value += value;     // otherwise add to the end
  }
}

// Reset the screen
function clearDisplay() {
  display.value = '0';
}

// Remove the last character
function deleteLast() {
  display.value = display.value.slice(0, -1) || '0';
}

// Work out the answer
function calculate() {
  try {
    // Only allow numbers and math symbols
    if (!/^[0-9+\-*/%.() ]+$/.test(display.value)) throw new Error('bad input');
    const result = Function('return ' + display.value)();
    if (!isFinite(result)) throw new Error('bad result');
    display.value = String(result);
  } catch (error) {
    display.value = 'Error';
    setTimeout(clearDisplay, 1200);
  }
}

// Keyboard support
document.addEventListener('keydown', function (e) {
  if ('0123456789+-*/.%'.includes(e.key)) press(e.key);
  else if (e.key === 'Enter') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearDisplay();
});