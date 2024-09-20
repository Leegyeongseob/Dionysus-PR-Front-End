import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import { Outlet } from "react-router-dom";
const NotIncludeFooter = () => {
  return (
    // 배경 이미지 변경 버튼, 스크롤 숨기기, 투명도(안씀.)
    <Background backbtn={false} scroll={false} opacityisTrue={false}>
      <Header />
      {/* 중첩라우터의 하위라우터가 위치하는 부분 */}
      <Outlet />
    </Background>
  );
};

export default NotIncludeFooter;
