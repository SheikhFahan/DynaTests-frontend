import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AuthContext from "../Context/AuthContext";
import ButtonComp from "../Components/ButtonComp";

const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);


  return (
    <div className="flex flex-col items-center w-full pb-32 mb-16  text-black">
      <Form onSubmit={loginUser} className="flex flex-col mt-20 mb-3 w-1/5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Username" name="username" className="bg-gray-100" />
          <Form.Text className="text-muted">consider your account hacked.</Form.Text>
        </Form.Group>

        <Form.Group className="" controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" name="password" />
        </Form.Group>
       <div className="flex flex-col items-center">
       <ButtonComp text = "Login" />
       </div>
       <div className="text-right w-full">
          <a href="/forgot_password" className="text-sm text-gray-800 hover:text-blue-500">Forgot  password?</a>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;