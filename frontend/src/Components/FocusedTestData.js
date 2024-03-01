import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import InfiniteScroll from "react-infinite-scroll-component";

import AuthContext from "../Context/AuthContext";


const FocusedTestData = ({endpoint}) => {
    const [data, setData] = useState([]);
    const [categoryLables, setCategoryLables] = useState([]);
    const [categoryLableValues, setCategoryLableValues] = useState([]);

    const {AuthTokens} = useContext(AuthContext)

    useEffect(() => {
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
   <div className="mb-10">
     <Card className="flex flex-col w-full  items-center justify-center mb-10">
    <Card.Body className="">
      <Card.Title>Total Focused Tests : {data.length}</Card.Title>
    </Card.Body>
  </Card>    
  <InfiniteScroll
        // dataLength={concatArray.length}
        dataLength={10}
        className="max-h-80 w-full overflow-y-scroll"
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
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
  </InfiniteScroll>

   </div>
  )
}

export default FocusedTestData