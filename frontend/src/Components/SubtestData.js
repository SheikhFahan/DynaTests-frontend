import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";


import RadarChartComp from "./RadarChartComp";
import AuthContext from "../Context/AuthContext";
import InstituteDBTable from "./InstituteDBTable";

import { Link } from "react-router-dom";


const SubtestData = ({endpoint}) => {
    const [data, setData] = useState([]);
    const [categoryLables, setCategoryLables] = useState([]);
    const [categoryLableValues, setCategoryLableValues] = useState([]);

    const {AuthTokens} = useContext(AuthContext)

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_DEP_URL}${endpoint.endpoint1}`, {
            headers: {
              Authorization: `Bearer ${AuthTokens.access}`,
            },
          })
          .then((response) => {
            setCategoryLables(response.data.map((entry) => entry.category_name));
            setCategoryLableValues(response.data.map((entry) => entry.count));
          })
          .catch((error) => console.error("Error fetching data:", error));


          axios
          .get(`${process.env.REACT_APP_DEP_URL}${endpoint.endpoint2}`, {
            headers: {
              Authorization: `Bearer ${AuthTokens.access}`,
            },
          })
          .then((response) => {
            setData(response.data)
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
        <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Test Name</th>
          <th>Associated Category</th>
          <th>Easy Questions Count</th>
          <th>Medium Questions Count</th>
          <th>Hard Questions Count</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr>
            <td>{index + 1}</td>
            <td>{item.test_name}</td>    
            <td>{item.category_name}</td>    
            <td>{item.total_easy}</td>    
            <td>{item.total_medium}</td>    
            <td>{item.total_hard}</td>    
          </tr>
        ))}
      </tbody>
    </Table>
    
    </div>    
   
    </div>
  )
}

export default SubtestData