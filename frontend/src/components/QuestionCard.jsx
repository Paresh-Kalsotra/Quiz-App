import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const server_uri = import.meta.env.VITE_SERVER_URI;

const QuestionCard = () => {
  const questions = useSelector((store) => store.quiz.quizQuestions);
  const [userResponses, setUserResponses] = useState([]);
  const [quesNo, setQuesNo] = useState(1);
  const [score, setScore] = useState(null);
  const question = questions[quesNo - 1]; //getting question based on question number

  const navigate = useNavigate();

  function handlePrev() {
    setQuesNo((q) => q - 1);
  }

  function handleNext() {
    setQuesNo((q) => q + 1);
  }

  //func to update the user responses
  function handleSelection(item) {
    setUserResponses((prevResponses) => [
      ...prevResponses.filter((response) => response._id !== question._id),
      { _id: question._id, answer: item.id },
    ]);
  }

  //func to submit response and give generate score
  async function handleSubmit() {
    if (!userResponses.length) {
      alert("You haven't attempted any question");
    }
    let response = await fetch(server_uri + "/api/quiz/topics/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userResponses),
    });

    const res = await response.json();

    setScore(res);
  }

  function handleReturn() {
    navigate("/home");
  }

  return (
    <>
      {score ? (
        <p>
          Your Score: {score}/5
          <br />
          Go back to Home to attempt another quiz.
          <br />
          <button className="homeReturnBtn" onClick={handleReturn}>
            Home
          </button>
        </p>
      ) : (
        <>
          <h3>
            {quesNo}. {question.title}
          </h3>
          {question.choices.map((item) => (
            <div key={item.id}>
              <button
                className={
                  userResponses.some(
                    (response) =>
                      response._id === question._id &&
                      response.answer === item.id
                  )
                    ? "activeSelection"
                    : "passiveSelection"
                }
                onClick={() => handleSelection(item)}
              >
                {item.content}
              </button>
              <br />
            </div>
          ))}

          <hr />
          {quesNo > 1 ? (
            <button
              className="quesbtn"
              style={{ float: "left" }}
              onClick={handlePrev}
            >
              Prev
            </button>
          ) : (
            <></>
          )}

          <button
            className="quesbtn"
            style={{ marginLeft: quesNo > 1 ? "30%" : "45%" }}
            onClick={handleSubmit}
          >
            Submit
          </button>

          {quesNo < 5 ? (
            <button
              className="quesbtn"
              style={{ float: "right" }}
              onClick={handleNext}
            >
              Next
            </button>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default QuestionCard;
