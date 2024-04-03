import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import MypageAllReservationItems from "./MypageAllReservationItems";
import { useReservationStore } from "../../store/reservationStore";
import request from "../../api/request";
import instance from "../../api/axios";

const { fetchOrdersList } = request; // 필요한 요청 URL을 추출

const MypageAllReservation = () => {
  const { totalInfos } = useReservationStore();
  const token = localStorage.getItem("token");
  const [isMyOrders, setIsMyOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseOrder = await instance.get(`${fetchOrdersList}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsMyOrders(responseOrder.data.result.content);
      // console.log(responseOrder);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-xl p-10">
        <Heading tag={"h4"} className={"sm"} text={"회원 예약 신청내역 확인"} />
        <table className="mypage-cart__table mt-5">
          <colgroup>
            <col style={{ width: "10rem" }} />
            <col style={{ width: "" }} />
            <col style={{ width: "7rem" }} />
            <col style={{ width: "5rem" }} />
            <col style={{ width: "7rem" }} />
            <col style={{ width: "7rem" }} />
            <col style={{ width: "15rem" }} />
            <col style={{ width: "8rem" }} />
          </colgroup>
          <thead>
            <tr>
              <th>예약일</th>
              <th>호텔</th>
              <th>예약자</th>
              <th>룸</th>
              <th>성인</th>
              <th>어린이</th>
              <th>체크인 / 아웃</th>
              <th>총 금액</th>
            </tr>
          </thead>
          <tbody>
            {isMyOrders.length > 0 ? (
              isMyOrders.map((items, index) => <MypageAllReservationItems key={index} items={items} />)
            ) : (
              <tr>
                <td colSpan={8} className="!py-10">
                  예약된 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MypageAllReservation;
