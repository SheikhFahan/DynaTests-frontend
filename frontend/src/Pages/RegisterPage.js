import axios from "axios";
import { controllers } from "chart.js";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../Components/ButtonComp";

const RegisterPage = () => {
  let [userData, setUserData] = useState({
    email: "",
    username: "",
    password1: "",
    password2: "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [baseURL, setBaseURL] = useState(
    `${process.env.REACT_APP_DEP_URL}api/create_user/`
  );

  const handleRadioChange = (event) => {
    if (event.target.value === "student") {
      setBaseURL(`${process.env.REACT_APP_DEP_URL}api/create_user/`);
    } else if (event.target.value === "college") {
      setBaseURL(`${process.env.REACT_APP_DEP_URL}api/create_institute_user/`);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password1 !== userData.password2) {
      console.log(userData.password1, userData.password2);
      return alert("passwords don't match");
    }
    const formData = new FormData();
    formData.append("email", userData.email);
    formData.append("password", userData.password1);
    formData.append("username", userData.username);

    try {
      const response = await axios.post(`${baseURL}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/login");
    } catch (error) {      
      setMessage("Email already registered with an account")
      alert(error);
    }
  };
  return (
    <div className="flex justify-center mt-16 text-black pb-3">
      <Form
        onSubmit={handleSubmit}
        className="w-1/4 bg-white p-8 rounded-md mb-3 text-black"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            autoComplete="off"
          />
          <Form.Text className="text-muted">
            consider your account hacked.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder="Username no space check"
            name="username"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3 flex items-center">
          <Form.Check
            type="radio"
            label={<span className="text-gray-700">Student</span>}
            name="radioGroup"
            value="student"
            id="radioStudent"
            onChange={handleRadioChange}
          />
          <Form.Check
            type="radio"
            label={<span className="text-gray-700">College</span>}
            name="radioGroup"
            value="college"
            id="radioCollege"
            onChange={handleRadioChange}
            className="ml-4"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password1"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </Form.Group>
        <Form.Group className="" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password Again"
            name="password2"
            onChange={handleInputChange}
            autoComplete="new-password"
          /> 
          {message? <Form.Text className="text-muted ">
          Provided email is already registered with an account
        </Form.Text>: null }
        </Form.Group>
        <div className="flex flex-col items-center">
          <ButtonComp text="Login" />
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
