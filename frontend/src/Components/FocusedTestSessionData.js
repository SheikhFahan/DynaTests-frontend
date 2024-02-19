import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import AuthContext from "../Context/AuthContext";
import GraphComp from "./GraphComp";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const FocusedTestSessionData = ({ endpoints }) => {
  const [sessionData, setSessionData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const { AuthTokens } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);
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

  const handleTabSelect = (itemPk) => {
    console.log("working");
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
        console.log(response.data, "inside focused");

        setGraphData(response.data);
        console.log(response.data, "graph data");
      })
      .catch((error) => console.error("error fetching data", error));
  };
let avg_score = 0;
  // Iterate through the JSON data to find the min and max scores
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
  avg_score = avg_score/graphData.length;
  console.log(session_stats);

  //   const handleCategoryData = (pk) => {
  //     axios
  //       .get(
  //         `${process.env.REACT_APP_DEP_URL}api/user/questions_statistics/${pk}/`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AuthTokens.access}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         setCategoryData(response.data);
  //         console.log(response.data, `data for ${pk}`);
  //       })
  //       .catch((error) => console.error("error fetching data", error));
  //   };

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
    <div className="h-full w-full">
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
            <div className="flex flex-col justify-center items-center h-full w-full">
              {selectedItem && graphData.length > 1 ? (
                <>
                  <p className="text-lg text-gray-800 mb-4 text-shadow-lg">
                  max_scorer :{session_stats.max.name} with {session_stats.max.score} <br/>
                    min_scorer : {session_stats.min.name} with {session_stats.min.score} <br/>
                    avg_score : {avg_score.toFixed(2)}
                  </p>
                  <p className="text-base mb-2">
                    {`Total number of submissions: ${graphData.length}`}
                  </p>
                  <div className="flex flex-row justify-center items-center h-full w-full">
                    <div className="w-1/2">
                      <GraphComp data={graphData} />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  not sufficent data to show progress please attempt more tests
                </div>
              )}
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};


export default FocusedTestSessionData