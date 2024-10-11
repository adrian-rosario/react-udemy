import quizLogo from "../assets/quiz-logo.png";
import * as constants from "./constants";

export default function Header() {
  return (
    <header>
      <div>
        <img src={quizLogo} alt={constants.APP_NAME} />
      </div>
      <div>
        <h1>{constants.APP_NAME}</h1>
      </div>
    </header>
  );
}
