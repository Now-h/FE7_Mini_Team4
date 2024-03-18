import React, { useEffect } from "react";
import { useVisualStore } from "../../store/visualStore";
import ReservationHotelInfo from "./ReservationHotelInfo";
import ReservationPersonInfo from "./ReservationPersonInfo";
import "../../styles/pages/reservation.css";

const ReservationSecond = () => {
  const { setTitle } = useVisualStore();

  useEffect(() => {
    setTitle("Reservation Hotels");
  }, [setTitle]);
  return (
    <div className="main pb-20">
      <div className="container">
        <div className="reservation mt-10">
          <ReservationHotelInfo />
          <ReservationPersonInfo />
        </div>
      </div>
    </div>
  );
};

export default ReservationSecond;
