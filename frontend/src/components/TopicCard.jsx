import React from "react";
import { useDispatch } from "react-redux";
import { changeTopic } from "../features/topic/topicSlice";
import { useNavigate } from "react-router-dom";

const TopicCard = ({ topic }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(changeTopic(topic)); //changing topic using redux
    navigate("/quiz"); //navigating to quiz page
  };

  return (
    <div className="topicCard">
      <button onClick={handleClick}>{topic}</button>
    </div>
  );
};

export default TopicCard;
