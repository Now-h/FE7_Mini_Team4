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
  const { payCalc, addInfo, addCalcStore, resetPayCalc } = useReservationStore();
  const [isWidth, setIsWidth] = useState(window.innerWidth);
  const ref = useRef();
  const [isToggle, setIsToggle] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [isToast2, setIsToast2] = useState(false);
  const [errrorMessage, setErrrorMessage] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const { id, check_in, check_out, adult_count, child_count } = payCalc;
  const postObject = { room_id: id, check_in, check_out, adult_count, child_count };

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
    } else if (payCalc.adult_count + payCalc.child_count > payCalc.maximum_capacity) {
      setIsPopup(true);
      setErrrorMessage(`해당 객실은 ${payCalc.maximum_capacity}명까지 수용가능한 객실입니다. 인원수를 조절해주세요.`);
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
      if (payCalc.maximum_capacity < payCalc.countMember) {
        // 인원수초과
        setIsToast(true);
      } else {
        setIsToast(false);
      }
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
      const responseOrder = await instance.post(fetchOrders, postObject, {
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
      resetPayCalc();
      setTimeout(() => {
        setIsLoading2(false);
        setIsLoading(false);
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
        await instance.post(fetchOrders, postObject, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
      } catch (error) {
        console.log(error);
      } finally {
        addCalcStore({});
        setIsLoading2(false);
      }
    }
  };

  // const payCalc = useReservationStore((state) => state.payCalc);

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
              룸종류 : <b>{payCalc.type ? payCalc.type : "-"}</b>
            </li>
            <li>
              침대타입 : <b>{payCalc.bed_type ? payCalc.bed_type : "-"}</b>
            </li>
            <li>
              객실뷰 : <b>{payCalc.view_type ? payCalc.view_type : "-"}</b>
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
              <GuestCounter />
            </li>
            <li>
              <strong className="--title">어린이</strong>
              <GuestCounterChild iscount={handleChildren} />
            </li>
            <li className="!grid grid-cols-2">
              <strong className="--title">성인 ⨉ {payCalc.adult_count ? payCalc.adult_count : 0}</strong>
              <span className="--total justify-self-end">₩ {payCalc.adult_pay ? digit3(payCalc.adult_pay) : 0}</span>
              <strong className="--title">어린이 ⨉ {payCalc.child_count ? payCalc.child_count : 0}</strong>
              <span className="--total justify-self-end">₩ {payCalc.child_pay ? digit3(payCalc.child_pay) : 0}</span>
              <strong className="--title">기본숙박료</strong>
              <span className="--total justify-self-end">₩ {digit3(payCalc.standard_price ? payCalc.standard_price : 0)}</span>
            </li>
            <li>
              <strong className="--title !text-lg">총 금액</strong>
              <span className="--total justify-self-end">₩ {digit3(payCalc.total_price)}</span>
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
          인원수가 초과되었습니다. 최대 {payCalc.maximum_capacity}명 수용 가능합니다.
        </Toast>
      )}
      {isToast2 && (
        <Toast onOpen={isToast2} onClose={() => setIsToast2(false)} color={"blue"}>
          해당 숙소는 {payCalc.standard_capacity + 1}인이상 {payCalc.maximum_capacity}이하면 추가금액이 발생합니다.
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
