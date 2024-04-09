import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import request from "../../api/request";
import { digit3 } from "../../store/digit3";
import { useReservationStore } from "../../store/reservationStore";
import { useReserveRoomStore } from "../../store/reserveRoomStore";
import Dialog from "../Dialog";
import GuestCounter from "../GuestCounter";
import Input from "../Input";
import Loading from "../Loading";
import Loading2 from "../Loading2";
import Toast from "../Toast";
import Box from "../Box";
import "../../styles/pages/reservation.css";
import GuestCounterChild from "../GuestCounterChild";

const ReservationFirst = () => {
  const token = localStorage.getItem("token");
  const { fetchOrders } = request;
  const navigate = useNavigate();
  const { payCalc, addInfo, addCalcStore } = useReservationStore();
  const [isWidth, setIsWidth] = useState(window.innerWidth);
  const ref = useRef();
  const [isToggle, setIsToggle] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [isToast2, setIsToast2] = useState(false);
  const [errrorMessage, setErrrorMessage] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const { reservedRoom, addRoom } = useReserveRoomStore();

  const { adult_fare, child_fare, bed_type, hotel_id, id, maximum_capacity, standard_capacity, standard_price, type, view_type } = reservedRoom;

  // addCalcStore({ ...payCalc, standard_price: standard_price });
  console.log(`
    countMember : ${payCalc.countMember}
    standard_price : ${payCalc.standard_price}
    adult_fare : ${payCalc.adult_fare}
    child_fare : ${payCalc.child_fare}
    days : ${payCalc.days}
  `);

  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleStart = (check_in) => {
    addCalcStore({ ...payCalc, check_in: check_in });
  };
  const handleEnd = (check_out) => {
    addCalcStore({ ...payCalc, check_out: check_out });
  };
  const handleAdult = (adult_count) => {
    addCalcStore({ ...payCalc, adult_count: adult_count });
  };
  const handleChildren = (child_count) => {
    addCalcStore({ ...payCalc, child_count: child_count });
  };

  const handleToggle = (e) => {
    e.preventDefault();

    setIsToggle(!isToggle);
    if (isToggle) {
      ref.current.style.height = "29rem";
      setIsToggle(false);
    } else {
      ref.current.style.height = "0";
      setIsToggle(true);
    }
  };

  const CheckEmpty = () => {
    let isValid = true;
    if (!payCalc.check_in) {
      setIsPopup(true);
      setErrrorMessage("체크인 날짜를 선택해주세요.");
      isValid = false;
    } else if (!payCalc.check_out) {
      setIsPopup(true);
      setErrrorMessage("체크아웃 날짜를 선택해주세요.");
      isValid = false;
    } else if (payCalc.adult_count + payCalc.child_count > maximum_capacity) {
      setIsPopup(true);
      setErrrorMessage(`해당 객실은 ${maximum_capacity}명까지 수용가능한 객실입니다. 인원수를 조절해주세요.`);
      isValid = false;
    } else if (payCalc.adult_count + payCalc.child_count === 0) {
      setIsPopup(true);
      setErrrorMessage(`최소 1명이상 예약해 주세요.`);
      isValid = false;
    }
    return isValid;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWidth(window.innerWidth);
      if (ref.current && window.innerWidth > 1024) {
        ref.current.removeAttribute("style");
        setIsToggle(true);
      }
    };

    const handleCalculate = () => {
      const checkIn = new Date(payCalc.check_in);
      const checkOut = new Date(payCalc.check_out);
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 일수
      const basePrice = days * (standard_price ? parseInt(standard_price) : 0); // 1박가격 x 숙박일

      // 인원수초과
      if (maximum_capacity < payCalc.countMember) {
        setIsToast(true);

        // 추가금액범위
      } else if (payCalc.countMember > standard_capacity) {
        let adult = (parseInt(payCalc.adult_count) - standard_capacity) * payCalc.adult_pay * parseInt(days); // 어른수 x 어른가격 * 숙박일
        // let child = parseInt(isPayInfo.child_count) * isPayInfo.child_pay * parseInt(days); // 아이수 x 아이가격 * 숙박일
        addCalcStore({ ...payCalc, adult_fare: adult });
      } else if (payCalc.countMember <= standard_capacity) {
        setIsToast(false);
        // setIsPayInfo((prev) => ({ ...prev, adult_fare: 0, child_fare: 0, total_price: basePrice }));
        // setIsToast2(true);
        // setIsToast2(false);
      }
      const totalPay = payCalc.adult_fare + payCalc.child_fare + basePrice;
      addCalcStore({ ...payCalc, total_price: totalPay });
      // setIsPayInfo((prev) => ({ ...prev, total_price: totalPay }));
    };

    window.addEventListener("resize", handleResize);
    handleCalculate();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 결제다음단계 넘기기
  const handleReservation = async (e) => {
    e.preventDefault();
    const isValidCheck = CheckEmpty();

    // 로그인체크
    if (!isLoggedIn()) {
      setIsPopup(true);
      setErrrorMessage(`예약하기 위해선 로그인이 필요합니다.`);
      return;
    } else if (!isValidCheck) return;
    let orderId = "";
    try {
      setIsLoading2(true);
      const responseOrder = await instance.post(fetchOrders, payCalc, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(true);
      orderId = responseOrder.data.result.id;
      addInfo(responseOrder); // 예약결과전역상태로 넘기기
    } catch (error) {
      console.log(`submitReservation :`, error);
    } finally {
      setTimeout(() => {
        setIsLoading2(false);
        setIsLoading(false);
        addRoom({});
        navigate(`/reservation/?${orderId}`);
      }, 1500);
    }
  };

  // 장바구니 넘기기
  const handleCart = async (e) => {
    e.preventDefault();
    const isValidCheck = CheckEmpty();
    if (isValidCheck) {
      try {
        setIsLoading2(true);
        await instance.post(fetchOrders, payCalc, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading2(false);
      }
    }
  };

  // const payCalc = useReservationStore((state) => state.payCalc);

  // // total_price를 제외한 payCalc를 가져오는 selector 함수
  // const { total_price, ...restPayCalc } = useReservationStore((state) => state.payCalc);

  // form핸들링
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="relative">
        <Box className={"white !py-3 !px-4 mb-3"}>
          <ul className="flex gap-6 text-base">
            <li>
              룸종류 : <b>{type ? type : "-"}</b>
            </li>
            <li>
              침대타입 : <b>{bed_type ? bed_type : "-"}</b>
            </li>
            <li>
              객실뷰 : <b>{view_type ? view_type : "-"}</b>
            </li>
          </ul>
        </Box>
        <form className="reservation-write" onSubmit={handleSubmit}>
          <ul ref={ref} className="mobile:overflow-hidden mobile:h-0 tablet:overflow-visible tablet:h-[auto] transition-all duration-300">
            <li>
              <label htmlFor="reser1" className="--title">
                체크인
              </label>
              <Input type="date" name="start" min={payCalc.check_in} value={payCalc.check_in} onChange={handleStart} />
            </li>
            <li>
              <label htmlFor="reser2" className="--title">
                체크아웃
              </label>
              <Input type="date" name="end" min={payCalc.check_in ? payCalc.check_in : payCalc.check_out} value={payCalc.check_out} onChange={handleEnd} />
            </li>
            <li>
              <strong className="--title">성인(청소년)</strong>
              <GuestCounter iscount={handleAdult} max={maximum_capacity} defaultValue={0} />
            </li>
            <li>
              <strong className="--title">어린이</strong>
              <GuestCounterChild iscount={handleChildren} max={maximum_capacity} />
            </li>
            <li className="!grid grid-cols-2">
              <strong className="--title">성인 ⨉ {payCalc.adult_count ? payCalc.adult_count : 0}</strong>
              <span className="--total justify-self-end">₩ {payCalc.adult_fare ? digit3(payCalc.adult_fare) : 0}</span>
              <strong className="--title">어린이 ⨉ {payCalc.child_count ? payCalc.child_count : 0}</strong>
              <span className="--total justify-self-end">₩ {payCalc.child_fare ? digit3(payCalc.child_fare) : 0}</span>
              {/* <strong className="--title">기본숙박료</strong>
              <span className="--total justify-self-end">₩ {price1 ? digit3(price1) : 0}</span> */}
            </li>
            <li>
              <strong className="--title !text-lg">총 금액</strong>
              <span className="--total justify-self-end">₩ {payCalc.total_price ? digit3(payCalc.total_price) : digit3(standard_price)}</span>
            </li>
          </ul>
          <div className="grid grid-cols-[1.7fr_1fr] gap-3">
            {isWidth < 1024 && (
              <button onClick={handleToggle} className="absolute left-2/4 -top-9 z-10 -translate-x-2/4 w-12 h-8 bg-gray-100 rounded-full flex justify-center pt-[0.3rem] text-2xl">
                <MdKeyboardDoubleArrowUp className={`ico-toggle ${!isToggle ? "active" : ""}`} />
              </button>
            )}
            <button className="btn-blue xl2 mobile:h-12 tablet:h-auto mobile:!text-base tablet:!text-xl justify-center" onClick={handleReservation}>
              예약하기
            </button>
            <button className="btn-green-outline xl2 mobile:h-12 tablet:h-auto mobile:!text-base tablet:!text-xl justify-center whitespace-nowrap" onClick={handleCart}>
              장바구니
            </button>
          </div>
        </form>
        {isLoading2 && <Loading2 />}
      </div>
      {isToast && (
        <Toast onOpen={isToast} onClose={() => setIsToast(false)} color={"red"}>
          인원수가 초과되었습니다. 최대 {maximum_capacity}명 수용 가능합니다.
        </Toast>
      )}
      {isToast2 && (
        <Toast onOpen={isToast2} onClose={() => setIsToast2(false)} color={"blue"}>
          해당 숙소는 {standard_capacity + 1}인이상 {maximum_capacity}이하면 추가금액이 발생합니다.
        </Toast>
      )}
      <Dialog open={isPopup} close={() => setIsPopup(false)}>
        <div className="text-center">
          <div className="text-center pb-3">{errrorMessage}</div>
          <button className="btn-blue" onClick={() => setIsPopup(false)}>
            확인
          </button>
        </div>
      </Dialog>
      {isLoading && <Loading />}
    </>
  );
};

export default ReservationFirst;
