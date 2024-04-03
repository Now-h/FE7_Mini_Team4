import React from "react";
import RoomPicture from "../Hotel/RoomPicture";
import { Link } from "react-router-dom";
import { digit3 } from "../../store/digit3";

const MypageAllReservationItems = ({ items }) => {
  const { hotel, room, adult_count, child_count, check_in, check_out, total_price, created_at, member } = items;
  const reservationDaty = created_at.split(" ")[0];
  const photo = room.thumbnails[0].img_url;

  // console.log(items);

  return (
    <>
      <tr className="group mobile:!grid-cols-1">
        <td className="mobile:before:content-['예약일'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          2024-03-15
        </td>
        <td className="mobile:before:content-['호텔정보'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          <div className="grid items-center grid-cols-[min-content_1fr] gap-1 text-left">
            <Link to={`/hoteldetail/${hotel.id}`}>
              <RoomPicture image={photo} size={"sm"} />
            </Link>
            <Link to={`/hoteldetail/${hotel.id}`} className=" group-hover:text-blue-700 line-clamp-2">
              {hotel.name}
            </Link>
          </div>
        </td>
        <td className="mobile:before:content-['예약자'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          {member.name}
        </td>
        <td className="mobile:before:content-['룸정보'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          {room.type}
        </td>
        <td className="mobile:before:content-['성인'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          {adult_count}
        </td>
        <td className="mobile:before:content-['어린이'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          {child_count}
        </td>
        <td className="mobile:before:content-['체크인/아웃'] tablet:before:hidden mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          {check_in} ~ {check_out}
        </td>
        <td className="mobile:before:content-['총_금액'] tablet:before:hidden text-right mobile:!grid tablet:!table-cell mobile:grid-cols-[6rem_1fr] mobile:before:font-bold">
          <b>{digit3(total_price)} 원</b>
        </td>
      </tr>
    </>
  );
};

export default MypageAllReservationItems;
