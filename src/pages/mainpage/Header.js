import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import logo from "../../img/mainpageimg/logo/logo1.jpeg";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useState, useContext } from "react";
import { UserContext } from "../../global/UserStore";
import traditional from "../../img/mainpageimg/background/traditional.jpg";
import beer from "../../img/mainpageimg/background/beer.jpg";
import wine from "../../img/mainpageimg/background/wine.jpg";
import whiskey from "../../img/mainpageimg/background/whiskey.jpg";
import all from "../../img/mainpageimg/background/all.webp";
import { CiBeerMugFull } from "react-icons/ci"; // 맥주 icon
import { PiWineFill } from "react-icons/pi"; //와인 icon
import { IoMdWine } from "react-icons/io"; // 위스키 icon
import { FaWineBottle } from "react-icons/fa"; //전통주 icon
import { VscAccount } from "react-icons/vsc"; // 계정 이미지 icon
import { BsPersonCircle } from "react-icons/bs";
import { GiHeartBottle } from "react-icons/gi";
//사이드바 높이 조절을 위한 상수 선언
const topbarHeight = "30px";

//Header StyledComponent
const HeaderContainer = styled.header`
  width: 100vw;
  height: 15vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//logoImg StyledComponent
const Logo = styled.div`
  width: 110px;
  height: 120px;
  background-image: ${({ $logourl }) => `url(${$logourl})`};
  border: none;
  border-radius: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

//Header wrapping StyledComponent

const DivHeader = styled.div`
  width: 85vw;
  height: 15vh;
  border: none;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
//Nav StyledComponent
const Nav = styled.nav`
  width: 85vw;
  height: 13vh;
  margin-left: 16vw;
  border: none;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 1200px) {
    margin-left: 15vw;
  }
  @media (max-width: 768px) {
    width: 0px;
    margin-left: 0px;
  }
