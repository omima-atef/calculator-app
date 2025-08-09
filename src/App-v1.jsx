// import { useState } from "react";

// export default function App() {
//   const [total, setTotal] = useState("");
//   const [theme, setTheme] = useState("theme1");
//   const excludedValues = ["DEL", "RESET", "=", "/", "+", "-", "x"];
//   const operators = ["x", "/", "+", "-"];

//   function displayNums(value) {
//     if (!excludedValues.includes(value)) {
//       setTotal((e) => e + value);
//     } else if (total.length === 0) {
//       return;
//     } else if (value === "=" && !operators.includes(total[total.length - 1])) {
//       const replaceTotal = `${eval(total.replace(/x/g, "*"))}`;
//       setTotal(() => replaceTotal);
//     } else if (value === "RESET") {
//       setTotal("");
//     } else if (value === "DEL") {
//       setTotal((e) => e.slice(0, e.length - 1));
//     } else if (operators.includes(value)) {
//       if (operators.includes(total[total.length - 1])) {
//         setTotal((e) => e.slice(0, e.length - 1));
//       }
//       setTotal((e) => e + value);
//     }
//   }
//   return (
//     <div className={`app ${theme}`}>
//       <main>
//         <Nav setTheme={setTheme} />
//         <Display total={total} />
//         <DisplayNum displayNums={displayNums} />
//       </main>
//     </div>
//   );
// }

// function Nav({ setTheme }) {
//   return (
//     <div className="nav">
//       <h1>calc</h1>
//       <div>
//         <span>THEME</span>
//         <div>
//           <div className="numTheme">
//             <span>1</span>
//             <span>2</span>
//             <span>3</span>
//           </div>
//           <ul>
//             <li onClick={() => setTheme("theme1")}></li>
//             <li onClick={() => setTheme("theme2")}></li>
//             <li onClick={() => setTheme("theme3")}></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Display({ total }) {
//   function handleChange(value) {
//     console.log(value);
//   }
//   return (
//     <div>
//       <input
//         type="text"
//         name="value"
//         id=""
//         dir="rtl"
//         placeholder="0"
//         value={total}
//         onChange={(e) => handleChange(e.target.value)}
//       />
//     </div>
//   );
// }

// function DisplayNum({ displayNums }) {
//   const keys = [
//     ["7", "8", "9", "DEL"],
//     ["4", "5", "6", "+"],
//     ["1", "2", "3", "-"],
//     [".", "0", "/", "x"],
//     ["RESET", "="],
//   ];
//   return (
//     <div className="keysCalc">
//       {keys.map((e, i) => (
//         <LineKeys setKeys={e} key={i} displayNums={displayNums} />
//       ))}
//     </div>
//   );
// }

// function LineKeys({ setKeys, displayNums }) {
//   return (
//     <ul>
//       {setKeys.map((e, i) => (
//         <InputKey value={e} key={i} displayNums={displayNums} />
//       ))}
//     </ul>
//   );
// }

// function InputKey({ value, displayNums }) {
//   return (
//     <li
//       className={`${value.length > 1 ? "special" : ""}${
//         value === "=" ? "equal" : ""
//       }`}
//       onClick={() => displayNums(value)}
//     >
//       <input type="button" value={value} />
//     </li>
//   );
// }
