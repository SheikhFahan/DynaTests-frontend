import { Navbar, Container, Nav, Row, Col, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import AccordionComp from "./AccordionComp";
import axios from "axios";

import AuthContext from "../Context/AuthContext";

import React, { useState, useEffect, useContext } from "react";

const Dashboard = (props) => {
  const mainUrl = "http://127.0.0.1:8000/api/group_tests/";
  const { compName, urlEnd } = props.data;
  const [copySuccess, setCopySuccess] = useState({});
  const [copiedButtonText, setCopiedButtonText] = useState("Copy Session Link");
  // data stores the category data
  const [data, setData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState();
  const { user, AuthTokens } = useContext(AuthContext);

  const getEndpoint = (name) => {
    switch (name) {
      case "Tests":
        return {
          creationPage: "create_group_sub_test/",
          sessionPage: `create_test_sessions/${"sub_test/"}`,
          type: "sub_test/",
          fetchSessions: "session_by_subtest/",
        };
      case "Focused Tests":
        return {
          creationPage: "create_categories/",
          sessionPage: `create_test_sessions/${"singular/"}`,
          type: "category_group_test/",
          fetchSessions: "session_by_category/",
        };
      case "Comprehensive Tests":
        return {
          creationPage: "create_combined_categories/",
          sessionPage: `create_test_sessions/${"combined_category/"}`,
          type: "comb_category_group_test/",
          fetchSessions: "session_by_combined_category/",
        };

      default:
        throw new Error(`Unexpected value for name: ${name}`);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess({ ...copySuccess, [index]: "Copied!" });
        setTimeout(() => {
          setCopySuccess({ ...copySuccess, [index]: "" });
        }, 1000);
      })
      .catch((err) => console.error("Failed to copy:", err));
  };
  const { creationPage, sessionPage, type, fetchSessions } =
    getEndpoint(compName);

  useEffect(() => {
    // to fetch sessions  associated
    axios
      .get(`${mainUrl}${fetchSessions}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setSessionData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);

  useEffect(() => {
    // to fetch categories  associated
    axios
      .get(`${mainUrl}${urlEnd}`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(true);
      });
  }, []);
  console.log(sessionData, "session Data");
  return (
    <>
      <div className="flex flex-col ">
        <AccordionComp name={`${compName}`} data={data}  link={creationPage}/>
        <AccordionComp
          name={`${compName} Sessions`}
          isTable={true}
          data={sessionData}
          copyHandler={copyToClipboard}
          copySuccess={copySuccess}
          type={type}
          userId={user.user_id}
          link = {sessionPage}
        />
      </div>
    </>
  );
};

export default Dashboard;
