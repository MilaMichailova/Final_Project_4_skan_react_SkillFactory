import { useStore } from "../Store";
import { action } from "mobx";
import { FormEvent } from "react";
import { observer, useLocalObservable } from "mobx-react-lite";
import axios from "axios";
import { UserToken } from "../User/UserToken";
import { useNavigate } from "react-router-dom";
import loginWithGoogle from "../asets/images/login-with-google.svg";
import loginWithFacebook from "../asets/images/login-with-facebook.svg";
import loginWithYandex from "../asets/images/login-with-yandex.svg";
import imgPeopleLogin from "../asets/images/people-go-to-login.svg";
import imgProtected from "../asets/images/protected.svg";

const apiUrl = "https://gateway.scan-interfax.ru";

const AuthenticationForm = () => {
  const { userStore } = useStore();
  const navigate = useNavigate();

  const loginForm = useLocalObservable(() => ({
    login: "",
    password: "",
    setValue(key: "login" | "password", value: string) {
      loginForm[key] = value.trim();
    },
    get hasError() {
      return !this.login.trim() || !this.password.trim();
    },
  }));

  const authenticateUser = action((e: FormEvent) => {
    e.preventDefault();

    const loginUserInfo = {
      login: loginForm.login,
      password: loginForm.password,
    };

    axios
      .post(`${apiUrl}/api/v1/account/login`, loginUserInfo)
      .then((response) => {
        userStore.setUserToken({
          accessToken: response.data.accessToken,
          expire: response.data.expire,
        } as UserToken);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="mainWrapper">
      <div className="leftPartRegister">
        <h1 className="primaryTitle">
          Для оформления подписки на тариф, необходимо авторизоваться.
        </h1>
        <img
          className="imgPeopleLogin"
          src={imgPeopleLogin}
          alt="people go to login"
        ></img>
      </div>
      <div className="rightPartRegister">
        <img className="imgProtected" src={imgProtected} alt="protected"></img>
        <form className="loginForm" onSubmit={authenticateUser}>
          <div className="loginFormWrapper">
            <div className="buttonsBlockWrapper">
              <button className="primaryButton lightButton formLightButtonLogin">
                Войти
              </button>
              <button className="primaryButton lightButton formLightButtonRegist">
                Зарегистрироваться
              </button>
            </div>
            <label className="formLable">
              Логин или номер телефона:
              <input
                onChange={(event) =>
                  loginForm.setValue("login", event.target.value)
                }
                className="forminput"
                name="login"
                id="login"
                type="text"
              ></input>
            </label>
            <label className="formLable">
              {" "}
              Пароль:
              <input
                className="forminput"
                name="password"
                id="password"
                type="text"
                onChange={(event) =>
                  loginForm.setValue("password", event.target.value)
                }
              ></input>
            </label>
            {loginForm.hasError ? (
              <span className="error">Заполните все поля</span>
            ) : null}
            <button
              className="primaryButton secondsryButton"
              type="submit"
              disabled={loginForm.hasError}
            >
              Войти
            </button>
            <button className="blueButton primaryButton lightButton ">
              Восстановить пароль
            </button>
            <div className="loginAddwrapper">
              <div className="loginAddTitle">Войти через:</div>
              <div className="loginAddButtonsWrapper">
                <button className="imgButton">
                  <img src={loginWithGoogle} alt="login with google"></img>
                </button>
                <button className="imgButton">
                  <img src={loginWithFacebook} alt="login with facebook"></img>
                </button>
                <button className="imgButton">
                  <img src={loginWithYandex} alt="login with yandex"></img>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(AuthenticationForm);
