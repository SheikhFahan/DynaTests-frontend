import React, { useState, useEffect, useContext } from "react";
import GraphComp from "../Components/GraphComp";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RadarChartComp from "./RadarChartComp";
import QuestionsStatistics from "./QuestionsStatistics";

const StudentPerformance = () => {
  let [graphCategories, setgraphCategories] = useState([]);
  // for the radar chart
  let [categoriesData, setCategoriesData] = useState([]);
  //
  let [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questionStatistics, setQuestionStatistics] = useState([]);
  const [categoryLables, setCategoryLables] = useState([]);
  const [categoryLableValues, setCategoryLableValues] = useState([]);
  const scores = categoriesData.map((entry) => entry.score);

  const { user, AuthTokens } = useContext(AuthContext);

  const handleTabSelect = (categoryPk) => {
    handleOptionClick(categoryPk);
    handleCategoryData(categoryPk);
    setSelectedCategory(categoryPk);
  };

  const calculateRateOfChange = (scores) => {
    // allow the function to take a range of values as per time to filter growth
    let totalChange = 0;
    for (let i = 1; i < scores.length; i++) {
      totalChange += scores[i] - scores[i - 1];
    }
    const averageChange = totalChange / (scores.length - 1);
    return averageChange;
  };
  const rateOfChange = calculateRateOfChange(scores);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}api/user/categories/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setgraphCategories(response.data);
        setCategoryLables(response.data.map((entry) => entry.category_name));
        setCategoryLableValues(response.data.map((entry) => entry.count));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}api/user/questions_statistics/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setQuestionStatistics(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleOptionClick = (pk) => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}api/user/${pk}/marks/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setCategoriesData(response.data);
        console.log(response.data, "graph data");
      })
      .catch((error) => console.error("error fetching data", error));
  };

  const handleCategoryData = (pk) => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}api/user/questions_statistics/${pk}/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setCategoryData(response.data);
        console.log(response.data, `data for ${pk}`);
      })
      .catch((error) => console.error("error fetching data", error));
  };

  return (
    <div className="flex flex-col w-full h-full items-center justify-center my-10">
      <div className="flex flex-row w-full h-full items-center justify-center">
        <div className="w-1/2">
          <RadarChartComp
            labels={categoryLables}
            values={categoryLableValues}
          />
        </div>
        <div className="h-1/2 w-1/2">
          <QuestionsStatistics questionStatistics={questionStatistics} />
        </div>
      </div>
      <div className="h-full w-full">
        <Tabs
          onSelect={handleTabSelect}
          defaultActiveKey={null}
          id="fill-tab-example"
          className="mb-3 text-lg text-slate-950 lowercase"
        >
          {graphCategories.map((category) => (
            <Tab
              eventKey={category.pk}
              title={category.category_name}
              key={category.pk}
              className=""
              onSelect={() => handleTabSelect(category.pk)}
            >
              <div className="flex flex-col justify-center items-center h-full w-full">
                {selectedCategory && (categoriesData.length >1) ?(
                  <>
                    <p className="text-lg text-gray-800 mb-4 text-shadow-lg">
                      {rateOfChange > 0
                        ? `Keep it up! Your score has improved with an average of ${rateOfChange.toFixed(2)} marks per test.`
                        : `Looks like you need some work. Your scores are declining with ${-rateOfChange} marks per test.`}
                    </p>
                    <p className="text-base mb-2">
                      {`Total number of tests taken: ${scores.length}`}
                    </p>
                    <div className="flex flex-row justify-center items-center h-full w-full">
                      <div className="w-1/2">
                        <GraphComp data={categoriesData} />
                      </div>
                      <div className="w-1/2">
                        <QuestionsStatistics
                          questionStatistics={categoryData}
                        />
                      </div>
                    </div>
                  </>
                ):<div>not sufficent data to show progress please attempt more tests</div>}
              </div>
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default StudentPerformance;
