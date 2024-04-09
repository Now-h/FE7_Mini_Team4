import React, { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import "../styles/components/guestcounter.css";
import Toast from "./Toast";
import { useReservationStore } from "../store/reservationStore";

const GuestCounterChild = ({ iscount, max, defaultValue, className, allCount }) => {
  const [count, setCount] = useState(defaultValue || 0);
  const [toast, setToast] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { allCountStore } = useReservationStore;

  // console.log(allCount);

  useEffect(() => {
    if (allCount >= max) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [allCount]);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
      iscount(count - 1);
    } else {
      setToast(true);
    }
    // console.log(max, count - 1);
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
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;
    setCount(value);
    iscount(value);
  };
  // if (allCountStore === max) {
  //   setIsDisabled(true);
  // } else if (allCountStore < max) {
  //   setIsDisabled(false);
  // }
  // console.log(allCountStore);
  return (
    <>
      <div className={`guest-counter ${className}`}>
        <button onClick={handleDecrease}>
          <TbMinus />
        </button>
        <input type="number" className="input" value={count} readOnly onChange={handleChange} />
        <button onClick={handleIncrease} disabled={isDisabled}>
          <TbPlus />
        </button>
      </div>
    </>
  );
};

export default GuestCounterChild;
