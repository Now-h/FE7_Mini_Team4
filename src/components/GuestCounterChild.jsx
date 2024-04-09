import React, { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import "../styles/components/guestcounter.css";
import { useReservationStore } from "../store/reservationStore";

const GuestCounterChild = ({ className }) => {
  const { payCalc, addCalcStore } = useReservationStore();
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (payCalc.adult_count >= payCalc.maximum_capacity) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [payCalc.adult_count]);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
      addCalcStore({ ...payCalc, child_count: count - 1 });
    }
    if (payCalc.maximum_capacity > payCalc.countMember) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleIncrease = () => {
    setCount(count + 1);
    addCalcStore({ ...payCalc, child_count: count + 1 });

    if (payCalc.maximum_capacity === payCalc.countMember) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };
  const handleChange = (e) => {
    let value = e.target.value;
    setCount(value);
  };

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
