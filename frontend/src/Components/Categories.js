import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";

import axios from "axios";

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const {type} = useParams( )
  
  const getEndpoint = (data) => {
    switch(data) {
      case 'focused_tests' : 
      return {
        name : "Focused Tests",
        fetchTestList : "categories/",
        fetchTest : "dyn_test/",
      };
      case 'comprehesive_tests'  :
        return{
        name : "Comprehensive Tests",
        fetchTestList : 'combination_c/',
        fetchTest : "comb_dyn_test/",
      }
      default:
        throw new Error(`Unexpected value for name: ${data}`);
    }
  }

const {fetchTestList , fetchTest, name} = getEndpoint(type)
  

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}api/tests/${fetchTestList}`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data); //response.data isn't getting saved to categories
        console.log(categories);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  return (
    <>

      <div className="min-h-screen p-4">
        {categories.map((item, index) => (
          <div className="flex flex-wrap justify-center items-center  ">
            <Card
              key={index}
              to={`/${fetchTest}${item.pk}`}
              as={Link}
              className="no-underline w-25 h-40 m-10 p-10 min-h-80 bg-gradient-to-b from-gray-100 to-white border-2 border-gray-300 hover:shadow-md hover:border-gray-500"
            >
              <Card.Title className="text-xl text-center mb-4 underline">
                {item.name}
              </Card.Title>
              <Card.Body>
                <Card.Text className="no-underline">{item.description}</Card.Text>
              </Card.Body>
            </Card>
        </div>
        ))}
      </div>
      <br/>
    </>
  );
};

export default Categories;
