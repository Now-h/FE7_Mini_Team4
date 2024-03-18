import React from "react";
import Input from "../Input";
import Select from "../Select";
import { IoSearch } from "react-icons/io5";

const where = [
  {
    value: "select1",
    text: "어디에 머물고 싶으세요?",
  },
  {
    value: "select2",
    text: "필리핀",
  },
  {
    value: "select3",
    text: "태국",
  },
  {
    value: "select4",
    text: "말레이시아",
  },
  {
    value: "select5",
    text: "일본",
  },
  {
    value: "select6",
    text: "캄보디아",
  },
];

const SearchDetail = () => {
  return (
    <form>
      <div className="flex gap-2">
        <Select options={where} />
        <Input type={"text"} placeholder="호텔명을 입력하세요." />
        <button className="btn-blue xl">
          <IoSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchDetail;
