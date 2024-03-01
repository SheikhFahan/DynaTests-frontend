import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import AuthContext from "../Context/AuthContext";
import GraphComp from "./GraphComp";

import Card from "react-bootstrap/Card";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const TestSessionData = ({ endpoints , type}) => {
  const [sessionData, setSessionData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const { AuthTokens } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [scoresSummary, setScoresSummary] = useState([]);
  const session_stats = {
    min: {
      name: "",
      score: Infinity,
    },
    max: {
      name: "",
      score: -Infinity,
    },
  };

  const scoresSummary = [
    { timestamp: "2024-02-18T10:00:00", score: 85 },
    { timestamp: "2024-02-19T10:00:00", score: 90 },
    { timestamp: "2024-02-20T10:00:00", score: 75 },
    // { timestamp: "2024-02-21T10:00:00", score: 80 },
    // { timestamp: "2024-02-22T10:00:00", score: 88 },
    // { timestamp: "2024-02-23T10:00:00", score: 92 },
    // { timestamp: "2024-02-24T10:00:00", score: 78 },
    // { timestamp: "2024-02-25T10:00:00", score: 85 },
    // { timestamp: "2024-02-26T10:00:00", score: 89 },
    // { timestamp: "2024-02-27T10:00:00", score: 82 }
  ];

  const handleTabSelect = (itemPk) => {
    handleOptionClick(itemPk);
    // handleCategoryData(categoryPk);
    setSelectedItem(itemPk);
  };

  const handleOptionClick = (pk) => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}${endpoints.endpoint2}${pk}/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setGraphData(response.data);
      })
      .catch((error) => console.error("error fetching data", error));
  };
  let avg_score = 0;
  graphData.forEach((entry) => {
    const score = entry.score;
    if (score < session_stats.min.score) {
      session_stats.min.score = score;
      session_stats.min.name = entry.name;
    }
    if (score > session_stats.max.score) {
      session_stats.max.score = score;
      session_stats.max.name = entry.name;
    }
    avg_score += score;
  });
  avg_score = avg_score / graphData.length;

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_DEP_URL}${endpoints.endpoint2}4/`, {
  //       headers: {
  //         Authorization: `Bearer ${AuthTokens.access}`,
  //       },
  //     })
  //     .then((response) => {
  //       setScoresSummary(response.data);
  //       console.log(response.data, `data for 1`);
  //     })
  //     .catch((error) => console.error("error fetching data", error));
  // }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}${endpoints.endpoint1}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setSessionData(response.data);
        
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="container flex flex-col  py-5">
          <Card className=" w-full items-center ">
      <Card.Body className="min-w-40">
        <Card.Title>Total {type} Sessions : {sessionData.length}</Card.Title>
      </Card.Body>
    </Card>    
      <div className="flex flex-col justify-center">
        <div className="px-6 w-full ">
          <GraphComp data={scoresSummary} aspectRatioValue={5} />
        </div>
        <div className="flex flex-col px-10 py-3">
          <p className="text-lg text-gray-800  text-shadow-lg">
            max_scorer :Test data with Test Score<br />
            min_scorer : Test data with Test Score
            <br />
            avg_score : more Test data
          </p>
          <p className="text-base mb-2">
            {`Total number of Sessions: ${sessionData.length}`}
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <Tabs
          onSelect={handleTabSelect}
          defaultActiveKey={null}
          id="fill-tab-example"
          className="mb-3 text-lg text-slate-950 lowercase"
        >
          {sessionData.map((item) => (
            <Tab
              eventKey={item.pk}
              title={item.name}
              key={item.pk}
              className=""
              onSelect={() => handleTabSelect(item.pk)}
            >
              <div className="container flex flex-col  py-5">
                {selectedItem && graphData.length > 1 ? (
                  <>
                    <div className="flex flex-col justify-center">
                      <div className="w-full px-4">
                        <GraphComp data={graphData} aspectRatioValue={5} />
                      </div>
                      <div className="flex flex-col px-10 py-3">
                        <p className="text-lg text-gray-800  text-shadow-lg">
                          max_scorer :{session_stats.max.name} with{" "}
                          {session_stats.max.score} <br />
                          min_scorer : {session_stats.min.name} with{" "}
                          {session_stats.min.score} <br />
                          avg_score : {avg_score.toFixed(2)}
                        </p>
                        <p className="text-base mb-2">
                          {`Total number of submissions: ${graphData.length}`}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div>
                    not sufficent data to show progress please attempt more
                    tests
                  </div>
                )}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default TestSessionData;
