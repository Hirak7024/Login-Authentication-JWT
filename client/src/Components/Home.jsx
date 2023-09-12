import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8000/user/",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/login");
  };
  return (
    <>
      <div className="home_page" style={{display:'flex',flexDirection:'column', alignItems:'center', marginTop:'5rem'}}>
        <h1>{" "}Welcome <span>{username}</span></h1>
        <button onClick={Logout}  style={{width:'100px', height: '40px', border :'none', backgroundColor:'#2234AE', color:'white', fontSize:'15px', fontWeight:'600', cursor:'pointer'}}>
          LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;