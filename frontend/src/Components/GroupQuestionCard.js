import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { InputGroup, Form, Button, Modal } from "react-bootstrap";

import QuestionCard from "./QuestionCard";


const GroupQuestionsCard = () => {
  const baseUrl = `${process.env.REACT_APP_DEP_URL}api/group_tests/`;
  const [authData, setAuthData] = useState({
    unique_id: "",
    session_id: "",
    password: "",
  });
  const [sessionInfo, setSessionInfo] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const { instId, sessionId } = useParams();
  const { user, AuthTokens } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [answersForEasy, setAnswersForEasy] = useState({
    easy: [],
  });
  const [answersForMedium, setAnswersForMedium] = useState({
    medium: [],
  });
  const [answersForHard, setAnswersForHard] = useState({
    hard: [],
  });
  const [data, setData] = useState([]);

  let endpoints, authEndpoint, sessionEndpoint, sessionQuestionFetch, submitAns;

  const allAnswers = {
    easy: [...answersForEasy.easy],
    medium: [...answersForMedium.medium],
    hard: [...answersForHard.hard],
  };

  const [questionsCount, setQuestionsCount] = useState({
    count_easy: 0,
    count_medium: 0,
    count_hard: 0,
  });

  const easy_question_array = data.easy_questions;
  const medium_question_array = data.medium_questions;
  const hard_question_array = data.hard_questions;

  const getEndpoint = (type) => {
    switch (type) {
      case "subTest":
        return {
          authEndpoint: "authenticate_session_subtest/",
          sessionEndpoint: "session_subtest_data/",
          sessionQuestionFetch: "subtest_session/",
          submitAns : "submit_ans_subtest/",
        };
      case "categoryTest":
        return {
          authEndpoint: "authenticate_session_c/",
          sessionEndpoint: "session_category_data/",
          sessionQuestionFetch: "category_test_session/",
          submitAns : "submit_ans_c/",

        };
      default:
        return {};
    }
  };

{  
  if (window.location.pathname.includes("/sub_test/")) {
    endpoints = getEndpoint("subTest");
  } else if (window.location.pathname.includes("/category_group_test/")) {
    endpoints = getEndpoint("categoryTest");
  }
  authEndpoint = endpoints.authEndpoint;
  sessionEndpoint = endpoints.sessionEndpoint;
  sessionQuestionFetch = endpoints.sessionQuestionFetch;
  submitAns = endpoints.submitAns;
}

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(`${baseUrl}${authEndpoint}`, authData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      });
      console.log(response.data);
      if (response.status == 200) {
        fetchQuestions();
      } else {
        alert("given password is incorrect please  try again");
      }
      console.log("work on getting questions");
    } catch (error) {
      console.error("an error occured");
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}${sessionEndpoint}${instId}/${sessionId}/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSessionInfo(response.data);
        if (response.data.has_password) {
          setAuthData({ ...authData, session_id: response.data.pk });
        } else {
          console.log("no pwd for the file");
          fetchQuestions();
        }
      });
  }, []);
  const fetchQuestions = () => {
    axios
      .get(`${baseUrl}${sessionQuestionFetch}${instId}/${sessionId}/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        console.log(response.data);

        setData(response.data);
        setQuestionsCount({
          count_easy: response.data.easy_questions.length,
          count_medium: response.data.medium_questions.length,
          count_hard: response.data.hard_questions.length,
        });
        setLoading(false);
        setShowModal(false);
        console.log("down here now");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching the data please try again");
        setLoading(true);
      });
  };

  const handleEasyAnswers = (questionId, choiceId) => {
    setAnswersForEasy((prevAnswers) => {
      const existingAnswerIndex = prevAnswers["easy"].findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers["easy"]];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          answer_id: choiceId,
        };

        return { ...prevAnswers, easy: updatedAnswers };
      } else {
        return {
          ...prevAnswers,
          easy: [
            ...prevAnswers["easy"],
            { question_id: questionId, answer_id: choiceId },
          ],
        };
      }
    });
  };

  const handleMediumAnswers = (questionId, choiceId) => {
    setAnswersForMedium((prevAnswers) => {
      const existingAnswerIndex = prevAnswers["medium"].findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers["medium"]];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          answer_id: choiceId,
        };

        return { ...prevAnswers, medium: updatedAnswers };
      } else {
        return {
          ...prevAnswers,
          medium: [
            ...prevAnswers["medium"],
            { question_id: questionId, answer_id: choiceId },
          ],
        };
      }
    });
  };
  const handleHardAnswers = (questionId, choiceId) => {
    setAnswersForHard((prevAnswers) => {
      const existingAnswerIndex = prevAnswers["hard"].findIndex(
        (answer) => answer.question_id === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers["hard"]];
        updatedAnswers[existingAnswerIndex] = {
          question_id: questionId,
          answer_id: choiceId,
        };

        return { ...prevAnswers, hard: updatedAnswers };
      } else {
        return {
          ...prevAnswers,
          hard: [
            ...prevAnswers["hard"],
            { question_id: questionId, answer_id: choiceId },
          ],
        };
      }
    });
  };

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    const data = {
      institute: instId,
      choices: allAnswers,
      count: questionsCount,
      session : sessionId,
      unique_id : authData.unique_id
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEP_URL}api/group_tests/${submitAns}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      setShowScore(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  console.log(showModal);
  return (
    <div className="flex flex-col items-center min-w-screen ">
      {showModal ? (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          {showModal && (
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Password Required</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control
                    name="ID"
                    placeholder="Enter Your Registered ID "
                    aria-label="label for ID"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(e) =>
                      setAuthData({ ...authData, unique_id: e.target.value })
                    }
                  />
                </InputGroup>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control
                    name="password"
                    placeholder="Please Enter Password"
                    aria-label="label for Name"
                    aria-describedby="basic-addon1"
                    required
                    onChange={(e) =>
                      setAuthData({ ...authData, password: e.target.value })
                    }
                  />
                </InputGroup>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="primary" onClick={handlePasswordSubmit}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          )}
        </div>
      ) : (
        <>
          {showScore ? (
            <div className="score-section">
              You scored {showScore} out of 100
            </div>
          ) : (
            <>
              <h1>{data.category}</h1>
              <div className=" flex flex-col items-center mt-7 w-2/3  space-y-5 ">
         <div className="min-w-full ">
            {easy_question_array.map((question, index) => (
              <QuestionCard
                key={question.pk}
                question={question}
                options={question.choices}
                handleChoice={handleEasyAnswers}
                currentQuestion = {currentQuestion + index}
              />
            ))}
          </div>
          
          <div className="min-w-full ">
            {medium_question_array.map((question, index) => (
              <QuestionCard
                key={question.pk}
                question={question}
                options={question.choices}
                handleChoice={handleMediumAnswers}
                currentQuestion = {currentQuestion + easy_question_array.length+ index}

              />
            ))}
          </div>

          <div className="min-w-full ">
            {hard_question_array.map((question, index) => (
              <QuestionCard
                key={question.pk}
                question={question}
                options={question.choices}
                handleChoice={handleHardAnswers}
                currentQuestion = {currentQuestion + easy_question_array.length +medium_question_array.length + index}

              />
            ))}
          </div>
         </div>

         <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-5 my-11 rounded" onClick={handleSubmitAnswers}>Submit Test</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GroupQuestionsCard;
