import { useState, useRef, useEffect } from "react";
import "./styles.css";

const TOTAL_OTP_DIGITS = 5;

export default function App() {
  const [inputArr, setInputArr] = useState(
    new Array(TOTAL_OTP_DIGITS).fill("")
  );
  const inputRef = useRef([]);

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, []);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const nextInputArr = [...inputArr];
    const validValue = value.trim();
    nextInputArr[index] = validValue.slice(-1);
    setInputArr(nextInputArr);

    validValue && inputRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      inputRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="App">
      <h1>Validate OTP</h1>
      {inputArr.map((input, index) => (
        <input
          className="digit-input"
          key={index}
          type="text"
          autoFocus={index === 0}
          ref={(input) => {
            inputRef.current[index] = input;
          }}
          value={inputArr[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