`;
//Header 안에 Item StyledComponent
const Item = styled.div`
  width: 9vw;
  height: 13vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
  @media (max-width: 900px) {
    width: 10vw;
  }
  @media (max-width: 822px) {
    width: 12vw;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
// fadeInDown 애니메이션 정의
const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;
//ItemFont StyledComponent
const ItemFont = styled.p`
  font-size: 18px;
  font-weight: border;
  color: #fff;
  animation: ${({ $animate }) => ($animate ? fadeInDown : "none")} 0.5s
    ease-in-out;
`;
// signup,마이페이지,사이드바 버튼을 wrapping StyledComponent
const SideWrapping = styled.div`
  width: 13vw;
  height: 13vh;
  border: none;
  display: flex;
  align-items: center;
  margin-left: 70px;
  @media (max-width: 768px) {
    width: 90px;
    margin-left: 100px;
  }
`;
// signup 버튼 StyledComponent
const SignUpBtn = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 15%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1vw;
  border: none;
  @media (max-width: 1050px) {
    display: none;
  }
`;
//사이드바 버튼 StyledComponent
const SideBarBtn = styled.div`
  width: 35px;
  height: 35px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  margin-left: 1vw;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  cursor: pointer;
`;
const SideBarBody = styled.div`
  width: 300px;
  height: calc(100vh - ${topbarHeight});
  position: fixed;
  top: ${topbarHeight};
  left: 0;
  background-color: #08403d;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  z-index: 50;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s ease;
  transform: ${({ $isOpen, $scrollexist }) =>
    $isOpen
      ? $scrollexist
        ? "translateX(calc(100vw - 320px))"
        : "translateX(calc(100vw - 300px))"
      : "translateX(100vw)"};
`;
const ProfileDiv = styled.div`
  width: 300px;
  height: 130px;
  display: flex;
  & .profileImage {
    width: 100px;
    height: 100px;
  }

  & .divExitUser {
    width: 190px;
    height: 150px;
  }
  & .exit {
    width: 200px;
    height: 55px;
    display: flex;
    justify-content: end;
    padding: 10px;
  }
  & .user {
    width: 160px;
    height: 75px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin: 2px 20px;
    line-height: 1.5;
  }
  .username {
    color: #fff;
    font-size: 20px;
    width: 200px;
    height: auto;
    margin-left: 20px;
  }
  .userid {
    color: #fff;
    font-size: 20px;
    width: 200px;
    height: auto;
    margin-left: 20px;
  }
`;
const PrifileDiv2 = styled.div`
  width: 300px;
  height: 120px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const BtnStyle = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  & > p {
    color: #fff;
  }
`;
const SideMenuDiv = styled.div`
  width: 300px;
  height: 80px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  > .sidemenu {
    color: #fff;
    & > p {
      font-size: 17px;
      font-weight: bolder;
    }
  }
  &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;
const ProfileImg = styled.div`
  width: 120px;
  height: 100px;
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .uploaded-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Header = ({ logoRef, scrollexist = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 사이드바 메뉴 열기/닫기
  const context = useContext(UserContext); //useContext 불러와서 변수로 선언
  const { setBgimgurl, setCategory } = context; // 컬러와 이름을 전역 상태 관리에서 가져 옴
  const [animate, setAnimate] = useState(false); // 애니메이션을 위한 useState
  const userid = sessionStorage.getItem("user_id"); // 저장된 아이디 불러옴.
  const username = sessionStorage.getItem("user_name"); // 저장된 이름 불러옴.
  const proflieurl = sessionStorage.getItem("profile_url"); // 저장된 파이어베이스 url 불러옴.
  console.log("Logo received logoRef:", logoRef);
  //사이드바를 열고 닫는 함수
  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  //사이드바에서 주류페이지 접근시 해당 배경을 변경하는 함수
  const backImgChange = (alcohol) => {
    setAnimate(true);
    setBgimgurl(alcohol);
    setTimeout(() => setAnimate(false), 500); // 버튼 애니메이션 종료 후 상태 초기화 0.5s
  };
  return (
    <>
      <HeaderContainer>
        <DivHeader>
          <Link to="/">
            <Logo ref={logoRef} $logourl={logo} />
          </Link>
          <Nav>
            <Item>
              <Link
                to="/recommend"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(all);
                  setCategory("all");
                }}
              >
                <ItemFont $animate={animate}>인기주류</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/traditional"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(traditional);
                  setCategory("전통주");
                }}
              >
                <ItemFont $animate={animate}>전통주</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/wiskey"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(whiskey);
                  setCategory("위스키");
                }}
              >
                <ItemFont $animate={animate}>위스키</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/wine"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(wine);
                  setCategory("와인");
                }}
              >
                <ItemFont $animate={animate}>와인</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/beer"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(beer);
                  setCategory("맥주");
                }}
              >
                <ItemFont $animate={animate}>맥주</ItemFont>
              </Link>
            </Item>
            <SideWrapping>
              {userid ? (
                <Link to="/mypage" style={{ textDecoration: "none" }}>
                  <BsPersonCircle size={50} color="rgba(255,255,255,0.8)" />
                </Link>
              ) : (
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <SignUpBtn>
                    <ItemFont>로그인</ItemFont>
                  </SignUpBtn>
                </Link>
              )}
              <SideBarBtn>
                {/* 햄버거를 눌렀을 경우 사이드바 열림*/}
                {!isMenuOpen && (
                  <GiHamburgerMenu
                    size={35}
                    color="white"
                    onClick={onClickLeft}
                  />
                )}
              </SideBarBtn>
              <SideBarBody
                $isOpen={isMenuOpen}
                //스크롤이 있으면 스크롤 감안해서 좀더 왼쪽으로.
                $scrollexist={scrollexist}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <ProfileDiv>
                  <ProfileImg>
                    {proflieurl ? (
                      <img
                        src={proflieurl}
                        alt="uploaded"
                        className="uploaded-img"
                      />
                    ) : (
                      <VscAccount size={100} color="rgba(255,255,255,0.8)" />
                    )}
                  </ProfileImg>
                  <div className="divExitUser">
                    {/* // 사이드바를 누를 경우 닫음 */}
                    <div className="exit">
                      {isMenuOpen && (
                        <GiCancel
                          size={35}
                          color="white"
                          onClick={onClickLeft}
                        />
                      )}
                    </div>
                    <div className="username">
                      {username && <span>{username}</span>}
                    </div>
                    <div className="userid">
                      {userid ? (
                        <span>{userid}</span>
                      ) : (
                        <span>로그인 해주세요.</span>
                      )}
                    </div>
                  </div>
                </ProfileDiv>
                <PrifileDiv2>
                  {userid ? (
                    <Link to="/mypage" style={{ textDecoration: "none" }}>
                      <BtnStyle>
                        <p>마이페이지</p>
                      </BtnStyle>
                    </Link>
                  ) : (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      <BtnStyle>
                        <p>로그인</p>
                      </BtnStyle>
                    </Link>
                  )}
                </PrifileDiv2>
                <SideMenuDiv>
                  <Link
                    to="/recommend"
                    style={{ textDecoration: "none" }}
                    className="sidemenu"
                  >
                    <p>
                      <GiHeartBottle size={32} color="white" />
                      인기주류
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/traditional"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(traditional);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <FaWineBottle size={30} color="white" />
                      &nbsp;전통주
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/wiskey"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(whiskey);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <IoMdWine size={30} color="white" />
                      &nbsp;위스키
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/wine"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(wine);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <PiWineFill size={30} color="white" />
                      &nbsp;와인
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/beer"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(beer);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <CiBeerMugFull size={30} color="white" />
                      &nbsp;맥주
                    </p>
                  </Link>
                </SideMenuDiv>
              </SideBarBody>
            </SideWrapping>
          </Nav>
        </DivHeader>
      </HeaderContainer>
    </>
  );
};

export default Header;
