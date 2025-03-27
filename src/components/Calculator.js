import React, { useState, useEffect, useCallback } from "react";
import { evaluate } from "mathjs";
import "./Calculator.css";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Format numbers with underscores (e.g., 1000000 -> 1_000_000)
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_");
  };

  // Function to handle button clicks
  const handleClick = useCallback(
    (value) => {
      if (error) setError(""); // Clear error if user starts new input
      setInput((prev) => prev + value);
    },
    [error]
  );

  // Function to clear the input
  const clearInput = () => {
    setInput("");
    setError("");
  };

  // Function to calculate result safely
  const calculateResult = useCallback(() => {
    try {
      if (input.includes("/0")) {
        setError("Cannot divide by zero");
        return;
      }
      // Remove underscores before evaluation
      const sanitizedInput = input.replace(/_/g, "");
      const result = evaluate(sanitizedInput);

      if (isNaN(result) || result === Infinity) {
        setError("Invalid Expression");
      } else {
        setInput(formatNumber(result));
      }
    } catch {
      setError("Invalid Expression");
    }
  }, [input]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event) => {
      const { key } = event;
      if (/[\d+\-*/.=_]/.test(key)) {
        if (key === "=" || key === "Enter") {
          calculateResult();
        } else {
          handleClick(key);
        }
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clearInput();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [calculateResult, handleClick]);

  return (
    <div className="calculator">
      <div className="display">{error || input || "0"}</div>
      <div className="buttons">
        {["7", "8", "9", "/"].map((char) => (
          <button key={char} onClick={() => handleClick(char)}>
            {char}
          </button>
        ))}
        {["4", "5", "6", "*"].map((char) => (
          <button key={char} onClick={() => handleClick(char)}>
            {char}
          </button>
        ))}
        {["1", "2", "3", "-"].map((char) => (
          <button key={char} onClick={() => handleClick(char)}>
            {char}
          </button>
        ))}
        {["0", "_", "+", "="].map((char) => (
          <button key={char} onClick={char === "=" ? calculateResult : () => handleClick(char)}>
            {char}
          </button>
        ))}
        <button className="clear" onClick={clearInput}>
          C
        </button>
      </div>
    </div>
  );
};

export default Calculator;
