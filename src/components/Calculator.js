import React, { useState } from 'react';
import './Calculator.css';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [display, setDisplay] = useState('0'); // Current input or result
  const [expression, setExpression] = useState(''); // Full expression (e.g., "1 + 5")
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumber = (num) => {
    if (display === '0' || operation === '=') {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  };

  const handleOperation = (op) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
      setExpression(expression + ' ' + op + ' ');
      setDisplay('0');
      setOperation(op);
    } else if (operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setExpression(result + ' ' + op + ' ');
      setPrevValue(result);
      setOperation(op);
    }
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (prevValue !== null && operation) {
      const currentValue = parseFloat(display);
      const result = calculate(prevValue, currentValue, operation);
      // Show the full expression including the arguments and the result
      setExpression(`${prevValue} ${operation} ${currentValue} = ${result}`);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperation('=');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setPrevValue(null);
    setOperation(null);
  };

  return (
    <div className="calculator">
      <Display value={expression || display} />
      <div className="buttons">
        <Button label="1" onClick={() => handleNumber('1')} />
        <Button label="2" onClick={() => handleNumber('2')} />
        <Button label="3" onClick={() => handleNumber('3')} />
        <Button label="+" onClick={() => handleOperation('+')} type="operator" />
        <Button label="4" onClick={() => handleNumber('4')} />
        <Button label="5" onClick={() => handleNumber('5')} />
        <Button label="6" onClick={() => handleNumber('6')} />
        <Button label="-" onClick={() => handleOperation('-')} type="operator" />
        <Button label="7" onClick={() => handleNumber('7')} />
        <Button label="8" onClick={() => handleNumber('8')} />
        <Button label="9" onClick={() => handleNumber('9')} />
        <Button label="*" onClick={() => handleOperation('*')} type="operator" />
        <Button label="C" onClick={handleClear} type="clear" />
        <Button label="0" onClick={() => handleNumber('0')} />
        <Button label="=" onClick={handleEquals} />
        <Button label="/" onClick={() => handleOperation('/')} type="operator" />
      </div>
    </div>
  );
};

export default Calculator;