// Calculator logic
document.addEventListener('DOMContentLoaded', () => {
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');
  let expression = '';

  function updateDisplay() {
    display.textContent = expression || '0';
  }

  function sanitizeExpression(expr){
    // allow only digits, operators, parentheses, decimal point and spaces
    return expr.replace(/[^0-9+\-*/(). ]/g, '');
  }

  function evaluateExpression(){
    const sanitized = sanitizeExpression(expression);
    if(!sanitized) return;
    try{
      // Use Function instead of eval for slight scoping control
      // Note: still executes JS expressions; acceptable for simple local calculator
      let result = Function('return ' + sanitized)();
      if(typeof result === 'number' && !Number.isFinite(result)){
        expression = 'Error';
      } else {
        // limit long floating results
        if(typeof result === 'number'){
          // show up to 12 significant digits
          result = parseFloat(result.toPrecision(12));
        }
        expression = String(result);
      }
    } catch (e){
      expression = 'Error';
    }
    updateDisplay();
  }

  keys.addEventListener('click', (e) => {
    const target = e.target;
    if(!target.matches('button')) return;

    const number = target.dataset.number;
    const action = target.dataset.action;

    if(number !== undefined){
      // Prevent multiple decimals in the same number
      if(number === '.'){
        // find last number chunk
        const m = expression.match(/(\d*\.?\d*)$/);
        const last = m ? m[0] : '';
        if(last.includes('.')) return; // ignore extra decimal
        if(last === ''){
          // start with 0.
          expression += '0.';
          updateDisplay();
          return;
        }
      }
      expression += number;
      updateDisplay();
      return;
    }

    if(action){
      if(action === 'clear'){
        expression = '';
        updateDisplay();
        return;
      }
      if(action === 'delete'){
        expression = expression.slice(0,-1);
        updateDisplay();
        return;
      }
      if(action === 'operator'){
        const op = target.textContent.trim();
        // allow leading minus for negatives
        if(expression === '' && op === '-'){
          expression = '-';
          updateDisplay();
          return;
        }
        // replace trailing operator with new operator
        if(/[+\-*/.]$/.test(expression)){
          // but allow replacing a dot only if operator chosen
          expression = expression.slice(0,-1) + op;
        } else {
          expression += op;
        }
        updateDisplay();
        return;
      }
      if(action === 'equals'){
        evaluateExpression();
        return;
      }
    }
  });

  // keyboard support
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if(/^[0-9]$/.test(key)){
      expression += key;
      updateDisplay();
      return;
    }
    if(key === '.'){
      // mimic button logic for decimals
      const m = expression.match(/(\d*\.?\d*)$/);
      const last = m ? m[0] : '';
      if(last.includes('.')) return;
      if(last === ''){ expression += '0.'; updateDisplay(); return; }
      expression += '.';
      updateDisplay();
      return;
    }
    if(key === 'Backspace'){
      expression = expression.slice(0,-1);
      updateDisplay();
      return;
    }
    if(key === 'Enter' || key === '='){
      e.preventDefault();
      evaluateExpression();
      return;
    }
    if(key === 'Escape'){
      expression = '';
      updateDisplay();
      return;
    }
    if(/[+\-*/]/.test(key)){
      // operator pressed
      if(expression === '' && key === '-'){
        expression = '-'; updateDisplay(); return;
      }
      if(/[+\-*/.]$/.test(expression)){
        expression = expression.slice(0,-1) + key;
      } else {
        expression += key;
      }
      updateDisplay();
      return;
    }
  });

  // initial render
  updateDisplay();
});