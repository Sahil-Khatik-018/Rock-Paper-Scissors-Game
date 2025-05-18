let userScore = 0;
let compScore = 0;

// Load high score from localStorage or default to 0
let highScore = localStorage.getItem("highScore") || 0;

const choices = document.querySelectorAll(".choice");
const msgPara = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const highScorePara = document.querySelector("#high-score");

// Set the initial high score on the UI
highScorePara.innerText = highScore;

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

const drawGame = () => {
  msgPara.innerText = "Draw! Try again.";
  msgPara.style.backgroundColor = "#0a1e3b";
};

const updateHighScore = () => {
  if (userScore > highScore) {
    highScore = userScore;
    localStorage.setItem("highScore", highScore);
    highScorePara.innerText = highScore;
  }
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msgPara.innerText = `You win! ${userChoice} beats ${compChoice}`;
    msgPara.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msgPara.innerText = `You lose! ${compChoice} beats ${userChoice}`;
    msgPara.style.backgroundColor = "red";
  }

  updateHighScore();
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    const userWin =
      (userChoice === "rock" && compChoice === "scissors") ||
      (userChoice === "paper" && compChoice === "rock") ||
      (userChoice === "scissors" && compChoice === "paper");

    showWinner(userWin, userChoice, compChoice);
  }
};

// Add event listeners to choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Add reset functionality
const resetBtn = document.getElementById("reset-btn");
if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msgPara.innerText = "Play your move!";
    msgPara.style.backgroundColor = "#0a1e3b";
  });
}
