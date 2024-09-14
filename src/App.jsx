import React, { useEffect, useRef, useState } from "react";

const App = () => {
  let [questions, setQuestions] = useState([]);
  let [index, setIndex] = useState(0);
  let checkedInput = useRef([]);
  let [correctQuestions, setCorrectQuestions] = useState(0);
  let [questionsCompleted, setQuestionsCompleted] = useState(false);
  let [correctQuestionsArray, setQuestionsArray] = useState([]);
  let [incorrectQuestionsArray, setIncorrectQuestionsArray] = useState([]);
  let [alertCondition,setAlertCondition] = useState(false);
  let [questionsCategory,setCategory] = useState('General Knowledge');

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetch("https://the-trivia-api.com/v2/questions?categories=''");
        const dataFromApi = await data.json();
        console.log(dataFromApi);
        setQuestions(dataFromApi);
      } catch (error) {
        console;
      }
    }
    getData();
  }, []);

  function nextQuestion(index) {
    let checkedButton = checkedInput.current.find((input) => input.checked);
    if (checkedButton) {
      console.log(checkedButton.value)
      if (checkedButton.value === questions[index].correctAnswer) {
        setCorrectQuestions(correctQuestions + 1);
        let correctQuestionObject = {
          question: questions[index].question.text,
          answer: checkedButton.value,
        };
        correctQuestionsArray.push(correctQuestionObject);
        setQuestionsArray([...correctQuestionsArray]);
        console.log(correctQuestionsArray);
      } else {
        let incorrectQuestionObject = {
          question: questions[index].question.text,
          answer: checkedButton.value,
        };
        incorrectQuestionsArray.push(incorrectQuestionObject);
        setIncorrectQuestionsArray([...incorrectQuestionsArray]);
        console.log(incorrectQuestionsArray);
      }
      index < questions.length - 1
        ? setIndex(index + 1)
        : setQuestionsCompleted(true);
      checkedButton.checked = "";
    } else {
      setAlertCondition(true);
      setTimeout(()=>{
        setAlertCondition(false);
      },2000)
    }
  }

