import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

import InfiniteScroll from "react-infinite-scroll-component";


import AuthContext from "../Context/AuthContext";

const ComprehensiveTestData = ({ endpoint }) => {
  const [data, setData] = useState([]);
  const { AuthTokens } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}${endpoint.endpoint1}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="mb-10">
      <div>
        <Card className="w-full items-center mb-10 ">
          <Card.Body className="min-w-40">
            <Card.Title>Total Comprehensive Tests : {data.length}</Card.Title>
          </Card.Body>
        </Card>
      </div>
      <div>
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
              <th>Category Name</th>
              <th>Associated Categories</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.category_name}</td>
                <td>{item.associated_categories_list}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ComprehensiveTestData;
