import { useContext, useEffect } from "react";
import Header from "./Header";
import VideoBackground from "./VideoBackground";
import firstbackground from "../../img/mainpageimg/background/all.webp";
import { UserContext } from "../../global/UserStore";
const MainPage = ({ hidden, backheight }) => {
  const { bgimgurl, setBgimgurl } = useContext(UserContext);
  useEffect(() => {
    if (bgimgurl === "null") {
      setBgimgurl(firstbackground);
    }
  }, []);
  return (
    <VideoBackground>
      <Header />
    </VideoBackground>
  );
};
export default MainPage;
