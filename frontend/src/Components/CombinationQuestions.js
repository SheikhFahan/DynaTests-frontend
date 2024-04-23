import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionCard from "./QuestionCard";


const CombinationQuestions = () => {
  let { categoryId } = useParams();
  const { AuthTokens } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [data, setData] = useState([]);
  const [questionsCount, setQuestionsCount] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DEP_URL}api/tests/${categoryId}/get_comb_test/`, {
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
        setData(newQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching the data please try again");
        setLoading(true);
      });
  }, []);


  const handleAnswer = (questionId, choiceId, categoryId, difficulty) => {
    // Create a copy of the current selectedChoices state
    const newSelectedChoices = { ...selectedChoices };

    // Check if the category exists in the state
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

  console.log(selectedChoices)

  const handleSubmitAnswers = async (e) => {
    e.preventDefault();
    const data = {
      answers: selectedChoices,
      count: questionsCount,
      category : categoryId
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_DEP_URL}api/tests/submit_comb_ans/`,
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
    <div className="flex flex-col items-center min-w-screen ">
      {showScore ? (
        <div className="score-section">You scored {showScore} out of 100</div>
      ) : (
        <>

         {Object.keys(data).map((categoryKey) => (
        
        <div className=" flex flex-col items-center mt-7 w-2/3  space-y-5 ">

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

export default CombinationQuestions;
