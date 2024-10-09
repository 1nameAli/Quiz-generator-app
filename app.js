let questions = [
  {
    question: "What is the capital of Pakistan?",
    answers: ["Karachi", "Punjab", "Islamabad"],
    correctAnswer: 2,
  },
  {
    question: "Sofia is the capital of what country?",
    answers: ["Belgium", "Bulgaria", "Belarus"],
    correctAnswer: 1,
  },
  {
    question: "Which country’s flag contains an image of the country?",
    answers: ["Canada", "Cyprus", "India"],
    correctAnswer: 1,
  },
  {
    question: "What country refers to themselves as ‘Kiwis’",
    answers: ["Australia", "South Africa", "New Zealand"],
    correctAnswer: 2,
  },
];

let currQuestionIndex = 0;
let score = 0;
let userAns = null;  // Stores the selected answer
let ansButtons = document.querySelector(".answerButtons");  // Get container for answer buttons

// Start the quiz by displaying the first question
function startQuiz() {
  currQuestionIndex = 0;
  score = 0;
  displayQuestion();
}

// Function to display a question and answer options
function displayQuestion() {
  // Display the question text
  document.querySelector("#question").innerHTML = questions[currQuestionIndex].question;

  // Get the answers array for the current question
  let answers = questions[currQuestionIndex].answers;

  // Clear previous answer buttons
  ansButtons.innerHTML = ""; 
  userAns = null; // Reset the user answer when a new question loads

  // Loop through the answers and create buttons for each
  answers.forEach((answer, index) => {
    let button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("opt", "btn", "btn-outline-primary");  // Add classes for button styling
    
    // Add click event to capture the selected answer
    button.addEventListener("click", () => {
      userAns = index; // Capture the selected answer index
      highlightSelectedAnswer(button); // Apply highlight to selected button
    });

    // Append the answer button to the answer container
    ansButtons.appendChild(button);
  });

  // Create and append the "Next" button
  let nextBtn = document.createElement("button");
  nextBtn.innerHTML = "Next";
  nextBtn.classList.add("btn", "btn-primary", "mt-3"); // Styling for "Next" button

  nextBtn.addEventListener("click", function () {
    if (userAns === null) {
      alert("Please select an answer"); // Prevent proceeding if no answer is selected
    } else {
      // Check if the answer is correct and update score
      if (userAns === questions[currQuestionIndex].correctAnswer) {
        score++; // Increment score if the answer is correct
      }
      
      // Move to the next question or end the quiz if no more questions
      currQuestionIndex++;
      if (currQuestionIndex < questions.length) {
        displayQuestion(); // Load next question
      } else {
        showFinalScore(); // End the quiz and show score
      }
    }
  });

  // Append the "Next" button after the answer buttons
  ansButtons.appendChild(nextBtn);
}

// Function to apply styling to the selected answer
function highlightSelectedAnswer(selectedButton) {
  // Remove styling from all other buttons first
  let allButtons = document.querySelectorAll(".opt");
  allButtons.forEach(button => {
    button.classList.remove("btn-success"); // Remove the highlight class
    button.classList.add("btn-outline-primary"); // Revert to the default style
  });

  // Add highlight to the selected button
  selectedButton.classList.remove("btn-outline-primary");
  selectedButton.classList.add("btn-success"); // Highlight the selected answer
}

// Function to show the final score
function showFinalScore() {
  // Clear the question and answer area
  document.querySelector("#question").innerHTML = `Quiz Finished!`;
  ansButtons.innerHTML = `<h2>Your score: ${score} out of ${questions.length}</h2>`;

  // Add a "Restart" button to reset the quiz
  let restartBtn = document.createElement("button");
  restartBtn.innerHTML = "Restart Quiz";
  restartBtn.classList.add("btn", "btn-info", "mt-3");
  restartBtn.addEventListener("click", startQuiz); // Restart the quiz on click

  ansButtons.appendChild(restartBtn); // Append the "Restart" button
}

// Start the quiz when the page loads
startQuiz();


startQuiz();
