import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// 달력 현재날짜 고정
const Today = (nextDay = 0) => {
  const year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  let day = new Date().getDate() + nextDay;

  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;

  return `${year}-${month}-${day}`;
};

let reservationStore = (set) => ({
  paymentInfos: {},
  payCalc: {
    adult_count: 0, //성인
    child_count: 0, //어린이
    adult_pay: 0, //성인요금
    child_pay: 0, //어린이요금
    adult_fare: 0,
    child_fare: 0,
    check_in: Today(),
    check_out: Today(1),
    room_id: "",
    total_price: 0, // 총금액
    countMember: 0,
    standard_price: 0,
    days: "",
  },
  noticeId: "",
  allCountStore: 0,

  // 결제정보
  addInfo: (paymentState) =>
    set((state) => ({
      paymentInfos: [paymentState],
    })),

  // 1단계 정보
  addCalcStore: (value) =>
    set((state) => {
      const allCount = value.adult_count + value.child_count;
      const adultTotalPay = value.adult_count * value.adult_fare;
      const checkIn = new Date(value.check_in);
      const checkOut = new Date(value.check_out);
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 일수

      return {
        payCalc: { ...state.payCalc, ...value, countMember: allCount, days: days },
      };
    }),

  // 호텔공지사항 아이디
  addNotice: (id) =>
    set((state) => ({
      noticeId: id,
    })),

  // 예약총인원수
  addCount: (num) =>
    set((state) => ({
      allCountStore: num,
    })),
});

reservationStore = devtools(reservationStore);
// reservationStore = persist(reservationStore, { name: "reservation" });

export const useReservationStore = create(reservationStore);
