import React from "react";
import DoughnutChart from "./DoughnutChart";
import ProgressBarChart from "./ProgressBarChart";

const QuestionsStatistics = ({questionStatistics}) => {
    const totalQuestions = questionStatistics.total_questions
    const questionsSolved = questionStatistics.solved_easy +  questionStatistics.solved_medium + questionStatistics.solved_hard
    const barLable = "text-xs relative top-12 right-0 bg-transparent  rounded-full "
    const doughnutLable = "text-xs relative top-36 left-20 bg-transparent   rounded-full "
  return (
    <div className="flex flex-row justify-center items-center w-full h-full ">
    <div className="w-1/2 ">
      {/* Added "relative" class to contain absolutely positioned elements */}
       {/* <div className={doughnutLable}>
        total <span className="text-xl">{questionsSolved}</span> / {totalQuestions}
      </div>  */}
      <DoughnutChart questionsSolved={questionsSolved} totalQuestions={totalQuestions} />
    </div>

      <div className="flex flex-col  m-0 w-1/2 items-center ">
      <div className={barLable}>easy {questionStatistics.solved_easy}/{questionStatistics.total_easy}  </div>
      <ProgressBarChart solved={questionStatistics.solved_easy} total={questionStatistics.total_easy} type={'easy'}/>
      <div className={barLable}>medium {questionStatistics.solved_medium}/{questionStatistics.total_medium} </div>
      <ProgressBarChart solved={questionStatistics.solved_medium}  total={questionStatistics.total_medium} type={'medium'}/>
      <div className={barLable}>hard {questionStatistics.solved_hard}/{questionStatistics.total_hard} </div>
      <ProgressBarChart solved={questionStatistics.solved_hard} total={questionStatistics.total_hard} type={'hard'} />
      </div>
    </div>
  );
};

export default QuestionsStatistics;
