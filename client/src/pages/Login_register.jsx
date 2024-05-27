import { Avatar, TextField } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
const Login_register = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    avatar: {},
    password: "",
    cPassword: "",
  });

  // Onchange Handaler Start =================>>>>>>>>>>>>>>>>>>>>

  const registerOnChangeHandeler = (e) => {
    if (e.target.name == "avatar") {
      setRegisterData((prev) => {
        return { ...prev, avatar: e.target.files[0] };
      });
    } else {
      setRegisterData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const loginOnChangeHandeler = (e) => {
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  // Onchange Handaler End =================>>>>>>>>>>>>>>>>>>>>

  // Submit Handaler Start =================>>>>>>>>>>>>>>>>>>>>

  const loginSubmitHandaler = (e) => {
    e.preventDefault();
    console.log(loginData);
  };
  const RegisterSubmitHandaler = (e) => {
    e.preventDefault();
    console.log(registerData);

    toast.error("Error");
  };

  // Submit Handaler End =================>>>>>>>>>>>>>>>>>>>>
  return (
    <div className="login_register">
      {isLogin ? (
        <div className="form">
          <div className="head">
            <div className="logo">
              <h2>Shashikant</h2>
              <p>Whats's App Clone</p>
            </div>

            <h3>Login Here</h3>
          </div>
          <form className="join_chat" onSubmit={loginSubmitHandaler}>
            <div className="input">
              <label htmlFor="room_id">Enter Your Email</label>
              <input
                type="text"
                id="room_id"
                placeholder="Email"
                name="email"
                required={true}
                onChange={loginOnChangeHandeler}
                value={loginData.email}
                autoComplete={"off"}
              />
            </div>
            <div className="input">
              <label htmlFor="user_name">Enter Your Password</label>
              <input
                type="password"
                id="user_name"
                placeholder="Password"
                name="password"
                required={true}
                onChange={loginOnChangeHandeler}
                value={loginData.password}
                autoComplete={"off"}
              />
            </div>

            <div className="join">
              <button type="submit" className="fill_btn">
                Login Now
              </button>
            </div>
          </form>

          <div className="message">
            <p>You Can Create Account</p>
            <button className="text_btn" onClick={() => setIsLogin(false)}>
              Click Here
            </button>
          </div>
        </div>
      ) : (
        <div className="form">
          <div className="head">
            <div className="logo">
              <h2>Shashikant</h2>
              <p>Whats's App Clone</p>
            </div>

            <h3>Register Here</h3>
          </div>
          <form className="join_chat" onSubmit={RegisterSubmitHandaler}>
            <div className="input">
              <label htmlFor="profile" className="profile">
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  variant="circular"
                  src={
                    registerData.avatar.name
                      ? URL.createObjectURL(registerData.avatar)
                      : ""
                  }
                />
              </label>
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                id="profile"
                name="avatar"
                onChange={registerOnChangeHandeler}
                // value={registerData.avatar}
                style={{ display: "none" }}
              />
            </div>
            <div className="input">
              <label htmlFor="room_id">Enter Your Name</label>
              <input
                type="text"
                id="room_id"
                placeholder="Name"
                name="name"
                onChange={registerOnChangeHandeler}
                value={registerData.name}
                required={true}
              />
            </div>
            <div className="input">
              <label htmlFor="user_name">Enter Your Email</label>
              <input
                type="text"
                id="user_name"
                placeholder="Email"
                name="email"
                onChange={registerOnChangeHandeler}
                value={registerData.email}
                required={true}
              />
            </div>
            <div className="input">
              <label htmlFor="user_name">Enter Your Password</label>
              <input
                type="text"
                id="user_name"
                placeholder="Password"
                name="password"
                onChange={registerOnChangeHandeler}
                value={registerData.password}
                required={true}
              />
            </div>
            <div className="input">
              <label htmlFor="user_name">Enter Your Confirm Password</label>
              <input
                type="text"
                id="user_name"
                placeholder="Confirm Password"
                name="cPassword"
                onChange={registerOnChangeHandeler}
                value={registerData.cPassword}
                required={true}
              />
            </div>

            <div className="join">
              <button type="submit" className="fill_btn">
                Register Now
              </button>
            </div>
          </form>

          <div className="message">
            <p>You Have Account</p>
            <button className="text_btn" onClick={() => setIsLogin(true)}>
              Click Here
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login_register;
