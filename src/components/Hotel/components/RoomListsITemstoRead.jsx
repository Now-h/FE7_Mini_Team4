import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import room from "../../../assets/hotelroom1.jpeg";
import { digit3 } from "../../../store/digit3";
import { usehotelListStore } from "../../../store/hotelListStore";
import { useReserveRoomStore } from "../../../store/reserveRoomStore";
import { useRoomStore } from "../../../store/roomStore";
import HotelPrice from "../HotelPrice";
import HotelTitle from "../HotelTitle";
import RoomOptions from "../RoomOptions";
import RoomPicture from "../RoomPicture";
import Toast from "../../Toast";
import request from "../../../api/request";
import instance from "../../../api/axios";

const RoomListItemsToRead = ({ roomLists, edit, ...props }) => {
  const show = { able: "disabled" };
  const { fetchHotels } = request;
  const { totalHotels } = usehotelListStore();
  const { addRoom, reservedRoom } = useReserveRoomStore();
  let { hotelId } = useParams();
  const { rooms, deleteRoom } = useRoomStore();
  const thisHotel = totalHotels.find((hotel) => hotel.id === Number(hotelId));
  const [roomsInfo, setRoomsInfo] = useState({});
  const [toast, setToast] = useState(false);
  const [toastInfo, setToastInfo] = useState("");
  const onDelete = (roomId) => {
    deleteRoom(roomId);
  };

  useEffect(() => {
    instance.get(`${fetchHotels}/${hotelId}`).then((response) => {
      setRoomsInfo(response.data.result.rooms);
    });
  }, []);

  const clickToReserve = (id, type) => {
    const clickedItem = roomsInfo?.find((it) => it.id === id);
    setToast(!toast);
    addRoom(clickedItem);
    setToastInfo(type);
  };

  return (
    <>
      {roomLists?.map((it) => (
        <li className={it.active_status === "INACTIVE" ? "disabled" : ""} {...props} key={it.id}>
          <div>
            <RoomPicture
              // image={
              //   roomLists.thumbnails > 0 ? roomLists.thumbnails?.img_url : room2
              // }
              image={it.thumbnails.length > 0 ? it.thumbnails[0].img_url : room}
            />
            <HotelTitle title={it.type} />
            <HotelPrice price={digit3(it.standard_price)} />
            <RoomOptions bedtype={it.bed_type} capacity={it.standard_capacity} maximum={it.maximum_capacity} view={it.view_type} adult_fare={it.adult_fare} child_fare={it.child_fare} />
            {!edit ? (
              <div className="flex gap-2">
                <button onClick={() => clickToReserve(it.id, it.type)} className="btn-blue-outline mobile:flex-1 tablet:flex-none justify-center">
                  {it.active_status === "INACTIVE" ? "Sold Out" : "예약하기"}
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button className="btn-blue-outline">수정하기</button>
                <button
                  className="btn-red-outline"
                  onClick={() => {
                    onDelete(it.roomId);
                  }}
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
      <Toast color={"green"} onOpen={toast} onClose={() => setToast(false)}>
        {toastInfo}의 객실을 예약합니다.
      </Toast>
    </>
  );
};

export default RoomListItemsToRead;
