import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { json, useParams } from "react-router-dom";

import QuestionCard from "./QuestionCard";

const FocusedTest = () => {
  let { categoryId } = useParams();
  const { AuthTokens } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/tests/${categoryId}/get_test/`, {
        headers: {
          Authorization: `Bearer ${AuthTokens.access}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response);
        setQuestionsCount({
          count_easy: response.data.easy_questions.length,
          count_medium: response.data.medium_questions.length,
          count_hard: response.data.hard_questions.length,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching the data please try again");
        setLoading(true);
      });
  }, []);

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
    // send category to be a well to take of processing load
    const data = {
      choices: allAnswers,
      count: questionsCount,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/tests/submit_ans/",
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
  return (
    <div className="container flex flex-col items-center min-w-screen ">
      {showScore ? (
        <div className=" text-4xl p-72">You scored {showScore} out of 100</div>
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
                id={index}
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
      
    </div>
  );
};

export default FocusedTest;
