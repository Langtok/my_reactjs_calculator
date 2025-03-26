import React from 'react';
import './Button.css';

const Button = ({ label, onClick, type }) => {
  return (
    <button className={`button ${type || ''}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;