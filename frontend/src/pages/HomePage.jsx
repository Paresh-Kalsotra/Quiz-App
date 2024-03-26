import React from "react";
import { useEffect, useState } from "react";
import TopicCard from "../components/TopicCard";
const server_uri = import.meta.env.VITE_SERVER_URI;

const HomePage = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  //fetching topics from database
  async function fetchTopics() {
    let response = await fetch(server_uri + "/api/quiz/topics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let res_topics = await response.json();

    if (res_topics) {
      setTopics(res_topics);
    }
  }

  return (
    <div className="topicContainer">
      <ul>
        <h2>Welcome to the Quiz app.</h2>
        <li>
          Please select a topic from the options provided below to begin the
          test.
        </li>
        <li>
          Test will consist of five questions, with only one correct option per
          question.
        </li>
        <li>Attempt questions and submit to get your score.</li>
        <li>Good luck!</li>
      </ul>

      {topics.length ? (
        <div style={{ padding: "10px", display: "flex", flexWrap: "wrap" }}>
          {topics.map((item) => (
            <TopicCard key={item} topic={item} />
          ))}
        </div>
      ) : (
        <p>No quiz available. </p> //message if topic arr is empty
      )}
    </div>
  );
};

export default HomePage;
