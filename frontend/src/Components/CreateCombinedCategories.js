import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect, useContext } from "react";

import axios from "axios";
import AuthContext from "../Context/AuthContext";
import ButtonComp from "./ButtonComp";

const CreateCombinedCategories = () => {
  const baseURL = `${process.env.REACT_APP_DEP_URL}api/`
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState({});
  let [selectedOptions, setSelectedOptions] = useState([]);
  const {user, AuthTokens} = useContext(AuthContext);


  const getEndpoint = (user) => {
    switch(user){
      case 'admin' : return{
        endpoint : "tests/categories/",
        uploadTo : "tests/combination_c/",
      };
      case 'institute'  :return {
        endpoint : "group_tests/group_test_categories/",
        uploadTo : "group_tests/group_test_combined_categories/",
      }
      default : return null
    }
  }

  const {endpoint, uploadTo} = getEndpoint(user.group)

  const handleSelectChange = (event) => {
    // when there is only one selection let the user unselect that
    const selectedValue = event.target.value;
    const isSelected = selectedOptions.includes(selectedValue);
  
    // Toggle selection
    if (isSelected) {
      setSelectedOptions((prevSelected) =>
      prevSelected.length > 1
        ? prevSelected.filter((option) => option !== selectedValue)
        : []
      );
      
    } else {
      setSelectedOptions((prevSelected) => [...prevSelected, selectedValue]);
    }
  };
  useEffect(() => {
    axios
      .get(`${baseURL}${endpoint}`, {
        headers :{
          Authorization :  `Bearer ${AuthTokens.access}`,
        }
      })
      .then((response) => {
        setCategories(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("error fetching data"));
  }, []);

  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      const formData = {
        'name': data.name,
        'description' : data.description,
        'associated_categories' : selectedOptions,

      }
      if (formData.associated_categories.length <2){
        return alert('please select more than one category')
      }
    const response = await axios.post(
      `${baseURL}${uploadTo}`, 
      formData,{
      headers: {
        "Content-Type" : "application/json",
        Authorization :`Bearer ${AuthTokens.access}`
      }
    }
    )
    console.log(response.data)
    } catch (error){
      console.error(error)
    }
    
  };

  return (
    <div className="flex justify-center mt-20">
        <form onSubmit={handleUpload} className="flex flex-col items-center">
        <InputGroup className="mb-3" size="lg">
            <InputGroup.Text id="basic-addon1">Combined Category Name</InputGroup.Text>
            <Form.Control
              name="Name"
              placeholder="Enter The Category Name"
              aria-label="label for category"
              aria-describedby="basic-addon1"
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </InputGroup>
          <Form.Select
          className="mb-3"
            size="lg"
            value={selectedOptions}
            name="select_categories"
            onChange={handleSelectChange}
            multiple
          >
            {categories.map((item) => (
              <option key={item.name} value={item.pk}>
                {item.name}
              </option>
            ))}
          </Form.Select>
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
          <ButtonComp text="submit" />
        </form>

    </div>
  );
};

export default CreateCombinedCategories;
// code to check which categories are being selected
// {/* <div>
// {/* Display selected categories */}
// <h2>Selected Categories:</h2>
// <ul>
//   {selectedOptions.map((selectedOption) => (
//     <li key={selectedOption}>{selectedOption}</li>
//   ))}
// </ul>
// </div> */}