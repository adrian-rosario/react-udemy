import { useCallback, useState } from "react";
import DATA from "../model/quizQuestions";
// import Timer from "./Timer";
// import Answers from "./Answers";
import Questions from "./Questions";
import QuizComplete from "./QuizComplete";

export default function Quiz() {
  const [getUserAnswers, setUserAnswers] = useState([]);

  // - keep track of when the user has made a selection/answer
  // const [getAnswerState, setAnswerState] = useState("");

  // const [getSuffledAnswered, setShuffledAnswers] = useState([]);

  // - derive the state instead of managing another value,
  // we will know the index by how many questions have been answered
  // - if the user has not answered, ie. '', then the index is equal to
  //  getUserAnswers.length, else it's equal to
  // getUserAnswers.length - 1 (move onto the next question)
  const activeQuestionsIndex = getUserAnswers.length;

  const quizComplete = activeQuestionsIndex === DATA.length;

  const handleButtonClick = useCallback(
    function handleButtonClick(value) {
      // - keep track of answer once is has been made

      setUserAnswers((prevState) => {
        return [...prevState, value];
      });
    },
    [] // must be created every time
  );

  const handleSkipAnswer = useCallback(
    () => handleButtonClick(null),
    [handleButtonClick]
  );

  if (quizComplete) {
    return <QuizComplete answerData={getUserAnswers} />;
  }

  // console.log("? " + JSON.stringify(getUserAnswers));

  return (
    <div className='quiz'>
      <div className='quizCell'>
        <Questions
          key={activeQuestionsIndex}
          questionIndex={activeQuestionsIndex}
          onSelectAnswer={handleButtonClick}
          skipAnswer={handleSkipAnswer}
        />
      </div>
    </div>
  );
}
