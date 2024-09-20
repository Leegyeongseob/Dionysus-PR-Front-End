import { useState, useContext, useEffect } from "react";
import beer from "../../img/mainpageimg/background/beer.jpg";
import traditional from "../../img/mainpageimg/background/traditional.jpg";
import wine from "../../img/mainpageimg/background/wine.jpg";
import whiskey from "../../img/mainpageimg/background/whiskey.jpg";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../../global/UserStore";
import all from "../../img/mainpageimg/background/all.webp";
// FlipOutY animation
const flipOutY = keyframes`
  from {
    transform: perspective(400px) rotate3d(0, 1, 0, 0);
    opacity: 1;
  }
  30% {
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }
  to {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
`;

const BackgroundImg = styled.div`
  overflow-x: hidden; // 수평 스크롤을 숨김
  width: 100vw;
  height: ${({ scroll }) => (scroll ? "1050px" : "100vh")};
  border: none;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  animation: ${({ isFading }) => (isFading ? flipOutY : "none")} 0.55s forwards;
  opacity: ${({ opacity }) => (opacity ? "0.5" : "1")};
`;

// ImgChangeBtnsDiv StyledComponent
const ImgChangeBtnsDiv = styled.div`
  width: 100vw;
  height: 10vh;
  border: none;
  position: absolute;
  bottom: 0;
  display: ${({ backbtn }) => (backbtn ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  z-index: 5;
  @media (max-width: 768px) {
    display: flex;
  }
`;

// 배경바꾸는 버튼 styledComponent
const ImgBtnDiv = styled.div`
  width: 43px;
  height: 43px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 20px;
    height: 20px;
    border: none;
    background-color: #fff;
    border-radius: 50%;
    &:hover {
      background-color: rgba(255, 0, 0, 0.6);
    }
  }
`;
const Background = ({ children, backbtn, scroll, opacityisTrue }) => {
  //useContext를 변수에 선언
  const context = useContext(UserContext);
  //만들어놨던 useContext값들을 사용하기 위해 가져옴.
  const { bgimgurl, setBgimgurl } = context;
  //fade효과를 주기 위한 게산값 저장 변수
  const [isFading, setIsFading] = useState(false);
  //버튼을 클릭했을 때 이미지를 저장하고 애니메이션 상태를 주는 부분.
  const onClick = (url) => {
    setBgimgurl(url);
    setIsFading(true);
  };
  //배경 변화 버튼을 눌렀을 때 변화되는 부분
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        setBgimgurl(bgimgurl);
        setIsFading(false);
      }, 750); // 0.75초로 간격을 줘서 애니메이션 변화
      return () => clearTimeout(timer); //값 비워주기
    }
  }, [isFading, bgimgurl]);
  return (
    <BackgroundImg
      imageurl={bgimgurl}
      isFading={isFading}
      scroll={scroll}
      opacity={opacityisTrue}
    >
      {children}
      <ImgChangeBtnsDiv backbtn={backbtn}>
        <ImgBtnDiv>
          <button onClick={() => onClick(all, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(traditional, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(whiskey, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(wine, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(beer, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
      </ImgChangeBtnsDiv>
    </BackgroundImg>
  );
};

export default Background;
