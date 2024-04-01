import React, { useEffect, useState } from "react";
import "../../styles/components/cart.css";
import CartItems from "./CartItems";
import Badge from "../Badge";
import { useReservationStore } from "../../store/reservationStore";
import { digit3 } from "../../store/digit3";
import request from "../../api/request";
import instance from "../../api/axios";

const Cart = ({ mypage, close }) => {
  const token = localStorage.getItem("token");
  const { paymentInfos } = useReservationStore();
  const [isCartItmes, setIsCartItmes] = useState([]);
  const { fetchOrdersList, fetchOrders } = request; // 필요한 요청 URL을 추출
  console.log(paymentInfos);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCart = () => {
    close();
  };

  // const cartTotalPrice = digit3(cartInfos.reduce((acc, curr) => acc + curr.total_price, 0));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCart = await instance.get(`${fetchOrders}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const hotelData = responseCart;
        console.log(responseCart);
        // setIsCartItmes(responseCart);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-[22rem]">
      {!mypage && (
        <header className="border border-b-gray-200 border-solid leading-[4] px-5">
          <h2 className="font-bold flex gap-1 items-center">
            장바구니
            <Badge color={"green"}>{/* 총 <b>{cartInfos.length}개</b>의 숙소가 등록되었습니다. */}</Badge>
          </h2>
        </header>
      )}
      <form onSubmit={handleSubmit}>
        <ul className="cart__list">
          {/* {cartInfos.map((items, index) => (
            <CartItems close={handleCart} key={index} items={items} />
          ))} */}
        </ul>
        <div className="cart-price">
          <ul className="grid gap-2">
            <li>
              <span>보유 금액</span>
              <span>
                1,000,000 <i className="text-sm">원</i>
              </span>
            </li>
            <li className="font-bold">
              <span>총 결재 금액</span>
              <span className="text-lg">{/* {cartTotalPrice} <i className="text-sm">원</i> */}</span>
            </li>
          </ul>
          <div className="grid pt-5">
            <button onClick={handleCart} className="btn-gray !font-normal">
              계속 쇼핑하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cart;