function previousQuestion(index){
  incorrectQuestionsArray.splice(index-1,1);
  setIncorrectQuestionsArray([...incorrectQuestionsArray]);
  correctQuestionsArray.splice(index-1,1);
  setQuestionsArray([...correctQuestionsArray]);
  console.log(incorrectQuestionsArray);
  setIndex(index -1);
  let checkedButton = checkedInput.current.find( input => input.checked)
  checkedButton.checked = ''
}

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  function tryAgain() {
    setQuestionsCompleted(!questionsCompleted);
    setIndex(index - 9);
    setCorrectQuestions(0);
    setQuestionsArray([]);
    setIncorrectQuestionsArray([]);
  }



  return (
    <div>
 <header className="flex items-center justify-center space-x-4 p-4 bg-gray-100 shadow-md">
    <svg
      className="w-8 h-8 text-blue-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 1v2m0 0a7 7 0 100 14 7 7 0 000-14zm0 0v2m0 4a2 2 0 11-2 2m0 4h2"
      />
    </svg>
    <h1 className="text-3xl font-semibold text-gray-800">Quiz App</h1>
  </header>
      {alertCondition ? (
  <div className="absolute inset-0 flex  justify-center h-fit mt-2">
    <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative shadow-lg" role="alert">
      <svg
        className="w-5 h-5 text-red-700 mr-2"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10A8 8 0 11-0.001 10 8 8 0 0118 10zm-9 4a1 1 0 102 0v-2a1 1 0 00-2 0v2zm0-6a1 1 0 112 0v4a1 1 0 00-2 0V8z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-semibold">Please select an answer</span>
    </div>
  </div>
) : null}

      {questions.length > 0 ? (
        
        !questionsCompleted ? (
          <div className="p-6 bg-white shadow-md rounded-lg max-w-xl mx-auto mt-1">
            {index < 1 ?    <div className="flex flex-col items-center justify-center p-6">
            <div className="flex items-center space-x-2 mb-4">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-6 h-6 text-indigo-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m16-10V5a4 4 0 10-8 0v6m8 0h-8"
      />
    </svg>
    <label for="category" className="text-lg font-semibold text-gray-700">
      Select Trivia Category
    </label>
  </div>
  <select id="category" className="p-2 border rounded-lg w-72 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <option value="general_knowledge">General Knowledge</option>
    <option value="arts_and_literature">Arts & Literature</option>
    <option value="film_and_tv">Film & TV</option>
    <option value="food_and_drink">Food & Drink</option>
    <option value="geography">Geography</option>
    <option value="history">History</option>
    <option value="music">Music</option>
    <option value="science">Science</option>
    <option value="society_and_culture">Society & Culture</option>
    <option value="sport_and_leisure">Sport & Leisure</option>
  </select>
</div> : null}
         
<div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 shadow-md rounded-lg mb-3">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-indigo-600"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"
      />
    </svg>
    <h1 className="text-xl font-bold text-gray-800">Category: Society & Culture</h1>
  </div>
            <div className="flex items-center space-x-2 mb-4">

              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 17l4 4m0 0l4-4m-4 4V3"
                ></path>
              </svg>

              <h1 className="text-xl font-semibold text-gray-800">
                Question #{index + 1} of {questions.length}
              </h1>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <svg
                className="w-10 h-10 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h8"
                ></path>
              </svg>

              <h1 className="text-2xl font-semibold text-gray-800">
                {questions[index].question.text}
              </h1>
            </div>

            <ul className="space-y-3">
              {shuffleArray([
                ...questions[index].incorrectAnswers,
                questions[index].correctAnswer,
              ]).map((item, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <input
                    className="form-radio text-blue-500 focus:ring-blue-400 scale-150"
                    type="radio"
                    name="choice"
                    id={item}
                    value={item}
                    ref={(el) => (checkedInput.current[idx] = el)}
                  />

                  <label
                    htmlFor={item}
                    className="text-gray-700 cursor-pointer text-xl"
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>

            {index < questions.length - 1 ? (
  <div className="flex gap-2">
    {index < 1 ? null : <button
    className="flex items-center justify-center space-x-2 px-4 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
    onClick={() => previousQuestion(index)}
  >
    <svg
  className="w-5 h-5"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10 19l-7-7m0 0l7-7m-7 7h18"
  ></path>
</svg>

    <span>Previous</span>
  </button>
}
    
  <button
    className="flex items-center justify-center space-x-2 px-4 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
    onClick={() => nextQuestion(index)}
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      ></path>
    </svg>
    <span>Next</span>
  </button>
  </div>
) : (
  <div className="flex gap-2">

  <button
    className="flex items-center justify-center space-x-2 px-4 py-2 mt-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
    onClick={() => previousQuestion(index)}
  >
    <svg
  className="w-5 h-5"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M10 19l-7-7m0 0l7-7m-7 7h18"
  ></path>
</svg>

    <span>Previous</span>
  </button>
  <button
    className="flex items-center justify-center space-x-2 px-4 py-2 mt-6 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
    onClick={() => nextQuestion(index)}
    >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12l5 5L20 7"
        ></path>
    </svg>
    <span>Submit</span>
  </button>
        </div>
)}


            
          </div>
        ) : (
          <div className="w-[500px] mx-auto mt-5">
            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md shadow-md">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l3 3L20 4M5 12h6m-6 4h6m4 4h2M5 20h3m7 0h3"
                  ></path>
              </svg>
              <h1 className="text-gray-800 font-bold text-xl">
                Questions Completed
              </h1>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-md shadow-md mt-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <h1 className="text-gray-800 font-bold text-xl">
                Correct Answers: {correctQuestions}
              </h1>
            </div>

            {correctQuestions >= 5 ? (
              <div>
                <div className="flex items-center justify-center space-x-2 bg-green-100 p-4 rounded-md">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                      ></path>
                  </svg>
                  <h1 className="text-green-800 font-semibold text-lg">
                    Congratulations! You have passed.
                  </h1>
                </div>
                <button
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200 mx-auto mt-2"
                  onClick={tryAgain}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.93 4.93a10.45 10.45 0 0114.14 0m0 0a10.45 10.45 0 010 14.14m-14.14 0a10.45 10.45 0 010-14.14M1 12h3m16 0h3m-10 9v3m0-22v3"
                    ></path>
                  </svg>
                  <span>Play Again</span>
                </button>
                <div className="flex justify-center mt-2 py-3">

                <div
  className="radial-progress bg-primary text-primary-content border-primary border-4 font-bold"
  style={{ "--value": `${correctQuestions * 10}` }}
  role="progressbar">
  {correctQuestions}0%
</div>
                </div>

                <div className="mt-6 flex flex-col  justify-between border border-gray-300 rounded-lg shadow-lg p-6 bg-gray-100">
  
  <div className=" bg-green-500 text-white p-5 rounded-lg m-3">
    <div className="flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10C22 6.486 17.514 2 12 2zm-2 14.59L7.707 14.3a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 1 0-1.414-1.414L10 15.59z" />
      </svg>
      <h1 className="text-center font-bold text-lg">Correct Answers & Their Questions</h1>
    </div>
    {correctQuestionsArray.length > 0 ? (
      correctQuestionsArray.map((item, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">Question {index + 1}: <span className="font-normal">{item.question}</span></h2>
          <p className="font-semibold">Answer: <span className="font-normal">{item.answer}</span></p>
        </div>
        
      ))
    ) : (
      <p className="text-center italic">No correct answer selected.</p>
    
    )}
  </div>

  
  <div className="bg-red-500 text-white p-5 rounded-lg m-3">
    <div className="flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10C22 6.486 17.514 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
      </svg>
      <h1 className="text-center font-bold text-lg">Incorrect Answers & Their Questions</h1>
    </div>
    {incorrectQuestionsArray.length > 0 ? (
      incorrectQuestionsArray.map((item, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">Question {index + 1}: <span className="font-normal">{item.question}</span></h2>
          <p className="font-semibold">Answer: <span className="font-normal">{item.answer}</span></p>
        </div>
      ))
    ) : (
      <p className="text-center italic">No incorrect answer selected.</p>
    )}
  </div>
</div>
              </div>
            ) : (
        <div>

              

              <div>
                
                <div className="flex items-center justify-center space-x-2 bg-red-100 p-4 rounded-md">
                  <svg
                    className="w-6 h-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                  <h1 className="text-red-800 font-semibold text-lg">
                    You have failed. Try again!
                  </h1>
                </div>

                <button
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200 mx-auto mt-2"
                  onClick={tryAgain}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.93 4.93a10.45 10.45 0 0114.14 0m0 0a10.45 10.45 0 010 14.14m-14.14 0a10.45 10.45 0 010-14.14M1 12h3m16 0h3m-10 9v3m0-22v3"
                      ></path>
                  </svg>
                  <span>Try Again</span>
                </button>
                <div className="flex justify-center mt-3">

                <div
  className="radial-progress bg-[gainsboro] text-red-500  border-black border-4 font-bold"
  style={{ "--value": `${correctQuestions * 10}` }}
  role="progressbar">
    {correctQuestions == 0 ? `${correctQuestions}%` : `${correctQuestions}0%`}
  
</div>
    </div>
                </div>
                <div className="mt-6 flex flex-col  justify-between border border-gray-300 rounded-lg shadow-lg p-6 bg-gray-100">
  
  <div className=" bg-green-500 text-white p-5 rounded-lg m-3">
    <div className="flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10C22 6.486 17.514 2 12 2zm-2 14.59L7.707 14.3a1 1 0 0 0-1.414 1.414l4 4a1 1 0 0 0 1.414 0l8-8a1 1 0 1 0-1.414-1.414L10 15.59z" />
      </svg>
      <h1 className="text-center font-bold text-lg">Correct Answers & Their Questions</h1>
    </div>
    {correctQuestionsArray.length > 0 ? (
      correctQuestionsArray.map((item, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">Question {index + 1}: <span className="font-normal">{item.question}</span></h2>
          <p className="font-semibold">Answer: <span className="font-normal">{item.answer}</span></p>
        </div>
        
      ))
    ) : (
      <p className="text-center italic">No correct answer selected.</p>
    
    )}
  </div>

  
  <div className="bg-red-500 text-white p-5 rounded-lg m-3">
    <div className="flex items-center justify-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12c0 5.514 4.486 10 10 10s10-4.486 10-10C22 6.486 17.514 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z" />
      </svg>
      <h1 className="text-center font-bold text-lg">Incorrect Answers & Their Questions</h1>
    </div>
    {incorrectQuestionsArray.length > 0 ? (
      incorrectQuestionsArray.map((item, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">Question {index + 1}: <span className="font-normal">{item.question}</span></h2>
          <p className="font-semibold">Answer: <span className="font-normal">{item.answer}</span></p>
        </div>
      ))
    ) : (
      <p className="text-center italic">No incorrect answer selected.</p>
    )}
  </div>
</div>

              </div>
            )}
          </div>
        )
      ) : (
        <div className="flex mt-[100px] justify-center min-h-screen">
  <div className="w-[100px] h-[100px] border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
</div>

      )}
    </div>
  );
};

export default App;
