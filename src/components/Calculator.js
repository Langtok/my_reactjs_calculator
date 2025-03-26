import React, { useState, useEffect, useCallback } from 'react';
import './Calculator.css';
import Display from './Display';
import Button from './Button';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);

  // Function to format numbers with underscores as thousand separators
  const formatNumber = (num) => {
    const numStr = num.toString();
    if (Math.abs(num) < 1000) return numStr;
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '_');
  };

  const handleNumber = useCallback((num) => {
    if (display === '0' || operation === '=') {
      setDisplay(num);
      setExpression(num);
    } else {
      setDisplay(display + num);
      setExpression(expression + num);
    }
  }, [display, expression, operation]);

  const handleOperation = useCallback((op) => {
    if (prevValue === null) {
      const numericValue = parseFloat(display.replace(/_/g, ''));
      setPrevValue(numericValue);
      setExpression(expression + ' ' + op + ' '); // Keep the full expression
      setDisplay('0');
      setOperation(op);
    } else if (operation) {
      const numericValue = parseFloat(display.replace(/_/g, ''));
      const result = calculate(prevValue, numericValue, operation);
      setDisplay('0');
      setExpression(`${expression}${display} ${op} `); // Append the current display and new operator
      setPrevValue(result);
      setOperation(op);
    }
  }, [display, expression, prevValue, operation]);

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = useCallback(() => {
    if (prevValue !== null && operation) {
      const currentValue = parseFloat(display.replace(/_/g, ''));
      const result = calculate(prevValue, currentValue, operation);
      const formattedResult = typeof result === 'number' ? formatNumber(result) : result;
      // Append the current display and the result to the expression
      setExpression(`${expression}${display} = ${formattedResult}`);
      setDisplay(result.toString());
      setPrevValue(null);
      setOperation('=');
    }
  }, [display, expression, prevValue, operation]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setPrevValue(null);
    setOperation(null);
  }, []);

  const handleDelete = useCallback(() => {
    if (operation === '=') {
      // If we just finished a calculation, clear everything to start fresh
      setDisplay('0');
      setExpression('');
      setPrevValue(null);
      setOperation(null);
    } else if (display.length > 1) {
      // Remove the last character from display
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay);
      // Update the expression by removing the last character
      setExpression(expression.slice(0, -1));
    } else {
      // If only one character is left, reset to '0'
      setDisplay('0');
      setExpression(expression.slice(0, -1));
    }
  }, [display, expression, operation]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (/[0-9_]/.test(key)) {
        handleNumber(key);
      } else if (key === '+') {
        handleOperation('+');
      } else if (key === '-') {
        handleOperation('-');
      } else if (key === '*') {
        handleOperation('*');
      } else if (key === '/') {
        handleOperation('/');
      } else if (key === '=' || key === 'Enter') {
        handleEquals();
      } else if (key === 'c' || key === 'C' || key === 'Escape') {
        handleClear();
      } else if (key === 'Backspace') {
        handleDelete();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNumber, handleOperation, handleEquals, handleClear, handleDelete]);

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
        <Button label="Del" onClick={handleDelete} type="delete" />
        <Button label="_" onClick={() => handleNumber('_')} type="underscore" />
      </div>
    </div>
  );
};

export default Calculator;