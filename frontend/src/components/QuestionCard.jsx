import React from "react";

const QuestionCard = ({ ques }) => {
  return (
    <>
      <p>{ques.title}</p>
      {ques.choices.map((choice) => (
        <>
          <input
            type="radio"
            name={ques._id}
            id={ques._id + choice.id}
            value={choice.id}
          />
          <label htmlFor={ques._id + choice.id}>{choice.content}</label>
          <br />
        </>
      ))}
    </>
  );
};

export default QuestionCard;
