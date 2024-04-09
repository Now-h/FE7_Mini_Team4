import React, { useState } from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import "../styles/components/guestcounter.css";
import Toast from "./Toast";
import { useReservationStore } from "../store/reservationStore";

const GuestCounter = ({ iscount, max, defaultValue, kids, className }) => {
  const { payCalc } = useReservationStore();
  const [count, setCount] = useState(defaultValue);
  const [toast, setToast] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // console.log(payCalc.countMember);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
      iscount(count - 1);
    } else {
      setToast(true);
    }
    if (max > count - 1) {
      setIsDisabled(false);
    }
  };
  const handleIncrease = () => {
    setCount(count + 1);
    iscount(count + 1);
    if (max < count + 1) {
      setIsDisabled(true);
      setCount(count);
      // addCount(max);
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;
    setCount(value);
    iscount(value);
  };

  return (
    <>
      <div className={`guest-counter ${className}`}>
        <button onClick={handleDecrease}>
          <TbMinus />
        </button>
        <input type="number" min={1} className="input" value={count} readOnly onChange={handleChange} />
        <button onClick={handleIncrease} disabled={isDisabled}>
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
