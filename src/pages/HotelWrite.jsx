import React, { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import subvisual from "../assets/subvisual3.jpg";
import Badge from "../components/Badge";
import Box from "../components/Box";
import Checkbox from "../components/Checkbox";
import Dialog from "../components/Dialog";
import Heading from "../components/Heading";
import RoomWrite from "../components/Hotel/RoomWrite";
import Input from "../components/Input";
import Loading from "../components/Loading";
import Noimage from "../components/Noimage";
import Radio from "../components/Radio";
import Select from "../components/Select";
import { usehotelListStore } from "../store/hotelListStore";
import { useRoomStore } from "../store/roomStore";
import { useVisualStore } from "../store/visualStore";

const where = [
  {
    value: "select2",
    text: "THAILAND",
  },
  {
    value: "select3",
    text: "VIETNAM",
  },
  {
    value: "select4",
    text: "PHILIPPINES",
  },
  {
    value: "select5",
    text: "MALAYSIA",
  },
  {
    value: "select6",
    text: "TAIWAN",
  },
];

const checkOption = [
  { value: "select3", text: "01:00" },
  { value: "select4", text: "02:00" },
  { value: "select5", text: "03:00" },
  { value: "select6", text: "04:00" },
  { value: "select7", text: "05:00" },
  { value: "select8", text: "06:00" },
  { value: "select9", text: "07:00" },
  { value: "select10", text: "08:00" },
  { value: "select11", text: "09:00" },
  { value: "select12", text: "10:00" },
  { value: "select13", text: "11:00" },
  { value: "select14", text: "12:00" },
  { value: "select15", text: "13:00" },
  { value: "select16", text: "14:00" },
  { value: "select17", text: "15:00" },
  { value: "select18", text: "16:00" },
  { value: "select19", text: "17:00" },
  { value: "select20", text: "18:00" },
  { value: "select21", text: "19:00" },
  { value: "select22", text: "20:00" },
  { value: "select23", text: "21:00" },
  { value: "select24", text: "22:00" },
  { value: "select25", text: "23:00" },
  { value: "select2", text: "24:00" },
];
const HotelWrite = () => {
  const { setTitle } = useVisualStore();
  const navigate = useNavigate();
  const [isImage, setIsImage] = useState("");
  const [imageFile1, setImageFile1] = useState(null);
  const [imageFile2, setImageFile2] = useState(null);
  const [imageFile3, setImageFile3] = useState(null);
  const [imageFile4, setImageFile4] = useState(null);
  const { rooms, resetRooms } = useRoomStore();
  useEffect(() => {
    setTitle("Hotel Registration", subvisual);
  }, [setTitle]);

  const handleFileChange1 = (file) => {
    setImageFile1(file);
  };
  const handleFileChange2 = (file) => {
    setImageFile2(file);
  };
  const handleFileChange3 = (file) => {
    setImageFile3(file);
  };
  const handleFileChange4 = (file) => {
    setImageFile4(file);
  };
  // const handleonChange = (file) => {
  //   setIsImage(file);
  // };

  const [isRadio, setIsRadio] = useState(false);
  const [isRadio2, setIsRadio2] = useState(false);
  const [isRadio3, setIsRadio3] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [locationText, setLocationText] = useState("");
  const [file, setFile] = useState();
  // const [price, setPrice] = useState("");
  const [isPopup, setIsPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hotelInfo, setHotelInfo] = useState({
    name: "",
    nation: "THAILAND",
    active_status: "ACTIVE",
    description: "",
    check_in: "01:00",
    check_out: "01:00",
    smoking_rule: "TOTAL_IMPOSSIBLE",
    pet_rule: "TOTAL_IMPOSSIBLE",
    pool_opening_time: null,
    pool_closing_time: null,
    rooms: [],
    basic_options: {
      swimming_pool: false,
      break_fast: false,
      wireless_internet: false,
      dry_cleaning: false,
      storage_service: false,
      convenience_store: false,
      ironing_tools: false,
      wakeup_call: false,
      mini_bar: false,
      shower_room: false,
      air_conditioner: false,
      table: false,
      tv: false,
      safety_deposit_box: false,
      welcome_drink: false,
      free_parking: false,
      fitness: false,
      electric_kettle: false,
    },
  });
  const [roomInfo, setRoomInfo] = useState({
    type: "STANDARD",
    active_status: "ACTIVE",
    bed_type: "SINGLE",
    standard_capacity: null,
    maximum_capacity: null,
    view_type: "OCEAN",
    standard_price: null,
    adult_fare: null,
    child_fare: null,
  });
  const addHotel = usehotelListStore((state) => state.addHotel);
  //호텔이름
  const handleName = (value) => {
    setHotelInfo({ ...hotelInfo, name: value });
  };
  //호텔위치
  const handleLocationChange = (event) => {
    const selectedValue = event.target.value;
    const selectedText =
      where.find((option) => option.value === selectedValue)?.text || "";

    setHotelInfo((prevHotelInfo) => ({
      ...prevHotelInfo,
      nation: selectedValue,
    }));
  };
  //가격
  // const handlePrice = (value) => {
  //   setHotelInfo({ ...hotelInfo, price: value });
  // };
  console.log(hotelInfo);
  //예약가능
  const handleRadioChange = (value) => {
    setHotelInfo({ ...hotelInfo, active_status: value });
  };
  //호텔안내
  const [content, setContent] = useState("");
  const handleContent = (value) => {
    setHotelInfo({ ...hotelInfo, description: value });
  };
  //편의시설
  const handleCheckbox = (e) => {
    const { name, checked } = e.target; // 체크박스의 name과 checked 상태를 가져옵니다.

    // options 상태를 업데이트합니다. 해당하는 option의 값을 checked 값으로 설정합니다.
    setHotelInfo((prev) => ({
      ...prev,
      basic_options: {
        ...prev.basic_options,
        [name]: checked, // name을 키로 사용하여 해당 옵션의 값을 업데이트합니다.
      },
    }));
  };
  const handleCheckboxChange = (checked, value) => {
    setHotelInfo((prevHotelInfo) => {
      const newFacilities = checked
        ? [...prevHotelInfo.facilities, value] // 체크된 경우 facilities 배열에 항목 추가
        : prevHotelInfo.facilities.filter((item) => item !== value); // 언체크된 경우 facilities 배열에서 해당 항목 제거

      return {
        ...prevHotelInfo,
        facilities: newFacilities,
      };
    });
  };
  //체크인

  const handleCheckIn = (e) => {
    const selectedValue = e.target.value;

    const selectedText =
      checkOption.find((option) => option.value === selectedValue)?.text || "";
    setHotelInfo({ ...hotelInfo, check_in: selectedValue });
  };
  const handleCheckOut = (e) => {
    const selectedValue = e.target.value;

    const selectedText =
      checkOption.find((option) => option.value === selectedValue)?.text || "";
    setHotelInfo({ ...hotelInfo, check_out: selectedValue });
  };
  //흡연
  const handleSmoking = (value) => {
    setHotelInfo({ ...hotelInfo, smoking_rule: value });
  };
  //애완동물
  const handlePet = (value) => {
    setHotelInfo({ ...hotelInfo, pet_rule: value });
  };
  //수영장
  const handlePoolOpen = (e) => {
    const selectedValue = e.target.value;

    const selectedText =
      checkOption.find((option) => option.value === selectedValue)?.text || "";
    setHotelInfo({ ...hotelInfo, pool_opening_time: selectedValue });
  };
  const handlePoolClose = (e) => {
    const selectedValue = e.target.value;

    const selectedText =
      checkOption.find((option) => option.value === selectedValue)?.text || "";
    setHotelInfo({ ...hotelInfo, pool_closing_time: selectedValue });
  };
  //호텔등록
  const token = localStorage.getItem("token");
  console.log(token);
  const onSendClick = async (e) => {
    if (
      hotelInfo.name == "" ||
      // hotelInfo.price == "" ||
      hotelInfo.description == ""
    ) {
      setIsPopup(true);
      setErrorMessage("호텔 기본정보를 모두 입력해 주세요.");
      return;
    } else if (
      hotelInfo.check_in == "" ||
      hotelInfo.check_out == "" ||
      (hotelInfo.basic_options.swimming_pool === true &&
        hotelInfo.basic_options.pool_opening_time == "") ||
      (hotelInfo.basic_options.swimming_pool == true &&
        hotelInfo.basic_options.pool_closing_time == "")
    ) {
      setIsPopup(true);
      setErrorMessage("호텔 규칙을 모두 입력해 주세요.");
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    if (imageFile1) formData.append("file", imageFile1);
    if (imageFile2) formData.append("file", imageFile2);
    if (imageFile3) formData.append("file", imageFile3);
    if (imageFile4) formData.append("file", imageFile4);
    formData.append("request", JSON.stringify(hotelInfo));
    console.log("Form", formData);
    const roomFormData = new FormData();
    if (file) roomFormData.append("file", file);
    roomFormData.append("request", JSON.stringify(roomInfo));
    try {
      const response = await axios.post(
        "http://52.78.12.252:8080/api/hotels",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // FormData를 사용할 때 'Content-Type': 'multipart/form-data' 헤더는 설정하지 않아도 됩니다.
          },
        }
      );
      const hotelId = response.data.result.id;

      const roomResponse = await axios.post(
        `http://52.78.12.252:8080/api/hotels/${hotelId}/rooms`,
        roomFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // FormData를 사용할 때 'Content-Type': 'multipart/form-data' 헤더는 설정하지 않아도 됩니다.
          },
        }
      );
      alert("호텔 등록 성공!");
    } catch (error) {
      console.error("Error sending POST request:", error);
    }

    // addHotel({ ...hotelInfo, rooms: [...rooms] });
    resetRooms();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };
  return (
    <>
      <div className="main">
        <div className="container mb-32">
          <Heading tag={"h3"} text={"호텔 등록"} className={"xl my-5"} />
          <Box>
            <Heading
              tag={"h3"}
              text={"호텔 대표이미지"}
              className={"base mb-5"}
            />
            <Box className={"white"}>
              <ul className="grid mobile:grid-cols-1 tablet:grid-cols-4 gap-5">
                <li>
                  <Noimage
                    props={{ image: imageFile1 }}
                    className={"mb-3 bg-gray-50"}
                  />
                  <Input
                    type={"file"}
                    onChange={handleFileChange1}
                    className={"mobile:!w-full"}
                  />
                </li>
                <li>
                  <Noimage
                    props={{ image: imageFile2 }}
                    className={"mb-3 bg-gray-50"}
                  />
                  <Input
                    type={"file"}
                    onChange={handleFileChange2}
                    className={"mobile:!w-full"}
                  />
                </li>
                <li>
                  <Noimage
                    props={{ image: imageFile3 }}
                    className={"mb-3 bg-gray-50"}
                  />
                  <Input
                    type={"file"}
                    onChange={handleFileChange3}
                    className={"mobile:!w-full"}
                  />
                </li>
                <li>
                  <Noimage
                    props={{ image: imageFile4 }}
                    className={"mb-3 bg-gray-50"}
                  />
                  <Input
                    type={"file"}
                    onChange={handleFileChange4}
                    className={"mobile:!w-full"}
                  />
                </li>
              </ul>
            </Box>
          </Box>

          <Box className={"mt-10"}>
            <Heading
              tag={"h3"}
              text={"호텔 기본정보"}
              className={"base mb-5"}
            />
            <Box className={"white"}>
              <ul className="grid mobile:grid-cols-1 tablet:grid-cols-3 gap-5">
                <li className="grid gap-3">
                  호텔 위치
                  <Select options={where} onChange={handleLocationChange} />
                </li>
                <li className="grid gap-3">
                  호텔 이름
                  <Input
                    type={"text"}
                    value={hotelInfo.name}
                    onChange={handleName}
                  />
                </li>
                {/* <li className="grid gap-3">
                  호텔 가격
                  <div className="grid grid-cols-[1fr_min-content] items-center gap-2">
                    <Input
                      onChange={handlePrice}
                      value={price}
                      type={"text"}
                      price={true}
                    />{" "}
                    원
                  </div>
                </li> */}
                <li className="grid gap-3">
                  호텔 예약여부
                  <div className="flex">
                    <Radio
                      color="blue"
                      checked={hotelInfo.active_status === "ACTIVE"}
                      value="예약 가능"
                      id="hotel_reser1"
                      name="reservationAvailability"
                      onChange={() => handleRadioChange("ACTIVE")}
                    />
                    <Radio
                      color="red ml-5"
                      checked={hotelInfo.active_status === "INACTIVE"}
                      value="예약 불가능"
                      id="hotel_reser2"
                      name="reservationAvailability"
                      onChange={() => handleRadioChange("INACTIVE")}
                    />
                  </div>
                </li>
                <li className="grid gap-3 tablet:col-span-3">
                  호텔 안내
                  <Input
                    type={"textarea"}
                    onChange={handleContent}
                    value={hotelInfo.description}
                  />
                </li>
              </ul>
            </Box>
          </Box>

          <Box className={"mt-10"}>
            <div className="grid gap-5 mobile:grid-cols-1 desktop:grid-cols-2 ">
              <div>
                <Heading
                  tag={"h3"}
                  text={"호텔 편의 시설"}
                  className={"base mb-5"}
                />
                <Box className={"white"}>
                  <ul className="grid mobile:grid-cols-2 tablet:grid-cols-3 gap-4">
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_1"
                        name="swimming_pool" // name을 추가하여 핸들러에서 참조할 수 있게 합니다.
                        value="수영장"
                        checked={hotelInfo.basic_options.swimming_pool}
                        onChange={handleCheckbox}
                      >
                        수영장
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_2"
                        name="breakfast"
                        value="조식뷔페"
                        checked={hotelInfo.basic_options.breakfast}
                        onChange={handleCheckbox}
                      >
                        조식뷔페
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_3"
                        name="wireless_internet"
                        value="무선 인터넷"
                        checked={hotelInfo.basic_options.wireless_internet}
                        onChange={handleCheckbox}
                      >
                        무선 인터넷
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_4"
                        name="dry_cleaning"
                        value="드라이클리닝"
                        checked={hotelInfo.basic_options.dry_cleaning}
                        onChange={handleCheckbox}
                      >
                        드라이클리닝
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_5"
                        name="storage_service"
                        value="여행가방 보관 서비스"
                        checked={hotelInfo.basic_options.storage_service}
                        onChange={handleCheckbox}
                      >
                        여행가방 보관 서비스
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_6"
                        name="convenience_store"
                        value="편의점"
                        checked={hotelInfo.basic_options.convenience_store}
                        onChange={handleCheckbox}
                      >
                        편의점
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_7"
                        name="ironing_tools"
                        value="다림질도구"
                        checked={hotelInfo.basic_options.ironing_tools}
                        onChange={handleCheckbox}
                      >
                        다림질도구
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_8"
                        name="wakeup_call"
                        value="모닝콜"
                        checked={hotelInfo.basic_options.wakeup_call}
                        onChange={handleCheckbox}
                      >
                        모닝콜
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_9"
                        name="mini_bar"
                        value="미니바"
                        checked={hotelInfo.basic_options.mini_bar}
                        onChange={handleCheckbox}
                      >
                        미니바
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_10"
                        name="shower_room"
                        value="샤워실"
                        checked={hotelInfo.basic_options.shower_room}
                        onChange={handleCheckbox}
                      >
                        샤워실
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_11"
                        name="air_conditioner"
                        value="에어컨"
                        checked={hotelInfo.basic_options.air_conditioner}
                        onChange={handleCheckbox}
                      >
                        에어컨
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_12"
                        name="table"
                        value="책상"
                        checked={hotelInfo.basic_options.table}
                        onChange={handleCheckbox}
                      >
                        책상
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_13"
                        name="tv"
                        value="TV"
                        checked={hotelInfo.basic_options.tv}
                        onChange={handleCheckbox}
                      >
                        TV
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_14"
                        name="safety_deposit_box"
                        value="안전금고"
                        checked={hotelInfo.basic_options.safety_deposit_box}
                        onChange={handleCheckbox}
                      >
                        안전금고
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_15"
                        name="welcome_drink"
                        value="웰컴 드링크"
                        checked={hotelInfo.basic_options.welcome_drink}
                        onChange={handleCheckbox}
                      >
                        웰컴 드링크
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_16"
                        name="free_parking"
                        value="무료 주차"
                        checked={hotelInfo.basic_options.free_parking}
                        onChange={handleCheckbox}
                      >
                        무료 주차
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_17"
                        name="fitness"
                        value="피트니스 시설"
                        checked={hotelInfo.basic_options.fitness}
                        onChange={handleCheckbox}
                      >
                        피트니스 시설
                      </Checkbox>
                    </li>
                    <li>
                      <Checkbox
                        color="blue"
                        id="check3_18"
                        name="electric_kettle"
                        value="전기주전자"
                        checked={hotelInfo.basic_options.electric_kettle}
                        onChange={handleCheckbox}
                      >
                        전기주전자
                      </Checkbox>
                    </li>
                  </ul>
                </Box>
              </div>
              <div>
                <Heading
                  tag={"h3"}
                  text={"호텔 규칙"}
                  className={"base mb-5"}
                />
                <Box className={"white"}>
                  <ul className="grid gap-5">
                    <li className=" grid mobile:grid-cols-1 tablet:grid-cols-[8rem_1fr] mobile:gap-2 tablet:gap-0 items-center">
                      <strong>체크인</strong>
                      <Select options={checkOption} onChange={handleCheckIn} />
                    </li>
                    <li className="grid mobile:grid-cols-1 tablet:grid-cols-[8rem_1fr] mobile:gap-2 tablet:gap-0 items-center">
                      <strong>체크아웃</strong>
                      <Select options={checkOption} onChange={handleCheckOut} />
                    </li>
                    <li className="grid mobile:grid-cols-1 tablet:grid-cols-[8rem_1fr] mobile:gap-2 tablet:gap-0 items-center">
                      <strong>흡연</strong>
                      <div className="flex justify-start mobile:whitespace-nowrap mobile:flex-wrap tablet:flex-nowrap">
                        <Radio
                          color={"red"}
                          checked={
                            hotelInfo.smoking_rule === "TOTAL_IMPOSSIBLE"
                          }
                          value={"전객실 불가능"}
                          id={"hotel_reser3"}
                          name={"rag2"}
                          onChange={() => handleSmoking("TOTAL_IMPOSSIBLE")}
                        />
                        <Radio
                          color={"green ml-5"}
                          checked={hotelInfo.smoking_rule === false}
                          value={"일부객실 가능"}
                          id={"hotel_reser4"}
                          name={"rag2"}
                          onChange={() => handleSmoking("SOME_POSSIBLE")}
                        />{" "}
                        <Badge
                          color={
                            "red mobile:ml-0 tablet:ml-2 mobile:mt-2 tablet:mt-0"
                          }
                        >
                          일부객실 선택시 현장에서 방을 배정합니다.
                        </Badge>
                      </div>
                    </li>
                    <li className="grid mobile:grid-cols-1 tablet:grid-cols-[8rem_1fr] mobile:gap-2 tablet:gap-0 items-center">
                      <strong>애완동물</strong>
                      <div className="flex justify-start mobile:whitespace-nowrap mobile:flex-wrap tablet:flex-nowrap">
                        <Radio
                          color={"red"}
                          checked={hotelInfo.pet_rule === "TOTAL_IMPOSSIBLE"}
                          value={"전객실 불가능"}
                          id={"hotel_reser5"}
                          name={"rag3"}
                          onChange={() => handlePet("TOTAL_IMPOSSIBLE")}
                        />
                        <Radio
                          color={"green ml-5"}
                          checked={hotelInfo.pet_rule === "SOME_POSSIBLE"}
                          value={"일부객실 가능"}
                          id={"hotel_reser6"}
                          name={"rag3"}
                          onChange={() => handlePet("SOME_POSSIBLE")}
                        />{" "}
                        <Badge
                          color={
                            "red  mobile:ml-0 tablet:ml-2 mobile:mt-2 tablet:mt-0"
                          }
                        >
                          일부객실 선택시 현장에서 방을 배정합니다.
                        </Badge>
                      </div>
                    </li>
                    {hotelInfo.basic_options.swimming_pool && (
                      <li className="grid grid-cols-[8rem_1fr] items-center">
                        <strong>수영장 이용시간</strong>
                        <div className="grid grid-cols-[1fr_2rem_1fr] items-center">
                          <Select
                            options={checkOption}
                            onChange={handlePoolOpen}
                          />
                          <span className="justify-self-center">~</span>
                          <Select
                            options={checkOption}
                            onChange={handlePoolClose}
                          />
                        </div>
                      </li>
                    )}
                  </ul>
                </Box>
              </div>
            </div>
          </Box>

          <Box className={"mt-10 room-write"}>
            <div className="flex justify-between items-center">
              <Heading tag={"h3"} text={"객실관리"} className={"base"} />
              <button
                className="btn-blue"
                onClick={() => setIsToggle(!isToggle)}
              >
                객실등록
              </button>
            </div>
            <RoomWrite
              file={file}
              setFile={setFile}
              roomInfo={roomInfo}
              setRoomInfo={setRoomInfo}
            />
          </Box>
          <div className="flex justify-between mt-10">
            <button className="btn-gray xl">이전</button>
            <div className="flex  gap-3">
              <button onClick={onSendClick} className="btn-blue xl">
                호텔 등록
              </button>
              <button className="btn-green xl">호텔 수정</button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isPopup} close={() => setIsPopup(false)}>
        <div className="text-center">
          <div className="text-center pb-3">{errorMessage}</div>
          <button className="btn-blue" onClick={() => setIsPopup(false)}>
            확인
          </button>
        </div>
      </Dialog>
      {isLoading && <Loading />}
    </>
  );
};

export default HotelWrite;
