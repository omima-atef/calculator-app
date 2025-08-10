import { useState } from "react";

export default function App() {
  const [total, setTotal] = useState("");
  const [theme, setTheme] = useState("theme1");

  const excludedValues = ["DEL", "RESET", "="];
  const operators = ["x", "/", "+", "-"];

  function displayNums(value) {
    if (value === "RESET") {
      setTotal("");
      return;
    }

    if (value === "DEL") {
      setTotal((e) => e.slice(0, -1));
      return;
    }

    if (value === "=") {
      if (total.length === 0) return;
      if (operators.includes(total.slice(-1))) return;
      try {
        const expression = total.replace(/x/g, "*");
        const result = eval(expression);
        if (result === Infinity) {
          throw new Error("Result is Infinity");
        }
        setTotal(result.toString());
      } catch {
        setTotal("");
        alert("Error");
      }
      return;
    }

    if (value === ".") {
      const lastOperatorIndex = Math.max(
        total.lastIndexOf("+"),
        total.lastIndexOf("-"),
        total.lastIndexOf("x"),
        total.lastIndexOf("/")
      );
      const currentNumber = total.slice(lastOperatorIndex + 1);
      if (currentNumber.includes(".")) return;
      setTotal((e) => e + value);
      return;
    }
    if (operators.includes(value)) {
      if (total.length === 0) return;
      if (operators.includes(total.slice(-1))) {
        setTotal((e) => e.slice(0, -1) + value);
      } else {
        setTotal((e) => e + value);
      }
      return;
    }
    if (!excludedValues.includes(value)) {
      setTotal((e) => e + value);
    }
  }

  return (
    <div className={`app ${theme}`}>
      <main>
        <Nav setTheme={setTheme} />
        <Display total={total} />
        <DisplayNum displayNums={displayNums} />
      </main>
    </div>
  );
}

function Nav({ setTheme }) {
  return (
    <div className="nav">
      <h1>calc</h1>
      <div>
        <span>THEME</span>
        <div>
          <div className="numTheme">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <ul>
            <li onClick={() => setTheme("theme1")} aria-label="Theme 1"></li>
            <li onClick={() => setTheme("theme2")} aria-label="Theme 2"></li>
            <li onClick={() => setTheme("theme3")} aria-label="Theme 3"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Display({ total }) {
  return (
    <div>
      <input
        type="text"
        name="value"
        dir="rtl"
        placeholder="0"
        value={total}
        readOnly
        aria-label="Display"
      />
    </div>
  );
}

function DisplayNum({ displayNums }) {
  const keys = [
    ["7", "8", "9", "DEL"],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "-"],
    [".", "0", "/", "x"],
    ["RESET", "="],
  ];
  return (
    <div className="keysCalc">
      {keys.map((line, index) => (
        <LineKeys setKeys={line} key={index} displayNums={displayNums} />
      ))}
    </div>
  );
}

function LineKeys({ setKeys, displayNums }) {
  return (
    <ul>
      {setKeys.map((value, index) => (
        <InputKey value={value} key={index} displayNums={displayNums} />
      ))}
    </ul>
  );
}

function InputKey({ value, displayNums }) {
  return (
    <li
      className={`${value.length > 1 ? "special" : ""} ${
        value === "=" ? "equal" : ""
      }`}
      onClick={() => displayNums(value)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          displayNums(value);
        }
      }}
      role="button"
      aria-pressed="false"
      aria-label={`button ${value}`}
    >
      <input type="button" value={value} readOnly />
    </li>
  );
}
