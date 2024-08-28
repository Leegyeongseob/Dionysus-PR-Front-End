import { createContext, useState, useEffect } from "react";
import firstBackground from "../img/mainpageimg/background/all.webp";
//useContext 생성.
export const UserContext = createContext(null);

const UserStore = (props) => {
  //변경하는 이미지 값을 저장.(초기값을 local에 저장된 값으로)
  const [bgimgurl, setBgimgurl] = useState(localStorage.getItem("bgimg"));
  //아이디 로그인 했을 때 저장(세션을 써서 사용안함.) - 세션 발견 전 부분은 사용함.
  const [userid, setUserid] = useState(localStorage.getItem("user_id") || "");
  // 프로필 이미지 url 저장 목적(세션을 써서 사용안함.)
  const [profileimg, setProfileimg] = useState(
    localStorage.getItem("pfimg") || "이미지 없음"
  );
  // 벡엔드에 쿼리문을 쓰기 위한 카테고리 저장(백그라운드 이미지 바꿀때도 사용.)
  const [category, setCategory] = useState(
    localStorage.getItem("category") || "all"
  );
  //값이 변할 때 해당되는 부분만 렌더링
  useEffect(() => {
    localStorage.setItem("bgimg", bgimgurl);
  }, [bgimgurl]);
  //값이 변할 때 해당되는 부분만 렌더링
  useEffect(() => {
    localStorage.setItem("user_id", userid);
  }, [userid]);
  //값이 변할 때 해당되는 부분만 렌더링
  useEffect(() => {
    localStorage.setItem("pfimg", profileimg);
  }, [profileimg]);
  //값이 변할 때 해당되는 부분만 렌더링
  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);
  return (
    //값들을 밖으로 내보내기 위한 부분(Provider로 감싸서 내보냄.)
    <UserContext.Provider
      value={{
        bgimgurl,
        setBgimgurl,
        userid,
        setUserid,
        profileimg,
        setProfileimg,
        category,
        setCategory,
      }}
    >
      {/* 하위 컴포넌트들이 사용할 수 있도록 */}
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
