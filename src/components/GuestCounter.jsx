import React, { useEffect, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { TbMinus } from "react-icons/tb";
import { useReservationStore } from "../store/reservationStore";
import "../styles/components/guestcounter.css";

const GuestCounter = ({ className }) => {
  const { payCalc, addCalcStore } = useReservationStore();
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
      addCalcStore({ ...payCalc, adult_count: count - 1 });
    }
    if (payCalc.maximum_capacity > payCalc.countMember || 0 <= payCalc.countMember) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };
  const handleIncrease = () => {
    setCount(count + 1);

    addCalcStore({ ...payCalc, adult_count: count + 1 });
    if (payCalc.maximum_capacity === payCalc.countMember) {
      setIsDisabled(true);
    } else if (payCalc.maximum_capacity > payCalc.countMember) {
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
        <input type="number" min={1} className="input" value={count} readOnly onChange={handleChange} />
        <button onClick={handleIncrease} disabled={isDisabled}>
          <TbPlus />
        </button>
      </div>
    </>
  );
};

export default GuestCounter;
