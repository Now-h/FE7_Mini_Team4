import React, { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import "../styles/pages/login.css";
import axios from "axios";
import { useLoginStore } from "../store/loginStore";
import Toast from "../components/Toast";
import Loading2 from "../components/Loading2";

const Login = ({ close, ...props }) => {
  const { setLogin, setUserInfo } = useLoginStore();
  const navigate = useNavigate();
  const [isLoading2, setIsLoading2] = useState(false);

  // 로그인 상태
  const [isTab, setIsTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginToast, setLoginToast] = useState(false);

  // 회원가입 상태
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerToast, setRegisterToast] = useState(false);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const handleTab = (tab) => {
    setIsTab(tab);
  };

  const handleCart = () => {
    close();
    navigate("/findaccount");
  };

  const handleLoginEmail = (value) => {
    setLoginEmail(value);
  };

  const handleLoginPassword = (value) => {
    setLoginPassword(value);
  };
  const handleName = (value) => {
    setName(value);
  };
  const handleRegisterEmail = (value) => {
    setRegisterEmail(value);
  };

  const handleBirthYear = (value) => {
    setBirthYear(value);
  };

  const handleBirthMonth = (value) => {
    setBirthMonth(value);
  };

  const handleBirthDay = (value) => {
    setBirthDay(value);
  };

  const handleRegisterPassword = (value) => {
    setRegisterPassword(value);
  };

  const handleConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  // 로그인 로직
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading2(true);
    try {
      const response = await axios.post(
        "http://52.78.12.252:8080/api/members/login",
        {
          email: loginEmail,
          password: loginPassword,
        }
      );

      const result = response.data.result;
      const accessToken = result.access_token;

      if (result && accessToken) {
        localStorage.setItem("token", accessToken);
        setLogin(true);
        setUserInfo(result, accessToken);
        navigate("/");
        close();
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setLoginError(
              "이메일 혹은 비밀번호가 정확하지 않습니다. 다시 입력해 주세요."
            );
            break;
          default:
            setLoginError("로그인 중 예기치 않은 오류가 발생했습니다.");
        }
      } else {
        setLoginError(
          "서버에 접속할 수 없습니다. 네트워크 상태를 확인해 주세요."
        );
      }
      setLoginToast(true);
      console.log("Login failed", error);
    } finally {
      setIsLoading2(false);
    }
  };

  // 회원가입 로직
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading2(true);
    if (registerPassword !== confirmPassword) {
      setRegisterError("비밀번호가 일치하지 않습니다.");
      setRegisterToast(true);
      setIsLoading2(false);
      return;
    }
    const requestData = {
      name,
      email: registerEmail,
      birth: `${birthYear}${birthMonth}${birthDay}`,
      password: registerPassword,
    };

    try {
      //TODO: 추후 URL 확인 필요
      const response = await axios.post(
        "http://52.78.12.252:8080/api/members/join",
        requestData
      );
      navigate("/");
      resetRegisterForm();
      close();
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          default:
            setRegisterError("회원가입 중 예기치 않은 오류가 발생했습니다.");
        }
      } else {
        setRegisterError(
          "서버에 접속할 수 없습니다. 네트워크 상태를 확인해 주세요."
        );
      }
      setRegisterToast(true);
      console.log("Register failed", error);
    } finally {
      setIsLoading2(false);
    }
  };

  const resetRegisterForm = () => {
    setName("");
    setRegisterEmail("");
    setBirthYear("");
    setBirthMonth("");
    setBirthDay("");
    setRegisterPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <nav>
        <ul className="tab">
          <li>
            <button
              className={isTab === "login" ? "--active" : ""}
              onClick={() => handleTab("login")}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className={isTab === "register" ? "--active" : ""}
              onClick={() => handleTab("register")}
            >
              Register
            </button>
          </li>
        </ul>
      </nav>
      {isTab === "login" && (
        <>
          <form className="login-form relative" onSubmit={handleLogin}>
            {isLoading2 && <Loading2 />}
            <div>
              이메일
              <Input
                type="email"
                required
                value={loginEmail}
                onChange={handleLoginEmail}
              />
            </div>
            <div>
              비밀번호
              <Input
                type="password"
                required
                value={loginPassword}
                onChange={handleLoginPassword}
              />
            </div>
            <button type="submit" className="btn-blue xl2">
              Sign In
            </button>
          </form>
          <div className="btn-login">
            <button to="/findaccount" onClick={handleCart}>
              비밀번호를 잊으셨나요?
            </button>
          </div>
          <Toast
            color={"red"}
            onOpen={loginToast}
            onClose={() => setLoginToast(false)}
          >
            {loginError}
          </Toast>
        </>
      )}
      {isTab === "register" && (
        <>
          <form className="login-form relative" onSubmit={handleRegister}>
            {isLoading2 && <Loading2 />}
            <div>
              이름
              <Input type="text" required value={name} onChange={handleName} />
            </div>
            <div>
              이메일
              <Input
                type="email"
                required
                value={registerEmail}
                onChange={handleRegisterEmail}
              />
            </div>
            <div>
              생년월일
              <div className="birth">
                <Input
                  type="number"
                  placeholder="YYYY"
                  required
                  value={birthYear}
                  onChange={handleBirthYear}
                />
                년
                <Input
                  type="number"
                  placeholder="MM"
                  required
                  value={birthMonth}
                  onChange={handleBirthMonth}
                />
                월
                <Input
                  type="number"
                  placeholder="DD"
                  required
                  value={birthDay}
                  onChange={handleBirthDay}
                />
                일
              </div>
            </div>
            <div>
              비밀번호
              <Input
                type="password"
                required
                value={registerPassword}
                onChange={handleRegisterPassword}
              />
            </div>
            <div>
              비밀번호 확인
              <Input
                type="password"
                required
                value={confirmPassword}
                onChange={handleConfirmPassword}
              />
            </div>
            <button type="submit" className="btn-blue xl2">
              Sign Up
            </button>
          </form>
          <Toast
            color={"red"}
            onOpen={registerToast}
            onClose={() => setRegisterToast(false)}
          >
            {registerError}
          </Toast>
        </>
      )}
    </>
  );
};

export default Login;
