import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  function math(a, b, sign) {
    let result;
    if (sign === "+") {
      result = Number(a)+Number(b);
    } else if (sign === "-") {
      result = Number(a) - Number(b);
    } else if (sign === "X") {
      result = Number(a) * Number(b);
    } else {
      result = Number(a) / Number(b);
    }
    return result.toString();
  }

  const numClickHandler = (e) => {
    e.preventDefault();

    const value = e.target.innerHTML;

    let num = calc.num;
    let res = calc.res;
    let sign = calc.sign;

    if (sign=="") {
      res==0 ? res = value : res = res + value;
    } else {
      num==0 ? num = value : num = num + value;
    }

    if (calc.num.toString().length < 16) {
      setCalc({
        ...calc,
        num,
        res,
        sign
      });
    }
  };

  const decimalClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    let num = calc.num;
    let res = calc.res;
    let sign = calc.sign;

    if (num==0) {
      res = !calc.res.toString().includes(".") ? calc.res + value : calc.res
    } else {
      num = !calc.num.toString().includes(".") ? calc.num + value : calc.num
    }

    setCalc({
      ...calc,
      num,
      res,
      sign
    });

  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    let num = calc.num;
    let res = calc.res;
    let sign = calc.sign;

    if (res!=0 && num!=0 && sign) {
      res = math(res, num, sign);
      sign = value;
      num = 0;
    } else {
      sign = value
    }

    setCalc({
      ...calc,
      num,
      res,
      sign,
    });
  };

  const equalsClickHandler = () => {
    let num = calc.num;
    let res = calc.res;
    let sign = calc.sign;

    if (calc.num === "0" && calc.sign === "/") {
      res = "Can't divide by 0"
      num = 0
      sign = ""
    } else {
      res = math(res, num, sign)
      num = 0
      sign = ""
    }

    setCalc({
      ...calc,
      num,
      res,
      sign,
    });
  };

  const invertClickHandler = () => {
    let num = calc.num;
    let res = calc.res;
    let sign = calc.sign;

    if (num === 0) {
      res = (Number(res) * -1).toString();
    } else {
      num = (Number(num) * -1).toString();
    }

    setCalc({
      ...calc,
      num,
      res,
      sign,
    });
  };

  const percentClickHandler = () => {
    let num = calc.num;
    let res = calc.res;
    let sign = calc.sign;

    if (num === 0) {
      res = (Number(res)/100).toString();
    } else {
      num = ((Number(num)/100) * Number(res)).toString();
    }

    setCalc({
      ...calc,
      num,
      res,
      sign,
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return (
            <Button
              key={i}
              className={btn === "=" ? "equals" : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? decimalClickHandler
                  : numClickHandler
              }
            />
          );
        })}
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
