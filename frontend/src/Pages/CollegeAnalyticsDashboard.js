import React, { useState, useEffect, useContext } from "react";
import GraphComp from "../Components/GraphComp";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RadarChartComp from "../Components/RadarChartComp";
import ProgressBarChart from "../Components/ProgressBarChart";
import DoughnutChart from "../Components/DoughnutChart";
import QuestionsStatistics from "../Components/QuestionsStatistics";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import { CardBody } from "react-bootstrap";


const CollegeAnalyticsDashboard = () => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center my-10">
    <div className="flex flex-row w-full h-full items-center justify-center">
    <Card className="">
      <Card.Body className="min-w-40">
        <Card.Title>SubTests : 4</Card.Title>
      </Card.Body>
    </Card>
      <div className="w-1/2">
   
        <RadarChartComp
          labels={['one', 'two', 'three']}
          values={[23, 35, 34]}
        />
      </div>
      <div className="h-1/2 w-1/2">
        <QuestionsStatistics questionStatistics={[23, 12]} />
      </div>
    </div>    
   
    </div>
  )
}

export default CollegeAnalyticsDashboard