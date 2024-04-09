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
    adult_pay: 0, //최종성인요금
    child_pay: 0, //최종어린이요금
    check_in: Today(),
    check_out: Today(1),
    room_id: "",
    total_price: 0, // 총금액
    countMember: 0,
    days: "",
  },
  noticeId: "",
  allCountStore: 0,

  // 1단계 정보
  addCalcStore: (value) =>
    set((state) => {
      const allCount = value.adult_count + value.child_count; // 총인원수
      const checkIn = new Date(value.check_in); //체크인
      const checkOut = new Date(value.check_out); //체크아웃
      const days = (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 숙박일
      const dayPrice = days * (value.standard_price ? value.standard_price : 0); // 1박가격 x 숙박일

      let adultPay = "";
      let childPay = "";

      // 기본인원보다 초과했을때
      if (allCount > value.standard_capacity) {
        const adult = (value.adult_count - value.standard_capacity) * value.adult_fare * value.days; // 어른수 x 어른가격 * 숙박일
        const child = value.child_count * value.child_fare * value.days; // 아이수 x 아이가격 * 숙박일
        adultPay = adult;
        childPay = child;
      }
      const totalPay = adultPay + childPay + dayPrice; //전체금액

      return {
        payCalc: {
          ...state.payCalc,
          ...value,
          countMember: allCount,
          days: days,
          adult_pay: adultPay,
          child_pay: childPay,
          total_price: totalPay ? totalPay : 0,
        },
      };
    }),
  // 2단계 결제정보
  addInfo: (paymentState) =>
    set((state) => ({
      paymentInfos: [paymentState],
    })),

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

  // payCalc 초기화 함수
  resetPayCalc: () =>
    set((state) => ({
      payCalc: {
        adult_count: 0,
        child_count: 0,
        adult_pay: 0,
        child_pay: 0,
        check_in: Today(),
        check_out: Today(1),
        room_id: "",
        total_price: 0,
        countMember: 0,
        days: "",
      },
    })),
});

reservationStore = devtools(reservationStore);
// reservationStore = persist(reservationStore, { name: "reservation" });

export const useReservationStore = create(reservationStore);
