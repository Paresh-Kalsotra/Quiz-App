import React, { useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const server_uri = import.meta.env.VITE_SERVER_URI;

const signupState = {
  userName: "",
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return { ...state, [action.name]: action.value };
    default:
      return state;
  }
};

function SignupPage() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, signupState);

  const handleChange = (e) => {
    dispatch({ type: "CHANGE", name: e.target.name, value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(server_uri + "/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    });

    let res_message = await response.json();

    if (res_message === "User Authenticated") {
      navigate("/home");
    } else {
      setMessage(res_message);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10vh" }}>
        Welcome to Quiz App
      </h1>
      <div className="login-box">
        <h1>Sign Up </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            value={state.userName}
            onChange={handleChange}
            placeholder="Enter UserName"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Enter Email"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
          <br />
          <button type="submit">Submit</button>
        </form>

        <p className="message">{message}</p>
        <p>
          Already a User? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
