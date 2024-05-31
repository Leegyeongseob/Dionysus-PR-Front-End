import React, { useState } from "react"; // React와 useState Hook import
import styled from "styled-components"; // styled-components 라이브러리 import
import Common from "../Common/Common"; // Common 컴포넌트 import
import Recommend2 from "./CategoryList"; // Recommend2 컴포넌트 import
import Menu from "./Menu"; // Menu 컴포넌트 import
import DisplayWeather from "./Weather"; // DisplayWeather 컴포넌트 import

// Container 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  gap: 30px;

  h1 {
    width: 280px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }
`;

// ThemeContainer 스타일 컴포넌트 정의
const ThemeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 30px;
`;

// ThemeItem 스타일 컴포넌트 정의
const ThemeItem = styled.div`
  width: ${({ isBig }) => (isBig ? "800px" : "400px")};
  height: ${({ isBig }) => (isBig ? "600px" : "300px")};
  cursor: pointer;
  transition: width 0.5s ease, height 0.5s ease;
  position: ${({ isBig }) => (isBig ? "absolute" : "relative")};
  z-index: ${({ isBig }) => (isBig ? "1" : "0")};
  display: ${({ showMenu }) => (showMenu ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  margin: 10px;

  @media screen and (max-width: 768px) {
    width: 90vw;
    display: flex;
  }
`;

// ItemTitle 스타일 컴포넌트 정의
const ItemTitle = styled.div`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 20px 20px 0 0;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

// ItemTitleText 스타일 컴포넌트 정의
const ItemTitleText = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 26px;
`;

// ThemeItemImage 스타일 컴포넌트 정의
const ThemeItemImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 0 0 20px 20px;
`;

// Wrapper 스타일 컴포넌트 정의
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

// RecommendIconDiv 스타일 컴포넌트 정의
const RecommendIconDiv = styled.div`
  width: 100%;
  height: 480px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;
  }
`;

// IconBox 스타일 컴포넌트 정의
const IconBox = styled.div`
  width: 327px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    height: 100px;
  }
`;

// IconImg 스타일 컴포넌트 정의
const IconImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: transform 0.2s ease;
  z-index: 1;

  @media screen and (max-width: 768px) {
    width: 100px;
    height: 100px;
  }

  &:hover {
    transform: scale(0.9);
  }
`;

// CommonBox 스타일 컴포넌트 정의
const CommonBox = styled.div`
  position: ${({ showRecommend2 }) =>
    showRecommend2 ? "absolute" : "relative"};
  display: flex;
  flex-direction: column;
`;

// ButtonItem 스타일 컴포넌트 정의
const ButtonItem = styled.button`
  margin-left: 50vw;

  @media (max-width: 768px) {
    margin-left: 56vw;
  }
`;

// TitleDiv 스타일 컴포넌트 정의
const TitleDiv = styled.div`
  width: 100vw;
  height: 60px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 20px;
`;

