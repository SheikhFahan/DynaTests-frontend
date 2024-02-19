import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";


import RadarChartComp from "./RadarChartComp";
import AuthContext from "../Context/AuthContext";
import InstituteDBTable from "./InstituteDBTable";

import { Link } from "react-router-dom";

const FocusedTestData = ({endpoint}) => {
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
            console.log(response.data)

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
    // not using the firs useEffect rn 
    <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>#</th>
        <th>Category Name</th>
        <th>Easy Questions Count</th>
        <th>Medium Questions Count</th>
        <th>Hard Questions Count</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr>
          <td>{index + 1}</td>
          <td>{item.category_name}</td>    
          <td>{item.total_easy}</td>    
          <td>{item.total_medium}</td>    
          <td>{item.total_hard}</td>    
        </tr>
      ))}
    </tbody>
  </Table>
  )
}

export default FocusedTestData