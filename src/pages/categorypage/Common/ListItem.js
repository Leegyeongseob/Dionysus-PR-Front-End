import styled, { keyframes, css } from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import AxiosApi from "../../../api/AxiosApi";
import { FaAnglesDown } from "react-icons/fa6";
import ReactModal from "react-modal";
import ScoreApi from "../../../api/ScoreApi";
import ReviewApi from "../../../api/ReviewApi";
import JjimApi from "../../../api/JjimApi";
import { IoMdCloseCircle } from "react-icons/io";

ReactModal.setAppElement("#root");

const ItemBox = styled.div`
  width: 1000px;
  height: 170px;
  display: ${({ hidden }) => hidden ? 'none' : 'flex'};
  flex-wrap: wrap;
  align-items: center;
  justify-content: ${({ itemcenter }) => itemcenter && "center"};
`;

const ImageContainer = styled.div`
  width: 140px;
  height: 170px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 15px;
  background-color: #fff;
`;

const ItemContext = styled.div`
  width: 20vw;
  height: 140px;
  @media (max-width: 1800px) {
    width: 15vw;
  }
  @media (max-width: 1545px) {
    width: 30vw;
  }
  @media (max-width: 1070px) {
    width: 400px;
  }

  & > .com {
    width: auto;
    height: 25px;
    font-size: 14px;
  }
  & > .name {
    width: auto;
    height: 50px;
    font-size: 17px;
  }
  & > div {
    display: flex;
    padding-left: 20px;
    align-items: center;
    color: white;
  }
  .country_of_origin {
    margin-right: 5px;
  }
  .abv {
    margin-right: 5px;
  }
  .volume {
    margin-right: 5px;
  }
  & > .score {
    height: 30px;
    display: flex;
    & > .wall {
      color: #fff;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;

const ItemReview = styled.div`
  width: 400px;
  height: 140px;
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid white;
  padding: 10px;
  color: #fff;
  visibility: ${({ buttonvisible }) => (buttonvisible ? "hidden" : "visible")};
  display: ${({ buttonon }) => (buttonon ? "none" : "flex")};
  margin-right: 10px;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 1545px) {
    display: ${({ mobliereviewmore }) => (mobliereviewmore ? "flex" : "none")};
    width:450px;
    margin-left: 14vw;
  }
  & > .review {
    display: flex;
    justify-content: space-between;
  }
  & > .reviewText {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .reviewdiv {
    display: flex;
    align-items: center;
    margin-top: 7px;
  }
  .more {
    font-size: 15px;
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
`;
const ReviewValue = styled.textarea`
  width: 370px;
  height: 60px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 15px;
  display: ${({ reviewinput }) => (reviewinput ? "block" : "none")};
`;
const ReviewView = styled.div`
  margin: 0;
  width: 370px;
  border-radius: 0;
  border: none;
  display: ${({ isReview, firstreview }) =>
    isReview || firstreview ? "block" : "none"};
`;
const ReviewBtn = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 7px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 14px;
  margin-left: 250px;
  display: ${({ reviewinput }) => (reviewinput ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: lightgray;
  }
  @media (max-width: 1545px) {
    margin-left: 300px;
  }
`;
const ScoreSelect = styled.select`
  width: 55px;
  height: 25px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
  margin-top: 2px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  cursor: pointer;
  & > option {
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 13px;
  }
`;
const ScoreButton = styled.button`
  width: 55px;
  height: 25px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`;
const Morebtnreview = styled.div`
  width: 400px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  color: #fff;
  display: ${({ buttonon }) => (buttonon ? "block" : "none")};
  position: relative;
  margin-top: auto;
  margin-right: 10px;
  z-index: 10;
  & > .review {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .reviewdiv {
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .reviewlist {
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
  }
  .reviewuser {
    font-size: 13px;
    margin-bottom: 5px;
  }
  .close {
    font-size: 15px;
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
  @media (max-width: 1545px) {
    position: absolute;
    margin-top: 350px;
    margin-left: 16vw;
  }
`;
// bounce 애니메이션 정의
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;
// bounce을 적용할 HeartIcon 정의
const HeartIcon = styled(FaHeart)`
  
  cursor: pointer;
  @media (max-width: 1545px) {
    margin-left: 40px;
    display: ${({ mobliemorerestreview }) => (mobliemorerestreview ? "none" : "flex")};
  }
  @media (max-width: 1070px) {
    display: none;
  }
  ${(props) =>
    props.bouncing &&
    css`
      animation: ${bounce} 1s;
    `}
`;
// zoomOutUp 애니메이션 정의
const zoomOutUp = keyframes`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    animation-timing-function: ease-in;
  }
  100% {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;
// zoomOutUp을 적용할 AnimatedStar 정의
const AnimatedStar = styled(FaStar)`
  ${(props) =>
    props.isAnimating &&
    css`
      animation: ${zoomOutUp} 1s forwards;
    `}
`;
// flipInX 애니메이션 정의
const flipInX = keyframes`
  from {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }
`;
// flipInX을 적용할 AnimatedScore 정의
const AnimatedScore = styled.div`
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  ${(props) =>
    props.isAnimating &&
    css`
      animation: ${flipInX} 0.6s forwards;
    `}
`;
const slideOutDown = keyframes`
  from {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 100%, 0);
    visibility: hidden;
  }
`;
// MoblieBtn 컴포넌트에 hover 스타일 추가
const MoblieBtn = styled.div`
  width: 80px;
  height: 25px;
  color: #fff;
  font-size: 14px;
  display: none;
  & > span {
    margin-top: 10px;
    width: 70px;
    height: 25px;
  }
  cursor: pointer;
  position: relative;
  @media (max-width: 1550px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    color: green;
  }
  &:hover + .icon {
    animation: ${slideOutDown} 1s forwards;
  }
`;
const FaAnglesDownIcon = styled(FaAnglesDown)`
  display: none;
  color: white;
  @media (max-width: 1550px) {
    display: flex;
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
  }
`;
const HiddenBtn = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: ${({ reviewmore }) => (reviewmore ? "left" : "right")};
  margin-left: ${({ reviewmore }) => reviewmore && "15vw"};
`;
const ReviewCloseBtn = styled(IoMdCloseCircle)`
  color: #fff;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: none;
  &:hover {
    color: rgba(50, 50, 150, 0.8);
  }
  @media (max-width: 1545px) {
    display: flex;
  }
`;
const ListItem = ({
  alcohols,
  alcoholList,
  isOne,
  isReview,
  reviewinput,
  firstreview,
  reviewmore,
  itemcenter,
}) => {
  //해당 컴포넌트의 별점을 선택시 상태를 저장하는 변수
  const [scoreChoices, setScoreChoices] = useState(
    new Array(alcohols.length).fill(null)
  );
  //각 컴포넌트마다 추가 별점 점수 상태를 저장하는 변수
  const [selectedScores, setSelectedScores] = useState(
    new Array(alcohols.length).fill(null)
  );
  //기능 접근을 위해 해당 컴포넌트의 알콜이름을 저장하는 변수
  const [selectedAlcoholNames, setSelectedAlcoholNames] = useState(
    new Array(alcohols.length).fill(null)
  );

  //각 컴포넌트마다 리뷰입력 값을 저장하는 변수
  const [reviewInputs, setReviewInputs] = useState(
    new Array(alcohols.length).fill("")
  );
  //해당 알콜이름의 점수선택을 비활성화 하기위한 변수
  const [scoreSelectDisabled, setScoreSelectDisabled] = useState(
    alcohols.reduce((acc, cur) => {
      acc[cur.alcohol_name] = false;
      return acc;
    }, {})
  );
  //알콜에 매칭해서 해당 아이디,알콜이름,리뷰,닉네임 저장
  const [otherreviewsave, setOtherreviewsave] = useState([]);
  //더보기를 눌렀을 때 해당하는 컴포넌트만 더보기 창이 뜨도록 상태를 저장하는 변수
  const [morebtnonclick, setMorebtnonclick] = useState(
    new Array(alcohols.length).fill(false)
  );
  //더보기를 눌렀을 때 나머지 리뷰들 전부 숨김.
  const [morerestreview, setMorerestreview] = useState(false);
  //리뷰 작성을 눌렀을 때 해당하는 컴포넌트만 창이 뜸.
  const [mobliereviewmore, setMobliereviewmore] = useState(
    new Array(alcohols.length).fill(false)
  );
  //리뷰 작성을 눌렀을 때 나머지 리뷰들 전부 숨김.
  const [mobliemorerestreview, setMobliemorerestreview] = useState(false);
  //리뷰 작성을 눌렀을 때 하위 술데이터 숨김.
  const [hideFromIndex, setHideFromIndex] = useState(null);
  const [jjimData, setJjimData] = useState([]);
  // 추가된 상태 정의: 하트 아이콘이 bouncing 상태인지 추적
  const [bouncingHeart, setBouncingHeart] = useState(null);
  // 추가된 상태 정의: 별점 아이콘이 zoomOutUp 상태인지 추적
  const [animatingStar, setAnimatingStar] = useState(null);
  // 추가된 상태 정의: 별점 점수가 flipInX 상태인지 추적
  const [animatingScore, setAnimatingScore] = useState(null);

  // 별점에 대한 모달 3개 모음.(성공(별 애니메이션을 가려서 기능 빼놨습니다.),로그인안됨,별점 값이 들어있지 않음.)
  const [scoresuccessModalOpen, setScoresuccessModalOpen] = useState(false);
  const [scoreloginfailModalOpen, setScoreloginfailModalOpen] = useState(false);
  const [scorenullfailModalOpen, setScorenullfailModalOpen] = useState(false);
  // 리뷰에 대한 모달 2개 모음.(리뷰입력 성공, 리뷰 입력 실패(에러포함.))
  const [reviewsuccessModalOpen, setReviewsuccessModalOpen] = useState(false);
  const [reviewnullfailModalOpen, setReviewnullfailModalOpen] = useState(false);
  // 찜에 대한 모달 1개 모음.(찜을 실패했을 때(에러포함.))
  const [jjimnullfailModalOpen, setJjimnullfailModalOpen] = useState(false);

  //모달 상태를 바꿔주는 함수부분
  //Score 상태를 바꿔주는 handler
  const handleScoreSuccessCloseModal = () => {
    setScoresuccessModalOpen(false);
  };
  const handleScoreLoginFailCloseModal = () => {
    setScoreloginfailModalOpen(false);
  };
  const handleScoreNullFailCloseModal = () => {
    setScorenullfailModalOpen(false);
  };
  //Review 상태를 바꿔주는 handler
  const handleReviewSuccessCloseModal = () => {
    setReviewsuccessModalOpen(false);
  };
  const handleReviewFailCloseModal = () => {
    setReviewnullfailModalOpen(false);
  };
  //Jjim 상태를 바꿔주는 handler
  const handleJjimFailCloseModal = () => {
    setJjimnullfailModalOpen(false);
  };

  //별점 입력시 데이터를 저장하는 함수.
  const handleScoreChange = (index, value) => {
    const newScoreChoices = [...scoreChoices];
    newScoreChoices[index] = value;
    setScoreChoices(newScoreChoices);
  };
  //리뷰 입력시 데이터를 저장하는 함수.
  const handleReviewInputChange = (index, value) => {
    const newReviewInputs = [...reviewInputs];
    newReviewInputs[index] = value;
    setReviewInputs(newReviewInputs);
  };
  // ItemBox 토글하는 함수
  const toggleItemBoxVisibility = (index) => {
    setHideFromIndex(prev => prev === index + 1 ? null : index + 1);
  };
  //해당하는 컴포넌트의 리뷰를 등록하는 함수.
  const handleReviewSaveClick = async (index) => {
    const userId = sessionStorage.getItem("user_id");
    //해당하는 컴포넌트의 알콜이름.
    const alcoholName = alcohols[index].alcohol_name;
    // 해당하는 컴포넌트의 리뷰input
    const review = reviewInputs[index];
    // Show fail modal 로그인 필요
    if (!userId) {
      setScoreloginfailModalOpen(true);
      return;
    }

    try {
      //입력한 리뷰를 저장하는 부분
      await AxiosApi.addReview(userId, alcoholName, review);
      //모달로 성공 띄움.
      setReviewsuccessModalOpen(true);
      //입력 후 빈 문자열로 초기화합니다.
      const newReviewInputs = [...reviewInputs];
      newReviewInputs[index] = "";
      setReviewInputs(newReviewInputs);
      //에러 처리 모달
    } catch (error) {
      console.error("Error submitting review:", error);
      setReviewnullfailModalOpen(true);
    }
  };

  //해당 알콜에 맞춰 리뷰들 값을 받아오는 부분
  const otherUserReview = async (index) => {
    const alcoholName = alcohols[index].alcohol_name;
    try {
      // 해당 알콜에 맞춰 리뷰값을 받아옴.
      const response = await AxiosApi.selectReview(alcoholName);
      //받아온 리뷰값들을 저장
      setOtherreviewsave(response.data);
      //리뷰 처리 모달
    } catch (error) {
      console.error("Error Review Upload:", error);
    }
  };

  //해당하는 컴포넌트의 별점을 추가하는 함수.
  const handleScoreButtonClick = async (index, alcoholName) => {
    const userId = sessionStorage.getItem("user_id");
    //해당 컴포넌트의 별점 값.
    const score = scoreChoices[index];
    // Show fail modal로그인 필요
    if (!userId) {
      setScoreloginfailModalOpen(true);

      return;

      // 별점값이 없을 때 모달
    } else if (score === null) {
      setScorenullfailModalOpen(true);
      return;
    }

    try {
      //별점값 저장.
      await AxiosApi.insertScore(userId, alcoholName, score);
      //추가된 별점값을 배열로 저장하는 부분.
      const newSelectedScores = [...selectedScores];
      newSelectedScores[index] = score;
      setSelectedScores(newSelectedScores);

      //입력한 별점의 알콜이름을 저장
      const newSelectedAlcoholNames = [...selectedAlcoholNames];
      newSelectedAlcoholNames[index] = alcoholName;
      setSelectedAlcoholNames(newSelectedAlcoholNames);

      // 값을 렌더링해서 별점값 계산 후 반영 ,등수를 재조정.
      alcoholList();
      setScoreSelectDisabled((prev) => {
        const newState = { ...prev };
        newState[alcoholName] = true;
        return newState;
      });

      // Star animation
      setAnimatingStar(index);
      setTimeout(() => setAnimatingStar(null), 1000); // 1초 후 애니메이션 상태 초기화
      // Score animation
      setAnimatingScore(index);
      setTimeout(() => setAnimatingScore(null), 1000); // 0.6초 후 애니메이션 상태 초기화
    } catch (error) {
      console.error("Error submitting score:", error);
      setScorenullfailModalOpen(true);
    }
  };

  //리뷰창에서 더보기 버튼 이벤트 함수
  const morebtnOnclickEvent = (index) => {
    //해당하는 부분 버튼 클릭 상태 저장
    const updatedMoreBtnClicks = [...morebtnonclick];
    updatedMoreBtnClicks[index] = !updatedMoreBtnClicks[index];
    setMorebtnonclick(updatedMoreBtnClicks);
    // 해당하는 버튼 리뷰만 보여주기위한 상태값 변화
    setMorerestreview(true);
    // 리뷰 값 받아오는 함수 실행
    otherUserReview(index);
  };
  // 리뷰 더보기를 닫는 함수
  const closeOnclickEvent = (index) => {
    // 해당하는 버튼 리뷰 닫기 위한 상태값 변화
    setMorerestreview(false);
    // 리뷰 더보기 버튼 상태를 닫기 위한 상태값 변화
    setMorebtnonclick((prev) => {
      const updatedMoreBtnClicks = [...prev];
      updatedMoreBtnClicks[index] = false;
      return updatedMoreBtnClicks;
    });
  };
  // 모바일 버젼에서 리뷰더보기 버튼 클릭시 이벤트 함수
  const handleMobileBtnClick = (index) => {
    // 모바일 버튼 상태값을 업데이트
    setMobliereviewmore((prev) => {
      const updatedState = [...prev];
      setMobliemorerestreview(true);
      updatedState[index] = true;
      return updatedState;
    });
    toggleItemBoxVisibility(index);
  };
  // 처음 찜 값을 반영하기 위해 찜 테이블에서 값을 받아오는 함수
  const defaultJjim = async (userId) => {
    try {
      const response = await AxiosApi.selectJjim(userId);
      //찜 상태 저장
      setJjimData(response.data);
    } catch (error) {
      console.error("Error fetching jjim data:", error);
    }
  };
  useEffect(() => {
    // 로그인 여부 확인
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      // 처음에 한번 렌더링
      defaultJjim(userId);
    }
  }, []);
  //하트를 눌렀을 때 일어나는 이벤트 함수
  const handleHeartClick = async (index) => {
    // 로그인 여부 확인
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      setScoreloginfailModalOpen(true); // Show fail modal 로그인 필요
      return;
    }

    // 선택한 항목의 알코올 이름 가져오기
    const alcoholName = alcohols[index].alcohol_name;

    try {
      // 이미 즐겨찾기에 있는지 확인
      const isAlreadyJjim = jjimData.some(
        (jjim) => jjim.alcohol_name === alcoholName
      );
      // 찜이 이미 되어있지 않으면
      if (!isAlreadyJjim) {
        // 즐겨찾기에 추가
        await AxiosApi.insertJjim(userId, alcoholName);

        // 즐겨찾기 상태 업데이트
        setJjimData((prevJjimData) => [
          ...prevJjimData,
          { alcohol_name: alcoholName },
        ]);
        // 찜이 이미 되어있으면
      } else {
        // 즐겨찾기에서 제거
        await AxiosApi.deleteJjim(userId, alcoholName);

        // 즐겨찾기 상태 업데이트
        setJjimData((prevJjimData) =>
          prevJjimData.filter((jjim) => jjim.alcohol_name !== alcoholName)
        );
      }
      // bouncing 상태 업데이트
      // 몇번째 찜 아이콘을 bouncing할지 인덱스를 저장.
      setBouncingHeart(index);
      setTimeout(() => setBouncingHeart(null), 1000); // 1초 후 bouncing 상태 초기화
      // 알콜리스트 한번 렌더링
      alcoholList();
    } catch (error) {
      console.error("Error toggling jjim:", error);
      //찜값이 없을때 실패 모달
      setJjimnullfailModalOpen(true);
    }
  };
  const reviewCloseOnclickBtn = (index) => {
    // 모바일 버튼 상태값을 업데이트
    setMobliereviewmore((prev) => {
      const updatedState = [...prev];
      setMobliemorerestreview(false);
      updatedState[index] = false;
      return updatedState;
    });
    toggleItemBoxVisibility(index);
  };
  // isOne이 true인 경우 첫 번째 항목만 반환(마이페이지의 첫번째만 출력하는 부분 때문에)
  const displayedAlcohols =
    isOne && alcohols.length > 0 ? [alcohols[0]] : alcohols;
  return (
    <>
      {displayedAlcohols &&
        displayedAlcohols.map((item, index) => (
          <ItemBox
            key={index}
            //화면에 보여줄지
            buttonvisible={mobliemorerestreview}
            //화면에 정렬하는 부분차이(리스트랑 추천안의 리스트가 다름.)
            itemcenter={itemcenter}
            //숨길지 말지 결정
            hidden={hideFromIndex !== null && index >= hideFromIndex}
          >
            <ImageContainer>
              {/* 이미지 넣기 */}
              <ImageWithFallback alcoholName={item.alcohol_name} />
            </ImageContainer>
            <ItemContext>
              <div className="com">{item.com}</div>
              <div className="name">{item.alcohol_name}</div>
              <div>
                <div className="country_of_origin">
                  {item.country_of_origin}
                </div>
                <div className="abv">{item.abv}%</div>
                <div className="volume">{item.volume}ml</div>
                <div className="price">{item.price}원</div>
              </div>
              <div className="score">
                <AnimatedStar
                  size={20}
                  color="yellow"
                  //애니메이션 추가
                  isAnimating={animatingStar === index}
                />
                <div className="wall">|</div>
                <AnimatedScore
                  //애니메이션 추가
                  isAnimating={animatingScore === index}
                >
                  {item.score}
                </AnimatedScore>

                <ScoreSelect
                  value={scoreChoices[index] || ""}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  //비 활성화 상태정의
                  disabled={
                    scoreSelectDisabled[item.alcohol_name] ||
                    !sessionStorage.getItem("user_id")
                  }
                >
                  <option value="">별점</option>
                  <option value={1}>1점</option>
                  <option value={2}>2점</option>
                  <option value={3}>3점</option>
                  <option value={4}>4점</option>
                  <option value={5}>5점</option>
                </ScoreSelect>
                <ScoreButton
                  onClick={() =>
                    handleScoreButtonClick(index, item.alcohol_name)
                  }
                >
                  선택
                </ScoreButton>
              </div>
              {/* 모바일 버튼 부분 */}
              <HiddenBtn reviewmore={reviewmore}>
                <MoblieBtn
                  onClick={() => {
                    handleMobileBtnClick(index);
                  }}
                >
                  <span>리뷰작성</span>
                </MoblieBtn>
                <FaAnglesDownIcon className="icon" />
              </HiddenBtn>
            </ItemContext>
            <ItemReview
              //리뷰창 보일지 상태 변수
              buttonvisible={morerestreview}
              // 더보기 버튼 상태 변수
              buttonon={morebtnonclick[index]}
              // 모바일 버전 리뷰작성 버튼 상태 변수
              mobliereviewmore={mobliereviewmore[index]}
            >
              <div className="review">
                <div className="reviewText">Review</div>
                <ReviewCloseBtn
                  onClick={() => {
                    reviewCloseOnclickBtn(index);
                  }}
                />
              </div>
              <ReviewValue
                // 화면에 보여줄지 결정하는 상태 변수
                reviewinput={reviewinput}
                // 값 입력 부분
                value={reviewInputs[index]}
                onChange={(e) => handleReviewInputChange(index, e.target.value)}
              />
              {/* 첫번째 리뷰만 보여주기 위한 태그 */}
              <ReviewView firstreview={firstreview}>{item.review}</ReviewView>
              <div className="reviewdiv">
                <ReviewBtn
                  //보여줄지 여부
                  reviewinput={reviewinput}
                  onClick={() => handleReviewSaveClick(index)}
                >
                  입력
                </ReviewBtn>
                <div
                  className="more"
                  onClick={() => morebtnOnclickEvent(index)}
                >
                  더보기
                </div>
              </div>
            </ItemReview>
            <Morebtnreview buttonon={morebtnonclick[index]}>
              <div className="review">Review</div>
              {/* 다른 사람의 리뷰를 보여주는 맵 */}
              {otherreviewsave && otherreviewsave.length > 0 ? (
                otherreviewsave.map((reviewitem) => (
                  <div className="reviewlist">
                    <div className="reviewuser">
                      <span>{reviewitem.user_nick}</span>
                    </div>
                    {/* 리뷰가 존재하는지에 따라 */}
                    <ReviewView isReview={isReview}>
                      {reviewitem.review}
                    </ReviewView>
                  </div>
                ))
              ) : (
                <div className="reviewlist">
                  <ReviewView isReview={isReview}>
                    <p>리뷰가 없습니다.</p>
                  </ReviewView>
                </div>
              )}
              <div className="reviewdiv">
                <div
                  className="close"
                  onClick={() => {
                    closeOnclickEvent(index);
                  }}
                >
                  닫기
                </div>
              </div>
            </Morebtnreview>
            <HeartIcon
              mobliemorerestreview={mobliemorerestreview}
              size="30"
              color={
                jjimData.some((jjim) => jjim.alcohol_name === item.alcohol_name)
                  ? "red"
                  : "rgba(255,255,255,0.4)"
              }
              onClick={() => {
                handleHeartClick(index);
              }}
              bouncing={bouncingHeart === index}
            />
            {/* 별점등록모달(미사용) */}
            <ScoreApi.SuccessModal
              isOpen={scoresuccessModalOpen}
              onClose={handleScoreSuccessCloseModal}
              modalTitle={"별점이 등록되었습니다."}
              modalText={item.score + "점 입력되었습니다."}
            />
            {/* 로그인필요모달 */}
            <ScoreApi.FailModal
              isOpen={scoreloginfailModalOpen}
              onClose={handleScoreLoginFailCloseModal}
              modalTitle={"로그인이 되어 있지 않습니다."}
              modalText={"로그인 페이지로 이동해주세요."}
            />
            {/* 별점등록실패모달 */}
            <ScoreApi.FailModal
              isOpen={scorenullfailModalOpen}
              onClose={handleScoreNullFailCloseModal}
              modalTitle={"별점 등록에 실패했습니다."}
              modalText={"네트워크 상태를 확인하세요."}
            />
            {/* 리뷰등록성공모달 */}
            <ReviewApi.SuccessModal
              isOpen={reviewsuccessModalOpen}
              onClose={handleReviewSuccessCloseModal}
              modalTitle={"리뷰 등록이 완료 되었습니다."}
            />
            {/* 리뷰등록실패모달 */}
            <ReviewApi.FailModal
              isOpen={reviewnullfailModalOpen}
              onClose={handleReviewFailCloseModal}
              modalTitle={"리뷰 등록에 실패했습니다."}
              modalText={"네트워크 상태를 확인하세요."}
            />
            {/* 찜등록실패모달 */}
            <JjimApi.FailModal
              isOpen={jjimnullfailModalOpen}
              onClose={handleJjimFailCloseModal}
              modalTitle={"찜 등록에 실패했습니다."}
              modalText={"네트워크 상태를 확인하세요."}
            />
          </ItemBox>
        ))}
    </>
  );
};
// 술 이미지를 넣기위한 함수
const ImageWithFallback = ({ alcoholName }) => {
  const src = `${process.env.PUBLIC_URL}/alcoholimg/${alcoholName}.jpg`;
  return <ItemImage src={src} />;
};

export default ListItem;
