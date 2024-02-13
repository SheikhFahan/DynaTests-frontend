import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import AuthContext from "../Context/AuthContext";

const CreateCategoriesComp = () => {
  const { user, AuthTokens } = useContext(AuthContext);

  const baseUrl = "http://127.0.0.1:8000/api/";
  const [data, setData] = useState({});

  const getEndpoint = (user) => {
    switch(user){
      case 'admin' : return{
        uploadTo : "tests/categories/",
      };
      case 'institute'  :return {
        uploadTo : "group_tests/group_test_categories/",
      }
      default : return null
    }
  }
  const {uploadTo} = getEndpoint(user.group)

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${baseUrl}${uploadTo}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      console.log("Response :", response.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="flex  flex-col items-center justify-center pt-6 min-h-96">
        <form onSubmit={handleUpload} className="flex flex-col  items-center justify-center">
          <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <Form.Control
              name="Name"
              placeholder="Enter The Category Name"
              aria-label="label for category"
              aria-describedby="basic-addon1"
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </InputGroup>
          {user && user.group == "admin" && (
                      <InputGroup className="mb-3" size="lg">
                      <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                      <Form.Control
                        name="Description"
                        placeholder="Enter The Description"
                        aria-label="label for description"
                        aria-describedby="basic-addon1"
                        required
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                      />
                    </InputGroup>
          )}
          <button
             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-5  rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default CreateCategoriesComp;
