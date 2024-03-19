import React from "react";
import RoomPicture from "./RoomPicture";
import HotelTitle from "./HotelTitle";
import HotelPrice from "./HotelPrice";
import RoomOptions from "./RoomOptions";
import room from "../../assets/hotelroom1.jpeg";
import room2 from "../../assets/hotelroom2.jpeg";

const RoomListItems = ({ edit, ...props }) => {
  return (
    <>
      <li {...props}>
        <div>
          <RoomPicture image={room} />
          <HotelTitle title={"스탠다드 룸"} />
          <HotelPrice price={"50,000"} />
          <RoomOptions />
          {!edit ? (
            <button className="btn-blue-outline">예약하기</button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-blue-outline">수정하기</button>
              <button className="btn-red-outline">삭제하기</button>
            </div>
          )}
        </div>
      </li>
      <li {...props}>
        <div>
          <RoomPicture image={room2} />
          <HotelTitle title={"디럭스 룸"} />
          <HotelPrice price={"50,000"} />
          <RoomOptions />
          {!edit ? (
            <button className="btn-blue-outline">예약하기</button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-blue-outline">수정하기</button>
              <button className="btn-red-outline">삭제하기</button>
            </div>
          )}
        </div>
      </li>
      <li {...props}>
        <div>
          <RoomPicture image={room} />
          <HotelTitle title={"트윈 룸"} />
          <HotelPrice price={"50,000"} />
          <RoomOptions />
          {!edit ? (
            <button className="btn-blue-outline">예약하기</button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-blue-outline">수정하기</button>
              <button className="btn-red-outline">삭제하기</button>
            </div>
          )}
        </div>
      </li>
      <li {...props}>
        <div>
          <RoomPicture image={room2} />
          <HotelTitle title={"스위트 룸"} />
          <HotelPrice price={"50,000"} />
          <RoomOptions />
          {!edit ? (
            <button className="btn-blue-outline">예약하기</button>
          ) : (
            <div className="flex gap-2">
              <button className="btn-blue-outline">수정하기</button>
              <button className="btn-red-outline">삭제하기</button>
            </div>
          )}
        </div>
      </li>
    </>
  );
};

export default RoomListItems;
