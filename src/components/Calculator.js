import React, { useState } from 'react';
import './Calculator.css';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumber = (num) => {
    setDisplay(display === '0' ? num : display + num);
  };

  const handleOperation = (op) => {
    if (prevValue === null) {
      setPrevValue(parseFloat(display));
      setDisplay('0');
      setOperation(op);
    } else if (operation) {
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(result.toString());
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
      const result = calculate(prevValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
  };

  return (
    <div className="calculator">
      <Display value={display} />
      <div className="buttons">
        <Button label="7" onClick={() => handleNumber('7')} />
        <Button label="8" onClick={() => handleNumber('8')} />
        <Button label="9" onClick={() => handleNumber('9')} />
        <Button label="/" onClick={() => handleOperation('/')} />
        <Button label="4" onClick={() => handleNumber('4')} />
        <Button label="5" onClick={() => handleNumber('5')} />
        <Button label="6" onClick={() => handleNumber('6')} />
        <Button label="*" onClick={() => handleOperation('*')} />
        <Button label="1" onClick={() => handleNumber('1')} />
        <Button label="2" onClick={() => handleNumber('2')} />
        <Button label="3" onClick={() => handleNumber('3')} />
        <Button label="-" onClick={() => handleOperation('-')} />
        <Button label="0" onClick={() => handleNumber('0')} />
        <Button label="C" onClick={handleClear} />
        <Button label="=" onClick={handleEquals} />
        <Button label="+" onClick={() => handleOperation('+')} />
      </div>
    </div>
  );
};

export default Calculator;