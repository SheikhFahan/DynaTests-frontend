import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import InfiniteScroll from "react-infinite-scroll-component";

import RadarChartComp from "./RadarChartComp";
import AuthContext from "../Context/AuthContext";



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
    <div className="flex flex-col w-full  items-center justify-center my-5">
    <Card className=" w-full items-center ">
      <Card.Body className="min-w-40">
        <Card.Title>Total SubTests : {data.length}</Card.Title>
      </Card.Body>
    </Card>    
    <div className="flex flex-row w-full h-full items-center justify-center text- md">

    <div className="w-1/2 mt-5">
          <RadarChartComp
            labels={categoryLables}
            values={categoryLableValues}
          />
        </div>
        <InfiniteScroll
        // dataLength={concatArray.length}
        dataLength={10}
        className="max-h-60 w-full overflow-y-scroll"
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
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
    </InfiniteScroll>
    
    </div>    
   
    </div>
  )
}

export default SubtestData