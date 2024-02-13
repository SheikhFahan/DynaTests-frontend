// creates test sessions  for both category and combined categories s

import { Form, InputGroup, Button } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";

import AuthContext from "../Context/AuthContext";

import ButtonComp from './ButtonComp'

const CreateGroupTestSessions = () => {
  const { type } = useParams();
  // to get the type of the test
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "", // add permissions to the user category api
    start_time: new Date(),
    end_time: new Date(),
    duration:"",
    hasPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formPwdData, setFormPwdData] = useState({
    pk: "",
    password: "",
    confirmPassword: "",
  });
  const baseUrl = "http://127.0.0.1:8000/api/group_tests/";

  const { AuthTokens } = useContext(AuthContext);

  const getEndpoint = (name) => {
    switch (name) {
      case "sub_test":
        return {
          sessionCreation: "session_by_subtest/",
          setPassword: "create_subtest_session_passwords/",
          get_options: "group_sub_test/",
        };
      case "singular":
        return {
          sessionCreation: "session_by_category/",
          setPassword: "create_category_session_passwords/",
          get_options: "group_test_categories",
        };
        case "combined_category":
          return {
            sessionCreation: "session_by_combined_category/",
            setPassword: "create_combined_category_session_passwords/",
            get_options: "group_test_combined_categories",
          };

      default:
        throw new Error(`Unexpected value for name: ${name}`);
    }
  };

  const { sessionCreation, setPassword, get_options } = getEndpoint(type);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setFormPwdData({
      ...formPwdData,
      [name]: value,
    });
  };

  //   change the effecting function
  useEffect(() => {
    handlePwdUpload();
  }, [formPwdData.pk]);

  // handle fetch from backend for test categories
  useEffect(() => {
    axios
      .get(`${baseUrl}${get_options}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setCategory(response.data);
        console.log(response.data)
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //handles upload of file
  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      formPwdData.password &&
      formPwdData.password !== formPwdData.confirmPassword
    ) {
      console.log(formPwdData.password, formPwdData.confirmPassword);
      return alert("passwords don't match");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append(
      "start_time",
      formatISO(formData.start_time, "MM/dd/yyyy HH:mm")
    );
    formDataToSend.append(
      "end_time",
      formatISO(formData.end_time, "MM/dd/yyyy HH:mm")
    );
    formDataToSend.append("has_password", formData.hasPassword);
    formDataToSend.append("duration", formData.duration);

    try {
      const response = await axios.post(
        `${baseUrl}${sessionCreation}`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      console.log("Response:", response.status);
      if (response.status === 201 && showPassword) {
        setFormPwdData((prevFormPwdData) => ({
          ...prevFormPwdData,
          pk: response.data.pk,
        }));
      }
      console.log(formPwdData.pk);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePwdUpload = async (e) => {
    const formData = new FormData();
    formData.append("session", formPwdData.pk);
    formData.append("password", formPwdData.password); 

    try {
      const response = await axios.post(`${baseUrl}${setPassword}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Beared ${AuthTokens.access}`,
        },
      });
      console.log("Response2 :", response.data);
      if (response.status == 201) {
        return alert("Protected Test SuccessfullyCreated");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex  flex-col items-center">
        <form onSubmit={handleUpload} className="mt-10 space-y-5">
          <InputGroup className=" relative" size="lg">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              name="name"
              placeholder="Enter The Name"
              aria-label="label for Name"
              aria-describedby="basic-addon1"
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </InputGroup>

          <Form.Select
            size="lg"
            value={formData.category}
            name="select_category"
            onChange={handleSelectChange}
          >
            <option >Select Category</option>
            {category.map((item) => (
              <option key={item.pk} value={item.pk}>
                {item.name}{item.title}
              </option>
            ))}
          </Form.Select>
          <InputGroup className="border rounded-3" size="lg">
            <InputGroup.Text id="basic-addon1">Start Time</InputGroup.Text>
            <div className="flex items-center ">
            <DatePicker
            className="mx-4 text-lg outline-none"
            selected={formData.start_time}
              onChange={(date) =>
                setFormData({ ...formData, start_time: date })
              }
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
            />
            </div>
          </InputGroup>

          {/* Date and Time Picker for End Time */}
          <InputGroup className="border rounded-3" size="lg">
            <InputGroup.Text id="basic-addon1">End Time</InputGroup.Text>
            <div className="flex items-center ">
            <DatePicker
            className="mx-4 text-lg outline-none"
            selected={formData.end_time}
              onChange={(date) => setFormData({ ...formData, end_time: date })}
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm"
            />
            </div>
          </InputGroup>
          <InputGroup className="mb-3" size="lg">
          <InputGroup.Text id="basic-addon1">Duration</InputGroup.Text>
            <Form.Control
              name="duration"
              placeholder="Test Duration "
              aria-label="label for duration"
              aria-describedby="basic-addon1"
              required
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
            </InputGroup>
          <Form.Check
            className="mb-3"
            type="switch"
            id="custom-switch"
            label="Protect test with password?"
            checked={formData.hasPassword}
            onChange={(e) => {
              setFormData({ ...formData, hasPassword: e.target.checked });
              toggleShowPassword();
            }}
          />
          {showPassword && (
            <>
              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                  value={formPwdData.password}
                  onChange={handlePasswordChange}
                  required={formPwdData.password}
                />
              </InputGroup>

              <InputGroup className="mb-3" size="lg">
                <InputGroup.Text id="basic-addon1">
                  Confirm Password
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  aria-describedby="basic-addon1"
                  value={formPwdData.confirmPassword}
                  onChange={handlePasswordChange}
                  required={formPwdData.confirmPassword}
                />
              </InputGroup>
            </>
          )}

          <ButtonComp text = "Submit"/>
        </form>
      </div>
    </>
  );
};
export default CreateGroupTestSessions;
