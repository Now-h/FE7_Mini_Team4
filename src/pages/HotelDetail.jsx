import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import instance from "../api/axios";
import request from "../api/request";
import pic1 from "../assets/img1.webp";
import pic2 from "../assets/img2.webp";
import pic3 from "../assets/img3.webp";
import pic4 from "../assets/img4.jpg";
import Notice from "../components/Board/Notice";
import NoticeWrite from "../components/Board/NoticeWrite";
import Box from "../components/Box";
import Dialog from "../components/Dialog";
import Heading from "../components/Heading";
import RoomListToRead from "../components/Hotel/components/RoomListToRead";
import HotelFavorite from "../components/Hotel/HotelFavorite";
import HotelGallery from "../components/Hotel/HotelGallery";
import HotelLocation from "../components/Hotel/HotelLocation";
import HotelRules from "../components/Hotel/HotelRules";
import ServiceList from "../components/Hotel/ServiceList";
import Loading from "../components/Loading";
import ReservationFirst from "../components/Reservation/ReservationFirst";
import SubVisual from "../components/SubVisual";
import Text from "../components/Text";
import { usehotelListStore } from "../store/hotelListStore";
import { useLoginStore } from "../store/loginStore";
import { useVisualStore } from "../store/visualStore";

const pictures = [{ img_url: pic1 }, { img_url: pic2 }, { img_url: pic3 }, { img_url: pic4 }];

const HotelDetail = () => {
  const { userRole } = useLoginStore();
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { setTitle } = useVisualStore();
  const [isWrite, setIsWrite] = useState(false);
  const [hotelInfo, setHotelInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { totalHotels, deleteHotel } = usehotelListStore();
  const [notices, setNotices] = useState([]);
  const [isFav, setIsFav] = useState(hotelInfo.favorite);
  const { fetchHotels } = request;
  const [isPopup, setIsPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const thisHotel = totalHotels.find((hotel) => hotel.id === 4595);

  useEffect(() => {
    instance.get(`${fetchHotels}/${hotelId}`).then((response) => {
      setHotelInfo(response.data.result);
      setNotices(response.data.result.notices);
    });
  }, [hotelId]);

  useEffect(() => {
    if (hotelInfo) {
      setTitle(hotelInfo.name, SubVisual);
    }
  }, [hotelInfo, setTitle]);

  const token = localStorage.getItem("token");

  const onDelete = async () => {
    // setIsLoading(true);
    try {
      const response = await instance.delete(
        `${fetchHotels}/${hotelId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    setIsPopup(true);
    setPopupMessage("해당 호텔을 삭제하였습니다.");
    deleteHotel(hotelId);
  };

  const onDeleteConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
    setIsPopup(false);
  };

  const toEdit = () => {
    navigate(`/hoteledit/${hotelId}`);
  };

  const handleAddNotice = (newNotice) => {
    const updatedNotices = [...notices, newNotice];
    setNotices(updatedNotices);
    setIsWrite(false);
  };

  const handleWriteNotice = () => {
    setIsWrite(true);
  };
  const favData = {
    id: hotelId,
  };
  const handleFavorite = async () => {
    setIsFav(!isFav);
    let myfav = "";
    try {
      const isfavs = await instance.post(`${fetchHotels}/${hotelId}/favorite`, favData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      myfav = isfavs;
    } catch (error) {
      console.log(error);
    } finally {
      // console.log(myfav);
    }
  };

  const handleWrite = (blooan) => {
    setIsWrite(blooan);
  };

  return (
    <div className="main mb-24">
      <div className="container">
        <div className="hotel-detail mt-10">
          <div className="hotel-detail__header">
            <div>
              <HotelLocation className="xl" location={hotelInfo.nation} />
            </div>
            <div>
              <HotelFavorite checked={isFav} onClick={handleFavorite} />
              <button className="btn-blue -mr-2" onClick={toEdit}>
                수정
              </button>
              <button onClick={onDelete} className="btn-red">
                삭제
              </button>
            </div>
          </div>
        </div>
        <HotelGallery pictures={hotelInfo.thumbnails?.length < 4 ? pictures : hotelInfo.thumbnails} className="mt-10" />
        <div className="mobile:block tablet:flex relative gap-8 pt-8">
          <div className="min-h-lvh flex-1 flex gap-8  flex-col">
            <Box>
              <Heading tag="h3" text="호텔 안내" className="base" />
              <Text className="mt-5" type={1}>
                {hotelInfo.description}
              </Text>
            </Box>
            <Box>
              <div className="flex items-center justify-between">
                <Heading tag="h3" text="호텔 공지" className="base" />
                {userRole === "MASTER" && (
                  <button className="btn-blue sm" onClick={handleWriteNotice}>
                    공지 올리기
                  </button>
                )}
              </div>
              {/* {isWrite && <NoticeWrite myId={hotelId} write={handleWrite} className="mt-5" />} */}
              {isWrite && <NoticeWrite myId={hotelId} className="mt-5" />}
              {!isWrite && <Notice className="mt-5" myId={hotelId} notices={notices} />}
            </Box>
            <Box>
              <Heading tag="h3" text="편의시설 및 서비스" className="base" />
              <ServiceList options={hotelInfo.basic_options} className="mt-5" />
            </Box>
            <Box>
              <Heading tag="h3" text="호텔 객실 규칙" className="base" />
              <HotelRules thisHotel={hotelInfo} className="mt-5" />
            </Box>
            <Box>
              <Heading tag="h3" text="예약 가능한 객실" className="base" />
              <RoomListToRead roomLists={hotelInfo?.rooms} className="mt-5" />
            </Box>
          </div>
          <div className="mobile:fixed mobile:top-[inherit] mobile:bottom-0 z-50 mobile:left-0 tablet:left-[inherit] tablet:bottom-[inherit] tablet:sticky tablet:top-28 self-start mobile:w-full tablet:w-[25rem] desktop:w-[30rem] mobile:mt-0 tablet:mt-0">
            <Box className={"mobile:!rounded-[.75rem_.75rem_0_0] tablet:!rounded-xl mobile:!p-3 tablet:!p-5"}>
              <ReservationFirst />
            </Box>
          </div>
        </div>
      </div>
      <Dialog open={isPopup} close={() => setIsPopup(false)}>
        <div className="text-center">
          <div className="text-center pb-3">{popupMessage}</div>
          <button className="btn-blue" onClick={onDeleteConfirm}>
            확인
          </button>
        </div>
      </Dialog>
      {isLoading && <Loading />}
    </div>
  );
};

export default HotelDetail;
