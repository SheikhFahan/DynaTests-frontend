import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";


import RadarChartComp from "../Components/RadarChartComp";
import AuthContext from "../Context/AuthContext";
import InstituteDBTable from "../Components/InstituteDBTable";

import { Link } from "react-router-dom";


const InstDBData = (endpoint) => {
    const [data, setData] = useState([]);
    const [categoryLables, setCategoryLables] = useState([]);
    const [categoryLableValues, setCategoryLableValues] = useState([]);

    const {AuthTokens} = useContext(AuthContext)
    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_DEP_URL}${endpoint.endpoint}`, {
            headers: {
              Authorization: `Bearer ${AuthTokens.access}`,
            },
          })
          .then((response) => {
            setCategoryLables(response.data.map((entry) => entry.category_name));
            setCategoryLableValues(response.data.map((entry) => entry.count));
          })
          .catch((error) => console.error("Error fetching data:", error));
        
      }, []);
    
  return (
    <div className="flex flex-col w-full h-full items-center justify-center my-10">
    <div className="flex flex-row w-full h-full items-center justify-center">
    <Card className="">
      <Card.Body className="min-w-40">
        <Card.Title>SubTests : {categoryLables.length}</Card.Title>
      </Card.Body>
    </Card>    

    <div className="w-1/2">
          <RadarChartComp
            labels={categoryLables}
            values={categoryLableValues}
          />
        </div>
        <InstituteDBTable endpoint = {endpoint} />
    
    </div>    
   
    </div>
  )
}

export default InstDBData