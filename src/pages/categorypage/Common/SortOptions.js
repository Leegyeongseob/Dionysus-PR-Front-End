// SortOptions.js
import React from "react";
import styled from "styled-components";
const Label = styled.label`
  color: #fff;
`;
const SelectList = styled.select`
  width: 100px;
  height: 30px;
  font-size: 13px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  border: none;
  border-radius: 2px;
  text-align: center;
  margin-bottom: 20px;
  cursor: pointer;
  & > option {
    border: none;
    height: 60px;
  }
`;
const Sort = styled.div`
  display: ${({ toplist }) => (toplist ? "none" : "block")};
`;
//정렬버튼(정렬조건, 조건결과,화면에 보여줄지)
const SortOptions = ({ sortBy, setSortBy, toplist }) => {
  return (
    <Sort toplist={toplist}>
      <Label>Sort by: </Label>
      <SelectList value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">최신등록순</option>
        <option value="price">가격낮은순</option>
        <option value="abv">도수낮은순</option>
        <option value="volume">용량적은순</option>
      </SelectList>
    </Sort>
  );
};

export default SortOptions;