// Recommend 컴포넌트 정의
const Recommend = () => {
  const [isBig, setIsBig] = useState(null); // 현재 확대된 테마 아이템 인덱스 상태
  const [showRecommend2, setShowRecommend2] = useState(false); // Recommend2 컴포넌트 표시 상태
  const [showMenu, setShowMenu] = useState(false); // Menu 컴포넌트 표시 상태
  const [selectedIcon, setSelectedIcon] = useState(null); // 선택된 아이콘 상태
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴 상태

  // 테마 아이템 크기 토글 함수
  const toggleSize = (index) => {
    setIsBig(isBig === index ? null : index); // 현재 인덱스와 같은지 비교하여 토글
    if (index !== 2) {
      setShowMenu(false); // 메뉴 표시 상태 초기화
    }
  };

  // 아이콘 클릭 핸들러
  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName); // 선택된 아이콘 상태 설정
    setShowRecommend2(true); // Recommend2 컴포넌트 표시
  };

  // Recommend2 컴포넌트 닫기 핸들러
  const handleCloseRecommend2 = () => {
    setShowRecommend2(false); // Recommend2 컴포넌트 숨김
    setSelectedIcon(null); // 선택된 아이콘 상태 초기화
  };

  // 메뉴 아이콘 클릭 핸들러
  const handleMenuIconClick = (iconName) => {
    setSelectedMenu(iconName); // 선택된 메뉴 상태 설정
    setShowMenu(true); // 메뉴 표시
  };

  // 아이콘 이미지 경로 반환 함수
  const getIconImagePath = (iconName) => {
    return `${process.env.PUBLIC_URL}/recommendationicon/${iconName}.png`;
  };

  // 배경 이미지 경로 반환 함수
  const getBackgroundImagePath = (index) => {
    const images = [
      `${process.env.PUBLIC_URL}/recommendationicon/background/기분.jpg`, // 기분에 따른 추천 이미지
      `${process.env.PUBLIC_URL}/recommendationicon/background/날씨.jpg`, // 날씨에 따른 추천 이미지
      `${process.env.PUBLIC_URL}/recommendationicon/background/음식.jpg`, // 음식에 따른 추천 이미지
    ];
    return images[index];
  };

  return (
    <Container>
      <h1>다양한 주류 추천</h1> {/* 제목 */}
      <ThemeContainer>
        {showMenu && ( // showMenu가 true이면
          <CommonBox>
            <Menu selectedMenu={selectedMenu} setShowMenu={setShowMenu} />{" "}
            {/* Menu 컴포넌트 */}
          </CommonBox>
        )}
        {showRecommend2 ? ( // showRecommend2가 true이면
          <CommonBox>
            <ButtonItem onClick={handleCloseRecommend2}>Close</ButtonItem>{" "}
            {/* 닫기 버튼 */}
            <Recommend2 selectedIcon={selectedIcon} />{" "}
            {/* Recommend2 컴포넌트 */}
          </CommonBox>
        ) : (
          <>
            {[0, 1, 2].map(
              (
                index // 3개의 테마 아이템을 반복 렌더링
              ) => (
                <ThemeItem
                  showMenu={showMenu}
                  key={index}
                  onClick={() => toggleSize(index)} // 클릭 시 테마 아이템 크기 토글
                  isBig={isBig === index} // 현재 확대된 상태인지 확인
                >
                  <Wrapper>
                    <ItemTitle
                      bgColor={
                        [
                          "rgba(112, 101, 19, 0.8)",
                          "rgba(182, 113, 20, 0.8)",
                          "rgba(82, 1, 33, 0.8)",
                        ][index]
                      }
                    >
                      <ItemTitleText isBig={index}>
                        {
                          [
                            "기분에 따른 추천",
                            "날씨에 따른 추천",
                            "음식에 따른 추천",
                          ][index]
                        }
                      </ItemTitleText>
                    </ItemTitle>
                    {isBig === index ? ( // 현재 아이템이 확대된 상태인지 확인
                      <RecommendIconDiv>
                        {index === 0 ? ( // 기분에 따른 추천 아이콘
                          ["기쁨", "슬픔", "화남", "사랑"].map((iconName) => (
                            <IconBox key={iconName}>
                              <IconImg
                                src={getIconImagePath(iconName)}
                                onClick={() => handleIconClick(iconName)} // 아이콘 클릭 핸들러
                              />
                            </IconBox>
                          ))
                        ) : index === 1 ? ( // 날씨에 따른 추천 아이콘
                          <>
                            <DisplayWeather /> {/* DisplayWeather 컴포넌트 */}
                            {["맑음", "흐림", "비", "눈"].map((iconName) => (
                              <IconBox key={iconName}>
                                <IconImg
                                  src={getIconImagePath(iconName)}
                                  onClick={() => handleIconClick(iconName)} // 아이콘 클릭 핸들러
                                />
                              </IconBox>
                            ))}
                          </>
                        ) : (
                          // 음식에 따른 추천 아이콘
                          ["한식", "일식", "양식", "중식"].map((iconName) => (
                            <IconBox key={iconName}>
                              <IconImg
                                src={getIconImagePath(iconName)}
                                onClick={() => handleMenuIconClick(iconName)} // 메뉴 아이콘 클릭 핸들러
                              />
                            </IconBox>
                          ))
                        )}
                      </RecommendIconDiv>
                    ) : (
                      <RecommendIconDiv>
                        <ThemeItemImage
                          src={getBackgroundImagePath(index)} // 배경 이미지 경로
                          alt="배경 이미지"
                        />
                      </RecommendIconDiv>
                    )}
                  </Wrapper>
                </ThemeItem>
              )
            )}
          </>
        )}
      </ThemeContainer>
      <TitleDiv>
        <p>인기주류 Top 10!</p> {/* 인기 주류 Top 10 제목 */}
      </TitleDiv>
      <Common toplist={true} /> {/* Common 컴포넌트 */}
    </Container>
  );
};

export default Recommend; // Recommend 컴포넌트 export
