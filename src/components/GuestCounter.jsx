import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import "../styles/components/guestcounter.css";
import Toast from "./Toast";

const GuestCounter = ({ iscount, defaultValue, kids, className }) => {
  const [count, setCount] = useState(defaultValue || 0);
  const [toast, setToast] = useState(false);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
      iscount(count - 1);
    } else {
      setToast(true);
    }
  };
  const handleIncrease = () => {
    setCount(count + 1);
    iscount(count + 1);
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setCount(value);
    iscount(value);
  };
  return (
    <>
      <div className={`guest-counter ${className}`}>
        <button onClick={handleDecrease}>
          <TbMinus />
        </button>
        <input
          type="number"
          min={kids ? "0" : "1"}
          max="99"
          className="input"
          value={count}
          readOnly
          onChange={handleChange}
        />
        <button onClick={handleIncrease}>
          <TbPlus />
        </button>
      </div>
      {!kids && (
        <Toast onOpen={toast} onClose={() => setToast(false)} color={"red"}>
          최소 1명이상 선택해야 합니다.
        </Toast>
      )}
    </>
  );
};

export default GuestCounter;
