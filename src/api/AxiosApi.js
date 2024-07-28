import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {
  // 로그인
  login: async (email, password)=> {
    return await axios.post(
      DOMAIN +`/users/login`, {
        USER_ID: email,
        USER_PW: password,
      }
    )
  },
  //회원가입
  signup: async (email, password, userName, jumin, nickName, phone, address)=>{
    return await axios.post(
      DOMAIN +`/users/signup`, {
        user_id: email,
        user_pw: password,
        user_name: userName,
        user_jumin: jumin,
        user_nick: nickName,
        user_phone: phone,
        user_address: address,
      }
    )
  },
  // 회원 가입 여부 확인
  memberRegCheck: async (email) => {
    return await axios.get(DOMAIN + `/users/check?USER_ID=${email}`);
  },
  // 주민등록 DB 조회
  juminRegCheck: async (jumin) => {
    return await axios.get(DOMAIN + `/users/jumin-check?USER_JUMIN=${jumin}`);
  },
  // 아이디 찾기
  findIdResult: async (userName, jumin) => {
    try {
      const response = await axios.get(`${DOMAIN}/users/findid`, {
        //보안성을 위해 params 도입 gtp추천
        params: {
          user_name: userName,
          user_jumin: jumin,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  },
  // 비밀번호 찾기
  findPwResult: async (email, userName, jumin) => {
    try {
      const response = await axios.get(`${DOMAIN}/users/findpw`, {
        //보안성을 위해 params 도입 gtp추천
        params: {
          user_id: email,
          user_name: userName,
          user_jumin: jumin,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      throw error;
    }
  },
  // 개별 회원 조회
  memberSelect: async (user_id) => {
    const member = {
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/memberselect", member);
  },
  // 회원 정보 수정
  memberUpdate: async (
    user_pw,
    user_name,
    user_nick,
    user_phone,
    user_address,
    user_id
  ) => {
    const member = {
      user_pw: user_pw,
      user_name: user_name,
      user_nick: user_nick,
      user_phone: user_phone,
      user_address: user_address,
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/memberupdate", member);
  },
  // 이름 주민번호 체크
  memberCheck: async (user_name, user_jumin) => {
    const member = {
      user_name: user_name,
      user_jumin: user_jumin,
    };
    return await axios.post(DOMAIN + "/mypage/memcheck", member);
  },
  // 회원정보 삭제
  memberDelete: async (user_name, user_jumin) => {
    const member = {
      user_name: user_name,
      user_jumin: user_jumin,
    };
    return await axios.post(DOMAIN + "/mypage/memberdel", member);
  },
  //MyPage 찜 목록 불러오기
  jjimAlcohol: async (user_id) => {
    const member = {
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/jjimalcohollist", member);
  },
  // 별점 계산
  calScore: async (alcohol_name) => {
    const alcohol = {
      alcohol_name: alcohol_name,
    };
    return await axios.post(DOMAIN + "/mypage/mypagescore", alcohol);
  },
  // 찜에 있는 리뷰
  jjimReview: async (alcohol_name) => {
    const alcohol = {
      alcohol_name: alcohol_name,
    };
    return await axios.post(DOMAIN + "/mypage/jjimalcoholreview", alcohol);
  },

  //Mypage에서 리뷰 목록 불러오는 부분
  alcoholreviewlist: async (user_id) => {
    const member = {
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/alcoholreviewlist", member);
  },
  // 알콜 카테고리 불러오기
  // all은 전체 알콜정보, 아니면 개별 알콜정보 orderBy를 통해서 sort해서 넘어옴, 사용함.
  alcoholSelect: async (category, sortBy) => {
    try {
      return await axios.get(
        DOMAIN + `/alcohol/selectalcohol?category=${category}&sortBy=${sortBy}`
      );
    } catch (error) {
      console.error("Error select alcohol", error);
      throw error;
    }
  },
  //input으로 알콜명 검색하면 해당되는 내용 select, 사용함.
  searchAlcohols: async (category, searchTerm) => {
    try {
      return await axios.get(
        `${DOMAIN}/search/selectsearch?category=${category}&searchTerm=${searchTerm}`
      );
    } catch (error) {
      console.error("Error searching alcohols:", error);
      throw error;
    }
  },
  //태그 값으로 추천 리스트를 받아옴.
  selectpopular: async (tag) => {
    try {
      return await axios.get(`${DOMAIN}/popular/selectpopular?tag=${tag}`);
    } catch (error) {
      console.error("Error selecting review", error);
      throw error;
    }
  },
  //다른사람의 리뷰 받아오는 리스트
  selectReview: async (alcohol_name) => {
    try {
      return await axios.get(
        `${DOMAIN}/review/selectreview?alcohol_name=${alcohol_name}`
      );
    } catch (error) {
      console.error("Error selecting review", error);
      throw error;
    }
  },
  //테이블에 review값을 넘김.
  addReview: async (user_id, alcohol_name, review) => {
    try {
      const addreview = {
        user_id: user_id,
        alcohol_name: alcohol_name,
        review: review,
      };
      return await axios.post(`${DOMAIN}/review/insertreview`, addreview);
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },
  //별점 테이블에 값을 추가하는 부분
  insertScore: async (user_id, alcoholName, score) => {
    const scoreinfo = {
      user_id: user_id,
      alcohol_name: alcoholName,
      score: score,
    };
    return axios.put(`${DOMAIN}/score/insertscore`, scoreinfo);
  },
  //찜 데이터 가져오기
  selectJjim: async (user_id) => {
    return axios.get(`${DOMAIN}/jjim/selectjjim?user_id=${user_id}`);
  },
  //찜한 값을 DB에 추가
  insertJjim: async (user_id, alcohol_name) => {
    const insertJjim = {
      user_id: user_id,
      alcohol_name: alcohol_name,
    };
    return axios.post(`${DOMAIN}/jjim/insertjjim`, insertJjim);
  },
  //찜한 값을 DB에서 삭제
  deleteJjim: async (user_id, alcohol_name) => {
    const deletejjim = {
      user_id: user_id,
      alcohol_name: alcohol_name,
    };
    return axios.post(`${DOMAIN}/jjim/deletejjim`, deletejjim);
  },
};

export default AxiosApi;
