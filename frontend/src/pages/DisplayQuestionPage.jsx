import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeQuiz } from "../features/quiz/quizSlice";
import QuestionCard from "../components/QuestionCard";
const server_uri = import.meta.env.VITE_SERVER_URI;

const DisplayQuestionPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const topicName = useSelector((state) => state.topic.topicName); //getting topic from store
  const questions = useSelector((state) => state.quiz.quizQuestions);

  useEffect(() => {
    if (topicName) {
      fetchQuiz();
    }
  }, []);

  //function to fetch quiz and storing using redux
  async function fetchQuiz() {
    let response = await fetch(server_uri + "/api/quiz/topics/" + topicName, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    dispatch(changeQuiz(res)); //this will change the quiz question
  }

  //func to navigate to home page
  function handleClick() {
    navigate("/home");
  }

  return (
    <div className="quizBox">
      {topicName && questions.length ? (
        <div className="questionBox">
          <h2 style={{ color: "#0364cb" }}> {topicName} quiz</h2>
          <hr />
          <QuestionCard />
        </div>
      ) : (
        <p style={{ marginTop: "50px" }}>
          Topic Lost!! Go back to Home page to select topic.
          <br />
          <button className="homeReturnBtn" onClick={handleClick}>
            Home
          </button>
        </p>
      )}
    </div>
  );
};

export default DisplayQuestionPage;
