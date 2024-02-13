import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { InputGroup, Form, Button, Modal } from "react-bootstrap";
import QuestionCard from "./QuestionCard";


const GroupCombinationQuestions = () => {
  const { instId, sessionId } = useParams();
  const baseUrl = "http://127.0.0.1:8000/api/group_tests/";
  const [sessionInfo, setSessionInfo] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const { AuthTokens } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [data, setData] = useState([]);
  const [questionsCount, setQuestionsCount] = useState({});

  const [authData, setAuthData] = useState({
    unique_id: "",
    session_id: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get(`${baseUrl}session_combined_category_data/${instId}/${sessionId}/`, {
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
  console.log(authData);

  const handlePasswordSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}authenticate_session_cc/`,
        authData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
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

  const fetchQuestions = () => {
    console.log(instId, sessionId)
    axios
      .get(`${baseUrl}combined_category_test_session/${instId}/${sessionId}/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        const test_data = response.data;
        // console.log(response.data);
        const newQuestions = {};

        for (const key in test_data) {
          const categoryData = test_data[key];

          setQuestionsCount((prevQuestionsCount) => {
            return {
              ...prevQuestionsCount,
              [key]: {
                count_easy: categoryData.easy_questions.length || 0,
                count_medium: categoryData.medium_questions.length || 0,
                count_hard: categoryData.hard_questions.length || 0,
              },
            };
          });
          newQuestions[key] = {
            easy_questions: categoryData.easy_questions || [],
            medium_questions: categoryData.medium_questions || [],
            hard_questions: categoryData.hard_questions || [],
          };
        }
        if (response.status == 200) {
          setData(newQuestions);
        setLoading(false);
        setShowModal(false);
        }else{
          alert("something went wrong")
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching the data please try again");
        setLoading(true);
      });
  };

  const handleAnswer = (categoryId, difficulty, questionId, choiceId) => {
    // Create a copy of the current selectedChoices state
    const newSelectedChoices = { ...selectedChoices };

    // Check if the category exists in the stateff
    if (!newSelectedChoices[categoryId]) {
      newSelectedChoices[categoryId] = {};
    }

    // Check if the difficulty exists in the category
    if (!newSelectedChoices[categoryId][difficulty]) {
      newSelectedChoices[categoryId][difficulty] = {};
    }
    const existingChoice =
      newSelectedChoices[categoryId][difficulty][questionId];
    if (existingChoice == choiceId) {
      delete newSelectedChoices[categoryId][difficulty][questionId];
    } else {
      // Save the selected choice for the specific question
      newSelectedChoices[categoryId][difficulty][questionId] = choiceId;
    }

    // Update the state with the new selectedChoices
    setSelectedChoices(newSelectedChoices);
  };

  console.log(selectedChoices);

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    const data = {
      choices: selectedChoices,
      count: questionsCount,
      institute : instId,
      session : sessionId,
      unique_id : authData.unique_id,
    };
    console.log(authData, "this is data")

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/group_tests/submit_ans_cc/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthTokens.access}`,
          },
        }
      );
      setShowScore(response.data);
      // console.log("Response", response.data);
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
  return (
    <div className="flex flex-col items-center min-w-screen">
      {showModal ? (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
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
        </div>
      ) : (
        <>
       {Object.keys(data).map((categoryKey) => (
        
        <div className=" flex flex-col items-center mt-7 w-2/3  space-y-5 ">
                      <h1>{categoryKey}</h1>

        <div className="min-w-full ">
                        {data[categoryKey].easy_questions.map((question, index) => (
                          <QuestionCard
                            key={question.pk}
                            question={question}
                            options={question.choices}
                            handleChoice={handleAnswer}
                            categoryKey = {categoryKey}
                            difficulty = 'easy'
                            currentQuestion = {currentQuestion + index}
            
                          />
                        ))}
                      </div>

                      <div className="min-w-full ">
                        {data[categoryKey].medium_questions.map((question, index) => (
                          <QuestionCard
                            key={question.pk}
                            question={question}
                            options={question.choices}
                            handleChoice={handleAnswer}
                            categoryKey = {categoryKey}
                            difficulty = 'medium'
                            currentQuestion = {currentQuestion + index}
            
                          />
                        ))}
                      </div>

                      <div className="min-w-full ">
                        {data[categoryKey].hard_questions.map((question, index) => (
                          <QuestionCard
                            key={question.pk}
                            question={question}
                            options={question.choices}
                            handleChoice={handleAnswer}
                            categoryKey = {categoryKey}
                            difficulty = 'hard'
                            currentQuestion = {currentQuestion + data[categoryKey].hard_questions.length+ index}
            
                          />
                        ))}
                      </div>
                      </div>
          ))}
<button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-5 my-11 rounded" onClick={handleSubmitAnswers}>Submit Test</button>
        </>
      )}
      ;
    </div>
  );
};

export default GroupCombinationQuestions;
