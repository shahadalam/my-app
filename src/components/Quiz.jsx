import { useCallback, useState } from "react";
import question from "../question";
import "./Quiz.css";
import QuestionTimer from "./QuestionTimer";
import comlogo from "../assets/quick-tip.avif";

export default function Quiz() {
  // const shuffledAnswers =useRef()
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;
  const quizIsComplete = activeQuestionIndex === question.length;

  const handleSelectAnswer = useCallback(
    function handleSelectAnswer(selectedAnswer) {
      setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });
      setTimeout(() => {
        if (setUserAnswers === question[activeQuestionIndex].correctAnswer) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }
        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );
  // function handleSelectAnswer(selectedAnswer) {
  //   setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  // }

  // const handleSkipAnswer = useCallback(
  //   () => handleSelectAnswer(null),
  //   [handleSelectAnswer]
  // );
  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={comlogo} alt="Completion" />
        <h2>Quiz Completed</h2>
      </div>
    );
  }

  const shuffledAnswers = [...question[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div className="quiz">
      {/* <h1 className="QuizQuestion">React Quiz</h1> */}
      <div className="question">
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={() => handleSelectAnswer(null)}
        />
        <h2>{question[activeQuestionIndex].text}</h2>
        <ul id="answers">
          {shuffledAnswers.map((answer) => {
            const isSelected = userAnswers[userAnswers.length - 1] === answer;
            let cssClass = "";
            if (answerState === 'answered'&& isSelected ) {
              cssClass ='selected'
            }
            if ((answerState ==='correct' || answerState ==='wrong')&& isSelected) {
               cssClass =answerState
            }
            return (
              <li key={answer} className="answer">
                <button
                  onClick={() => handleSelectAnswer(answer)}
                  className={cssClass}
                >
                  {answer}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
