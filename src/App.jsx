import React, { useEffect, useRef, useState } from "react";

const App = () => {
  let [questions, setQuestions] = useState([]);
  let [index, setIndex] = useState(0);
  let checkedInput = useRef([]);
  let [correctQuestions,setCorrectQuestions] = useState(0);
  let [questionsCompleted,setQuestionsCompleted] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://the-trivia-api.com/v2/questions");
        const dataFromApi = await data.json();
        console.log(dataFromApi);
        setQuestions(dataFromApi);
      } catch (error) {
        console;
      }
    }
    getData();
  }, []);

  function nextQuestion() {

    let checkedButton = checkedInput.current.find(input => input.checked);
    if(checkedButton){
      if(checkedButton.value === questions[index].correctAnswer){
        console.log('correct');
        setCorrectQuestions(correctQuestions + 1);
      }
console.log(checkedButton.value)
index < questions.length - 1
  ? setIndex(index + 1)
  : setQuestionsCompleted(true);
      checkedButton.checked = '';
    }else{
      alert('Please select the question')
    }
    

  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  return (
    <>
      <h1 className="text-center text-3xl font-semibold">Quiz App</h1>


      {questions.length > 0 ? (
  !questionsCompleted ? (
    <div>
      <h1 className="text-xl">{questions[index].question.text}</h1>
      <ul>
        {shuffleArray([
          ...questions[index].incorrectAnswers,
          questions[index].correctAnswer,
        ]).map((item, idx) => (
          <li key={idx}>
            <input
              type="radio"
              name="choice"
              id={item}
              value={item}
              ref={(el) => (checkedInput.current[idx] = el)}
            />
            <label htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
      <button
        className="text-lg border-[1px] border p-[2px]"
        onClick={nextQuestion}
      >
        Next
      </button>
    </div>
  ) : (
    <div>

    <h1>Questions Completed</h1>
    <h1>Correct Answers {correctQuestions}</h1>
    {correctQuestions >= 5 ? <h1>You Are Pass</h1> : <h1>You Are Fail</h1>}
    </div>
  )
) : (
  <h1>Loading...</h1>
)}

     
    </>
  );
};

export default App;
