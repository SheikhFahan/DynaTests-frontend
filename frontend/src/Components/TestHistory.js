import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../Context/AuthContext";
import Table from 'react-bootstrap/Table';


import InfiniteScroll from "react-infinite-scroll-component";

const TestHistory = () => {
  const baseURL = `${process.env.REACT_APP_DEP_URL}api/user/history/`;
  const [data, setData] = useState([""]);
  const [concatArray, setConcatArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const { AuthTokens } = useContext(AuthContext);

  const formatDate = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (nextPageUrl && !loading) {
        console.log(nextPageUrl, "new useEffect")
      fetchData();
    }
  }, [nextPageUrl, loading]); 


  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(nextPageUrl || baseURL, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      });
    //   setData(response.data.results);
      setConcatArray([...concatArray, ...response.data.results]);
      setNextPageUrl(response.data.next);
      
      console.log(response.data.results)
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div    >
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={concatArray.length}
        className="max-h-1/7 w-full"
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
         <Table striped>
      <thead>
        <tr>
          <th></th>
          <th>Category</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
      {concatArray.map((item, index) => (

        <tr key={index}>
          <td>{index}</td>
          <td>{item.category_name}</td>
          <td>{item.test_score}%</td>
          <td>{formatDate(item.date)}</td>
        </tr>
        ))}

      </tbody>
    </Table>

      </InfiniteScroll>
    </div>
  );
};

export default TestHistory;


// {index}
// {item.category_name}({item.test_score}) on {formatDate(item.date)}