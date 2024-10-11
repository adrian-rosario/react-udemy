import { useRef } from "react";
import PropTypes from "prop-types";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  // - for help keeping the shuffled version of questions
  // manage values independently from the component lifecycle
  // - w/o this, ever time a button was clicked the order
  // of questions would get reshuffled in the view 😬
  const shuffledAnswers = useRef();

  // - this worked fine here until we started to handle the button/answer check (for css classes)
  // - implement: useRef()
  // const shuffledAnswers = [...DATA[activeQuestionsIndex].answers];
  if (!shuffledAnswers.current) {
    // - initial state
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul>
      {shuffledAnswers.current.map((arrayItem) => {
        const answerSelected = selectedAnswer === arrayItem;
        let styleClass = "";

        if (answerState === "answered" && answerSelected) {
          styleClass = "selected";
        }

        {
          /* console.log("answer state? " + answerState); */
        }

        if (
          (answerState === "right" || answerState === "wrong") &&
          answerSelected
        ) {
          styleClass = answerState;
        }

        return (
          <li key={arrayItem}>
            <button
              onClick={() => onSelect(arrayItem)}
              className={styleClass}
              disabled={answerState !== ""}
            >
              {arrayItem}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Answers.propTypes = {
  answers: PropTypes.any,
  selectedAnswer: PropTypes.any,
  answerState: PropTypes.any,
  onSelect: PropTypes.any,
};
