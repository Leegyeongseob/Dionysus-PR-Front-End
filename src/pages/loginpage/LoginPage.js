//LoginPage.js
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
import styled from "styled-components";
import personIcon from "../../img/loginpageimg/person-icon.png";
import ReCaptchaComponenet from "../../api/RecaptchaAPI";
import AxiosApi from "../../api/AxiosApi";
ReactModal.setAppElement("#root");

const Container = styled.div`
  width: 100%;
  display: flex; /* 부모 요소를 flex container로 설정 */
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin: 0 auto;
`;
const Box = styled.div`
  width: 580px;
  height: 691px;
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
  & img {
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 50px;
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
  & p {
    display: flex;
    justify-self: center;
    align-items: center;
    margin: 5px;
  }
  & .caution {
    position: relative;
    font-size: 15px;
    color: rgba(255, 255, 255, 0.9);
    min-height: 30px;
  }
  & .loginsub a {
    font-size: 18px;
    text-decoration: none; /* 링크의 밑줄 제거 */
    color: rgba(255, 255, 255, 0.9); /* 링크의 색상 제거 */
    margin-bottom: 10px;
  }
  & .loginsub a:nth-child(1) {
    margin-right: 40px;
  }
  &.loginsub a:nth-child(2) {
    margin-right: 5px;
  }
  & .finalCheck {
    width: 200px;
    height: 50px;
    line-height: 50px; /*텍스트 상하정렬*/
    font-size: 20px;
    color: rgba(255, 255, 255, 0.9);
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    margin-top: 40px;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    width: 400px;
    height: 480px;
    transition: 0.5s;
    img {
      width: 100px;
      height: 100px;
      margin-bottom: 40px;
      transition: 0.5s;
    }

    input {
      width: 60%;
      height: 30px;
      font-size: 16px;
      margin-bottom: 15px;
      transition: 0.5s;
    }

    input::placeholder {
      font-size: 16px;
    }

    .caution,
    .loginsub a {
      font-size: 16 px;
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [caution, setCaution] = useState("");
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [FailModalOpen, setFailModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();
  const handleSuccessCloseModal = () => {
    //모달 닫은 이후 핸들링
    setSuccessModalOpen(false);
    navigate("/");
  };
  const handleFailCloseModal = () => {
    setFailModalOpen(false);
  };
  const [captchaValue, setCaptchaValue] = useState(""); // recaptcha 토큰을 저장하기 위한 state
  const [captchaVerified, setCaptchaVerified] = useState(false); // reCAPTCHA 인증 상태
  const API_KEY = "6LcK--gpAAAAACjHDaPDC1j6X8H4jbap0sYP7HVe"; // 사이트키 등록

  useEffect(() => {
    checkInputs(email, password);
  }, [email, password]);

  const checkInputs = (inputEmail, inputPassword) => {
    if (inputEmail !== "" && inputPassword.length > 3) {
      setCaution("확인되었습니다.");
    } else {
      setCaution("값을 입력하세요.");
    }
  };

  const handleLogin = async () => {
    // 로그인 버튼클릭 이후 구현부분
    if (caution === "확인되었습니다.") {
      try {
        const response = await AxiosApi.login(email, password);
        // Handle success.
        const user = response.data[0];
        if (user) {
          sessionStorage.setItem("user_id", user.user_id);
          sessionStorage.setItem("user_pw", user.user_pw);
          sessionStorage.setItem("user_name", user.user_name);
          sessionStorage.setItem("user_jumin", user.user_jumin);
          sessionStorage.setItem("user_nick", user.user_nick);
          sessionStorage.setItem("user_phone", user.user_phone);
          sessionStorage.setItem("user_address", user.user_address);
          console.log(user);
          setSuccessModalOpen(true); // Show success modal
        } else {
          // 서버의 응답을 줬지만 성공이 아닌 경우
          setFailModalOpen(true);
        }
      } catch (error) {
        if (error.response) {
          // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
          switch (error.response.status) {
            case 400:
              setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
              break;
            case 401:
              setModalContent(
                <>
                  인증에 실패했습니다.
                  <br />
                  이메일 또는 비밀번호를 확인해주세요.
                </>
              );
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
    }
  };
  const handleCaptchaVerify = (value) => {
    setCaptchaValue(value);
    setCaptchaVerified(true);
  };
  return (
    <Container>
      <Box>
        <img src={personIcon} />
        <input
          id="email"
          type="email"
          placeholder="📧   Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔑   Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div id="caution" className="caution">
          {caution}
        </div>
        <p className="loginsub">
          <Link to="/signup">Sign up</Link>
          <Link to="/findid">Find ID /</Link>
          <Link to="/findpw">Password</Link>
        </p>
        <ReCaptchaComponenet onVerify={handleCaptchaVerify} />
        <div
          className="finalCheck"
          onClick={
            caution === "확인되었습니다." && captchaVerified
              ? handleLogin
              : null
          }
          style={{
            backgroundColor:
              caution === "확인되었습니다." && captchaVerified
                ? "rgba(0, 0, 0, 0.6)"
                : "grey",
            disable:
              caution === "확인되었습니다." && captchaVerified
                ? "false"
                : "true",
          }}
        >
          Login
        </div>
      </Box>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"로그인 성공"}
        modalText={""}
      />
      <ModalApi.FailModal
        isOpen={FailModalOpen}
        onClose={handleFailCloseModal}
        modalTitle={"로그인 실패"}
        modalText={modalContent}
      />
    </Container>
  );
};

export default LoginPage;
