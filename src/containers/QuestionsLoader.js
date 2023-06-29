import React, { useEffect } from 'react';
import axios from 'axios';

const QuestionsLoader = ({ questionCount, category, difficulty, saveQuestions,setIsRoomCreated }) => {
  useEffect(() => {
    const api_url = `https://opentdb.com/api.php?amount=${questionCount}&category=${category}&difficulty=${difficulty.toLowerCase()}&type=multiple`;

    axios
      .get(api_url)
      .then((response) => {
        console.log(response.data.results);
        saveQuestions(response.data.results);
        setIsRoomCreated(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [questionCount, category, difficulty, saveQuestions]);


};

export default QuestionsLoader;
