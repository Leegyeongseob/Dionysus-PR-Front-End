import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BackButton from "./BackButton";
import AxiosApi from "../../api/AxiosApi";
import { documentId } from "firebase/firestore";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");
//스타일 부분
const Container = styled.div`
  width: 100%;
  display: flex; /* 부모 요소를 flex container로 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto;
`;
const Box = styled.div`
  width: 580px;
  height: 100%;
  padding: 20px;
  display: flex; /* 자식 요소들을 flex container로 설정 */
  flex-direction: column; /* 자식 요소들을 세로 방향으로 배열 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  text-align: center;
  background: conic-gradient(
    rgba(82, 1, 32, 0.6) 0%,
    rgba(150, 43, 9, 0.6) 20%,
    rgba(181, 113, 20, 0.6) 40%,
    rgba(8, 64, 62, 0.6) 60%,
    rgba(112, 101, 19, 0.6) 80%,
    rgba(82, 1, 32, 0.6) 100%
  );
  border-radius: 10px;

  & .title {
    font-size: 25px;
    color: white;
    margin: 50px 0 20px 0;
  }

  & input {
    width: 60%;
    height: 40px;
    font-size: 20px;
    text-align: left;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 20px;
    padding-left: 30px;
    margin-bottom: 30px; /* 원하는 마진 값으로 설정 */
  }
  & input::placeholder {
    font-size: 20px;
    color: rgb(250, 250, 250);
    padding-left: 0;
  }
  & #hint {
    position: relative;
    width: 1000px;
    color: #999;
    bottom: 3vh;
    display: flex;
    justify-content: center;
  }
  & .success {
    position: absolute;
    left: 660px;
    bottom: 5px;
    font-size: 30px;
  }
  & .error {
    position: absolute;
    width: auto;
    font-size: 12px;
    font-weight: bold;
    color: rgb(255, 255, 255);
  }
  & .finalCheck {
    width: 200px;
    height: 50px;
    line-height: 50px; /*텍스트 상하정렬*/
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 400px;
    height: 480px;
    transition: 0.5s;
    .title {
      font-size: 25px;
      transition: 0.5s;
    }
    input {
      width: 60%;
      height: 30px;
      font-size: 16px;
      margin-bottom: 10px;
      transition: 0.5s;
      padding-left: 12px;
    }

    input::placeholder {
      font-size: 16px;
      transition: 0.5s;
    }
    #hint {
      margin-top: 4px;
    }
    .error {
      margin-top: 15px;
      font-size: 8px;
    }
    .success {
      left: 608px;
      bottom: -12px;
      font-size: 22px;
    }

    .finalCheck {
      width: 150px;
      height: 40px;
      line-height: 36px;
      font-size: 16px;
      margin-top: 5px;
      transition: 0.5s;
    }
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  //입력단
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 유효성 검사단 (이메일, 주민등록 외 다른 입력값은 미입력 유무만 확인)
  const [isEmail, setIsEmail] = useState(false); //이메일 중복확인 후 상태반환
  const [isPassword, setIsPassword] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isJumin, setIsJumin] = useState(false); // 주민번호 중복확인 후 결과 반환
  const [isNickName, setIsNickName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  // 오류 메시지
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [juminError, setJuminError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  //모달 상태
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [FailModalOpen, setFailModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleSuccessCloseModal = () => {
    //모달 닫은 이후 핸들링
    setSuccessModalOpen(false);
    navigate("/login");
  };
  const handleFailCloseModal = () => {
    setFailModalOpen(false);
  };

  // 회원 가입 여부 DB 확인
  const memberRegCheck = async (email) => {
    try {
      const resp = await AxiosApi.memberRegCheck(email);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if (resp.data) {
        setEmailError("✔️");
        setIsEmail(true);
      } else {
        setEmailError("중복된 이메일 입니다.");
        setIsEmail(false);
      }
    } catch (error) {
      setPasswordError("네트워크 오류입니다. 잠시후 다시 시도해주세요.");
    }
  };
  // 주민등록번호 DB 등록여부 확인
  const juminRegCheck = async (jumin) => {
    try {
      const resp = await AxiosApi.juminRegCheck(jumin);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if (resp.data) {
        setJuminError("✔️");
        setIsJumin(true);
      } else {
        setJuminError("이미 가입된 주민등록번호 입니다.");
        setIsJumin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 오류메시지 로직 단
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 이메일 입력 정규식
    if (!emailRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailError("✔️");
      setIsEmail(true);
      memberRegCheck(e.target.value); //DB에 중복 이메일 확인
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /^[A-Za-z0-9]{6,10}$/;
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "비밀번호 형식이 올바르지 않습니다. (숫자, 영어 조합 6-10자리 이하)"
      );
      setIsPassword(false);
    } else {
      setPasswordError("✔️");
      setIsPassword(true);
    }
  };
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    setIsUserName(true);
  };
  const onChangeJumin = (e) => {
    setJumin(e.target.value);
    const juminRegex = /^\d{13}$/; // 주민등록번호 입력 정규식
    if (!juminRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setJuminError("입력값이 올바르지 않습니다.(- 없이 숫자 13자리)");
      setIsJumin(false);
    } else {
      setJuminError("✔️");
      setIsJumin(true);
      juminRegCheck(e.target.value); //DB에 중복 주민등록번호 확인
    }
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    setIsNickName(true);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError("입력값이 올바르지 않습니다.(-)없이 입력");
      setIsPhone(false);
    } else {
      setPhoneError("✔️");
      setIsPhone(true);
    }
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
    setIsAddress(true);
  };
  const regist = async () => {
    // 가입버튼 클릭시 이벤트 처리
    if (
      isEmail &&
      isPassword &&
      isUserName &&
      isJumin &&
      isNickName &&
      isPhone &&
      isAddress
    ) {
      try {
        const response = await AxiosApi.signup(
          email,
          password,
          userName,
          jumin,
          nickName,
          phone,
          address
        );
        if (response.status === 200) {
          setModalContent("회원가입이 완료되었습니다!");
          setSuccessModalOpen(true);
        }
      } catch (error) {
        if (error.response) {
          // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
          switch (error.response.status) {
            case 400:
              setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
              break;
            case 401:
              <>
                인증에 실패했습니다.
                <br />
                이메일 또는 비밀번호를 확인해주세요.
              </>;
              console.log();
              break;
            case 403:
              setModalContent("접근 권한이 없습니다.");
              break;
            case 404:
              setModalContent("서버를 찾을 수 없습니다.");
              break;
            case 500:
              setModalContent(
                "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
              );
              break;
            default:
              setModalContent(
                `오류가 발생했습니다: ${error.response.statusText}`
              );
          }
        } else if (error.request) {
          // 요청이 서버에 도달하지 못한 경우 (네트워크 오류 등)
          setModalContent("서버가 응답하지 않습니다.");
        } else {
          // 요청을 설정하는 중에 오류가 발생한 경우
          setModalContent(`오류가 발생했습니다: ${error.message}`);
        }
        setFailModalOpen(true);
      }
    } else {
      setModalContent("모든 필드를 올바르게 입력해주세요.");
      setFailModalOpen(true);
    }
  };
  // 모든 필드의 유효성 검사를 통과했는지 확인
  const isFormValid =
    isEmail &&
    isPassword &&
    isUserName &&
    isJumin &&
    isNickName &&
    isPhone &&
    isAddress;

  return (
    <Container>
      <Box>
        <BackButton />
        <p className="title">회원가입</p>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <span id="hint">
          {email.length > 0 && (
            <span className={isEmail ? "success" : "error"}>{emailError}</span>
          )}
        </span>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <span id="hint">
          {password.length > 0 && (
            <span className={isPassword ? "success" : "error"}>
              {passwordError}
            </span>
          )}
        </span>
        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={onChangeUserName}
        />
        <div></div>
        <input
          type="text"
          placeholder="주민등록번호"
          value={jumin}
          onChange={onChangeJumin}
        />
        <span id="hint">
          {jumin.length > 0 && (
            <span className={isJumin ? "success" : "error"}>{juminError}</span>
          )}
        </span>
        <input
          type="text"
          placeholder="닉네임"
          id="nickNameVaildation"
          value={nickName}
          onChange={onChangeNickName}
        />
        <input
          type="text"
          placeholder="핸드폰 번호"
          id=""
          value={phone}
          onChange={onChangePhone}
        />
        <span id="hint">
          {phone.length > 0 && (
            <span className={isPhone ? "success" : "error"}>{phoneError}</span>
          )}
        </span>
        <input
          type="text"
          placeholder="주소"
          id=""
          value={address}
          onChange={onChangeAddress}
        />
        <span id="hint">
          {address.length > 0 && (
            <span className={isAddress ? "success" : "error"}>
              {addressError}
            </span>
          )}
        </span>
        <div
          className="finalCheck"
          style={{
            disable: isFormValid ? "false" : "true",
            backgroundColor: isFormValid ? "rgba(0, 0, 0, 0.6)" : "grey",
          }}
          onClick={isFormValid ? regist : null}
        >
          가입
        </div>
      </Box>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"회원가입 완료"}
        modalText={""}
      />
      <ModalApi.FailModal
        isOpen={FailModalOpen}
        onClose={handleFailCloseModal}
        modalTitle={"회원가입 실패"}
        modalText={modalContent}
      />
    </Container>
  );
};

export default SignupPage;
