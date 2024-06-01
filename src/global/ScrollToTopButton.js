import { TfiAngleDoubleUp } from "react-icons/tfi"; // 리액트 아이콘
import styled from "styled-components";

const ScrollContainer = styled.div`
  position: fixed;
  bottom: 150px;
  right: 90px;
  width: 50px;
  z-index: 1000;

  & button {
    width: 30px;
    height: 50px;
    border: 2px solid white;
    background-color: black;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease; // 호버시 부드러운 효과
  }
  & button:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;

const TopButton = ({ logoRef }) => {
  const scrollToLogo = () => {
    // 위치 값이 존재하면
    if (logoRef.current) {
      logoRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <ScrollContainer>
      <button onClick={scrollToLogo} type="button">
        <TfiAngleDoubleUp />
      </button>
    </ScrollContainer>
  );
};

export default TopButton;
