import Timer from "./Timer";
import Answers from "./Answers";
import PropTypes from "prop-types";
import DATA from "../model/quizQuestions";
import { useState } from "react";

export default function Questions({
  onSelectAnswer,
  skipAnswer,
  questionIndex,
}) {
  const [answer, setAnswerState] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let theTimer = 10000;
  if (answer.selectedAnswer) {
    theTimer = 1000; // we have a selected an answer, we want a reveal after 1000ms
  }

  if (answer.isCorrect !== null) {
    theTimer = 2000; // time to move to next question
  }

  function handleSelectAnswer(answer) {
    setAnswerState({
      selectedAnswer: answer,
      isCorrect: null,
    });

    // - pause, then present answer
    setTimeout(() => {
      setAnswerState({
        selectedAnswer: answer,
        isCorrect: DATA[questionIndex].answers[0].includes(answer),
      });

      // - so we don't instantly move away
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "right" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div className='questions'>
      <h2>{DATA[questionIndex].text}</h2>

      <Answers
        answers={DATA[questionIndex].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />

      <Timer
        timerLength={theTimer}
        onTimeout={answer.selectedAnswer === "" ? skipAnswer : null}
        mode={answerState}
        key={theTimer}
      />
    </div>
  );
}

Questions.propTypes = {
  onSelectAnswer: PropTypes.any,
  skipAnswer: PropTypes.any,
  questionIndex: PropTypes.any,
};
