document.addEventListener("DOMContentLoaded", function() {

const quizData = [
  { question: "🎂 What's my date of birth?", options: ["10-12-2003", "05-05-2003", "01-01-2003", "12-10-2003"], answer: "10-12-2003" },
  { question: "🍲 What's my favorite food?", options: ["Pounded yam & Egusi soup", "Rice & Stew", "Jollof rice", "Beans & Plantain"], answer: "Pounded yam & Egusi soup" },
  { question: "⚽ What's my favorite sports team?", options: ["Barca", "Real Madrid", "Chelsea", "Man United"], answer: "Barca" },
  { question: "😱 What's something I'm afraid of?", options: ["Woman", "Heights", "Snakes", "Darkness"], answer: "Woman" },
  { question: "💰 Who is my biggest enemy?", options: ["Poverty", "Laziness", "Time", "Stress"], answer: "Poverty" },
  { question: "⭐ What's something I'm really good at?", input: true, inputMax: 20 },
  { question: "🎯 What do you want me to do in this new year?", input: true, inputMax: 20 },
  { question: "🗺️ Which tribe am I?", options: ["Babur", "Hausa", "Yoruba", "Igbo"], answer: "Babur" },
  { question: "👩‍👦 What's my mother's name?", options: ["Halima", "Aisha", "Zainab", "Fatima"], answer: "Halima" },
  { question: "🎵 What's my favorite singer?", options: ["Drake", "Burna Boy", "Wizkid", "Davido"], answer: "Drake" },
  { question: "💖 What's your favorite memory of us together?", input: true, inputMax: 50 },
  { question: "😍 What did you love about me?", input: true, inputMax: 50 },
  { question: "💌 I am single?", options: ["Yes", "No"], answer: "Yes" },
  
  { question: "👨‍👩‍👧‍👦 What is my position in my family?", options: ["Firstborn", "Middle Child", "Lastborn", "Only Child"], answer: "Firstborn" },
  { question: "🎨 What is my favorite hobby?", options: ["Reading", "Cooking", "Gaming", "Travelling"], answer: "Gaming" }, 
  { question: "💬 Describe me in three words.", input: true, inputMax: 25 },
];

const totalMCQuestions = quizData.filter(q => !q.input).length;
const optionLetters = ['A', 'B', 'C', 'D']; 

let currentQuestion = 0;
let score = 0;

function showQuestion() {
  if(currentQuestion >= quizData.length) {
    document.getElementById("quiz").innerHTML = `<h2>🎉 You scored ${score} out of ${totalMCQuestions} in the multiple-choice questions!</h2>
    <p>Thank you for your answers to the text questions ❤️</p>`;
    return;
  }

  const q = quizData[currentQuestion];
  if(q.input){
    document.getElementById("quiz").innerHTML = `
      <div class="question">${q.question}</div>
      <input type="text" id="textAnswer" maxlength="${q.inputMax}" placeholder="Type your answer here">
      <br>
      <button id="submitBtn">Submit ✅</button>
    `;
    document.getElementById("submitBtn").onclick = () => {
      currentQuestion++;
      showQuestion();
    };
  } else {
    let optionsHtml = "";
    q.options.forEach((option, index) => {
      // Using template literal and escaping single quotes for safety
      const safeOption = option.replace(/'/g, "\\'"); 
      
      // Added A, B, C, D prefix structure
      optionsHtml += `<button onclick="checkAnswer('${safeOption}')">
        <span class="option-prefix">${optionLetters[index]}</span> ${option}
      </button>`;
    });
    
    document.getElementById("quiz").innerHTML = `
      <div class="question">${q.question}</div>
      <div class="options">${optionsHtml}</div>
    `;
  }
}

window.checkAnswer = function(selected) {
  if(selected === quizData[currentQuestion].answer){
    score++;
  }
  currentQuestion++;
  showQuestion();
}

// Start button event
document.getElementById("startBtn").addEventListener("click", function(){
  showQuestion();
});

});
