import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopButton from "./ScrollToTopButton";
import { useRef } from "react";
const WrapBackground = styled.div`
  width: auto;
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;
`;
const IncludeFooter = () => {
  //top 버튼의 목적지를 logo로 지정하기 위한 useRef
  const logoRef = useRef(null);
  return (
    <WrapBackground>
      <Background backbtn={false} scroll={true} opacityisTrue={false}>
        {/* 스크롤 존재할 때 사이드바 위치 감안해서 살짝 조정 */}
        {/* Header에 넘겨서 로고 위치를 받아옴. */}
        <Header scrollexist={true} logoRef={logoRef} />
        <Outlet />
        {/* Top버튼에 값을 넘김 */}
        <TopButton logoRef={logoRef} />
      </Background>
      <Footer />
    </WrapBackground>
  );
};

export default IncludeFooter;
