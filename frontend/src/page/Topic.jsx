import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ThreadCard from "../components/ThreadCard";

import "./Topic.css";

import config from "../config.json";
import { AuthContext } from "../context/AuthContext";

export default function Topic() {
  const { id } = useParams();

  const [threads, setThreads] = useState([]);
  const [topicName, setTopicName] = useState("");

  const { setLoading } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(config.uri + `/topics/${id}`)
      .then((res) => setTopicName(res.data.name))
      .catch((err) => console.log(err));
    axios
      .get(config.uri + "/threads/?topic=" + id)
      .then((res) => setThreads(res.data))
      .catch((err) => {
        console.log(err);
      })
      .finally(setLoading(false));
  }, []);

  return (
    <section id="topic-page">
      <h2>{topicName || "Threads"}</h2>
      <div className="thread-list">
        {threads.map((thread, id) => {
          return (
            <ThreadCard
              title={thread.title}
              content={thread.content}
              commentCount={0}
              username={"John doe"}
              id={thread._id}
              key={id}
            />
          );
        })}
      </div>
    </section>
  );
}