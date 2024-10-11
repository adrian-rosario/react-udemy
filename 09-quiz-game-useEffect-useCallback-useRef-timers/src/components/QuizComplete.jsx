import quizCompleteImage from "../assets/quiz-complete.png";
import PropTypes from "prop-types";
import DATA from "../model/quizQuestions";

export default function QuizComplete({ answerData }) {
  const getSkippedAnswers = answerData.filter((item) => item === null);

  const calculatedSkippedAnswers = Math.round(
    (getSkippedAnswers.length / answerData.length) * 100
  );
  // -
  const getCorrectAnswers = answerData.filter(
    (item, index) => item === DATA[index].answers[0]
  );

  const calculatedCorrectAnswers = Math.round(
    (getCorrectAnswers.length / answerData.length) * 100
  );
  //-
  const calculateIncorrectAnswers =
    100 - calculatedSkippedAnswers - calculatedCorrectAnswers;

  return (
    <div className='summary'>
      <img src={quizCompleteImage} alt='Success!' />
      <h2>Quiz complete.</h2>

      <div className='statistics'>
        <div>
          <span className='percent'>{calculatedSkippedAnswers}%</span>
          <span className='theText'>&nbsp;questions skipped</span>
        </div>

        <div>
          <span className='percent'>{calculatedCorrectAnswers}%</span>
          <span className='theText'>&nbsp;correct answers</span>
        </div>

        <div>
          <span className='percent'>{calculateIncorrectAnswers}%</span>
          <span className='theText'>&nbsp;incorrect answers</span>
        </div>
      </div>

      <div className='details'>
        {DATA.forEach((item) => console.log(item.text))}

        {/* {console.log("complete:\n" + JSON.stringify(answerData))} */}

        <ol>
          {answerData.map((answer, index) => {
            let cssClass = "";
            if (answer === null) {
              cssClass += " skippedQuestion";
            } else if (answer === DATA[index].answers[0]) {
              cssClass += " answeredCorrectly";
            } else {
              cssClass += " answeredIncorrectly";
            }

            {
              /* console.log("answered data?" + answerData); */
            }

            return (
              <li key={index}>
                <h3>{index + 1}</h3>
                <p>{DATA[index].text}</p>
                <p className={cssClass}>{answer ?? "Skipped"}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
QuizComplete.propTypes = {
  answerData: PropTypes.any,
};
