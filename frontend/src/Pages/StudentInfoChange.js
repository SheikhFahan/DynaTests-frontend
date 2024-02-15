import React, { useState , useContext} from "react";
import axios from "axios";
import ButtonComp from "../Components/ButtonComp";
import Form from "react-bootstrap/Form";
import AuthContext from '../Context/AuthContext'
import { redirect, useLocation, useNavigate } from 'react-router-dom';

const StudentInfoChange = () => {
  const url = `${process.env.REACT_APP_DEP_URL}api/user/profile_student/`;
  const location = useLocation();
  const { name, email, phone, address } = location.state;
  const [data, setData] = useState({ 
    
  });
  const {user, AuthTokens} = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
      setData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
  };

console.log()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${url}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization  :`Bearer ${AuthTokens.access}`
          },
        }
      );
      if (response.status == 200) {
        setMessage("Successfull Changes");
        navigate('/profile')
      }
    } catch (error) {
      console.error("Error Changing password:", error);
      setMessage("Invalid password, please enter a your old password correctly");
    }
  };
  console.log(data)

  return (
    <div className="flex flex-col items-center w-full pb-32 mb-16  text-black">
      <Form onSubmit={handleSubmit} className="flex flex-col mt-20  w-1/5">
        <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
          <Form.Control
            type="tel"
            placeholder={phone? phone : "XXXXXXXXXX"}
            name="phone"
            onChange={handleInputChange}
          />
        </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Control
            type="text"
            placeholder={address}
            name="address"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            name="password"
            onChange={handleInputChange}
            autoComplete="new-password"
          />
        </Form.Group>

        {message ? (
          <Form.Text className="text-muted">{message}</Form.Text>
        ) : (
          <Form.Text className="text-muted">
            Enter the valid details
          </Form.Text>
        )}

        <div className="flex flex-col items-center">
          <ButtonComp text="Confirm" />
        </div>
      </Form>
    </div>
  );
};

export default StudentInfoChange;

