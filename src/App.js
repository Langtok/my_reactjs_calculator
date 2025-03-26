import React, { useState } from "react";
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [isError, setIsError] = useState(false);

  const formatWithUnderscores = (num) => {
    // Replace commas with underscores after using toLocaleString
    return num.toLocaleString('en-US').replace(/,/g, '_');
  };

  const handleEqualClick = () => {
    try {
      const sanitizedValue = value.replace(/_/g, ""); // Remove underscores for evaluation
      if (sanitizedValue.includes("/0")) {
        setValue("Error: Division by zero");
        setIsError(true);
        return;
      }
      const result = eval(sanitizedValue); // Evaluate the sanitized expression
      setValue(formatWithUnderscores(result)); // Format the result with underscores
      setIsError(false);
    } catch (e) {
      setValue("Error: Invalid input");
      setIsError(true);
    }
  };

  const handleInputChange = (newValue) => {
    if (isError) {
      setValue(newValue);
      setIsError(false);
    } else {
      setValue(newValue);
    }
  };

  const handleKeyDown = (event) => {
    const allowedKeys = /[0-9+\-*/._()]/;
    if (event.key === "Enter") {
      handleEqualClick();
    } else if (event.key === "Backspace") {
      handleInputChange(value.slice(0, -1));
    } else if (event.key === "Escape") {
      handleInputChange('');
    } else if (allowedKeys.test(event.key)) {
      handleInputChange(value + event.key);
    } else {
      event.preventDefault();
    }
  };

  const getFontSize = () => {
    if (value.length <= 10) return "40px";
    if (value.length <= 20) return "30px";
    if (value.length <= 30) return "20px";
    return "15px";
  };

  return (
    <div className="container">
      <div className="calculator">
        <form action="" onSubmit={(e) => e.preventDefault()}>
          <div className="display">
            <input
              type="text"
              value={value}
              readOnly
              onKeyDown={handleKeyDown}
              style={{
                color: isError ? "red" : "white",
                fontSize: getFontSize(),
              }}
            />
          </div>
          <div>
            <input type="button" value="AC" onClick={() => { setValue(''); setIsError(false); }} />
            <input type="button" value="DE" onClick={() => handleInputChange(value.slice(0, -1))} />
            <input type="button" value="." onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="/" onClick={(e) => handleInputChange(value + e.target.value)} />
          </div>
          <div>
            <input type="button" value="7" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="8" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="9" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="*" onClick={(e) => handleInputChange(value + e.target.value)} />
          </div>
          <div>
            <input type="button" value="4" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="5" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="6" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="+" onClick={(e) => handleInputChange(value + e.target.value)} />
          </div>
          <div>
            <input type="button" value="1" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="2" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="3" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="-" onClick={(e) => handleInputChange(value + e.target.value)} />
          </div>
          <div>
            <input type="button" value="00" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="0" onClick={(e) => handleInputChange(value + e.target.value)} />
            <input type="button" value="=" className="equal" onClick={handleEqualClick} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
