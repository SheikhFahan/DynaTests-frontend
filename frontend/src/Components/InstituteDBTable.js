import React , {useState, useContext, useEffect}from 'react'

import Table from "react-bootstrap/Table";

import { Link } from "react-router-dom";

import axios from 'axios'

import AuthContext from '../Context/AuthContext';

const InstituteDBTable = (endpoint) => {
    const [data, setData] = useState([]);
    const {AuthTokens} = useContext(AuthContext)



    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_DEP_URL}${endpoint.endpoint}`, {
            headers: {
              Authorization: `Bearer ${AuthTokens.access}`,
            },
          })
          .then((response) => {
            console.log(response.data, "second one")
            setData(response.data)
          })
          .catch((error) => console.error("Error fetching data:", error));
    }, [])
  return (
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
  )
}

export default InstituteDBTable