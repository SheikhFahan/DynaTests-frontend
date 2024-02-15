import React, { useState , useContext} from "react";
import axios from "axios";
import ButtonComp from "../Components/ButtonComp";
import Form from "react-bootstrap/Form";
import AuthContext from '../Context/AuthContext'

const ChangePasswordPage = () => {
  const url = "http://127.0.0.1:8000/api/change_password/";
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    new_password: "",
  });
  const {user, AuthTokens} = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
      setPasswordData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(passwordData.new_password != password) return alert("passwords don't match")
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEP_URL}api/change_password/`,
        passwordData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization  :`Bearer ${AuthTokens.access}`
          },
        }
      );
      if (response.status == 200) {
        setMessage("Password reset Successful");
      }
    } catch (error) {
      console.error("Error Changing password:", error);
      setMessage("Invalid password, please enter a your old password correctly");
    }
  };

  return (
    <div className="flex flex-col items-center w-full pb-32 mb-16  text-black">
      <Form onSubmit={handleSubmit} className="flex flex-col mt-20  w-1/5">
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter Current Password"
            name="old_password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            name="new_password"
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter New Password Again"
            name="password"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
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

export default ChangePasswordPage;
