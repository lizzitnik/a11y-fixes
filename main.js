const myQuestions = [
  {
    question: "At what temperature do you steam milk for hot drinks?",
    answers: {
      a: "180˚",
      b: "150˚",
      c: "140˚",
      d: "120˚"
    },
    correctAnswer: "b",
  },
  {
    question: "What's the difference between an upside down caramel macchiato and a vanilla latte?",
    answers: {
      a: "Type of syrup used",
      b: "Sequencing",
      c: "Caramel Drizzle",
      d: "There is no difference"
    },
    correctAnswer: "c",
  },
  {
    question: "How many shots of espresso go into a Grande chai tea latte?",
    answers: {
      a: "0",
      b: "1",
      c: "2",
      d: "3"
    },
    correctAnswer: "a",
  },
  {
    question: "What kind of shots go into a flat white?",
    answers: {
      a: "Long shots",
      b: "Espresso shots",
      c: "Decaf shots",
      d: "Ristretto shots"
    },
    correctAnswer: "d",
  },
  {
    question: "Which of these is not a seasonal drink?",
    answers: {
      a: "Pumpkin spice latte",
      b: "Peppermint mocha",
      c: "Chestnut praline latte",
      d: "Unicorn Frappuccino"
    },
    correctAnswer: "b",
  },
  {
    question: "How many pumps of vanilla go into a tall hot chocolate?",
    answers: {
      a: "0",
      b: "1",
      c: "2",
      d: "3"
    },
    correctAnswer: "b",
  },
  {
    question: "When a customer comes to you with a complaint, what is the best way to handle it?",
    answers: {
      a: "Tell them it's just coffee and maybe they should gain a little perspective",
      b: "Break down in tears so hopefully they'll feel sorry and leave",
      c: "Offer to take the matter outside and try not to get blood on your apron",
      d: "Apologize and offer to fix the problem any way you can"
    },
    correctAnswer: "d",
  },
  {
    question: "How many pumps of syrup go into a typical Venti iced drink?",
    answers: {
      a: "4",
      b: "5",
      c: "6",
      d: "7"
    },
    correctAnswer: "c",
  },
  {
    question: "What kind of milk goes into a flat white?",
    answers: {
      a: "Nonfat milk",
      b: "2% milk",
      c: "Whole milk",
      d: "Soy milk"
    },
    correctAnswer: "c",
  },
  {
    question: "What drink do all baristas hate to make?",
    answers: {
      a: "Pour-over",
      b: "Frappuccino",
      c: "Smoothie",
      d: "All the above"
    },
    correctAnswer: "d",
  },
  ];
  
const userAnswerArray = new Array(myQuestions.length);  

let questionNumber = 0;
let numCorrectAnswers = 0;


function removeStart() {
  $(".start-bar").hide();
}

function displayResults() {
  $('#results').text(`${numCorrectAnswers} / ${myQuestions.length}`);
}

function buildQuiz(currentQuestion) {
  
  const output = [];
  const answers = [];
   
  let quizContainer = document.getElementById("quiz-question-container");
      
  for (var letter in currentQuestion.answers) {

    answers.push(
      `<label>
      <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter}:
          ${currentQuestion.answers[letter]}
      </label>`
    );
  }
      
  output.push(
    `<div id="slide">
      <div class="question"> ${currentQuestion.question} </div>
      <div class="answers"> ${answers.join("")} </div>
    </div>`);
    
  quizContainer.innerHTML = output.join("");
  
  
  
  $(`[name=question${questionNumber}]`).on('change', function(event) {
    
      $('#submit').show();
      
  });
}

function showAnswers(currentQuestion) {

  const questionsString = buildQuiz(currentQuestion);
  
  $('#quiz-questions').html(questionsString);
}

function handleButtons(questionNumber) {
  
  const previousButton = document.getElementById("previous");
  
  if (questionNumber === 0) {
      $('#previous').hide();
  } else {
      $('#previous').show();
  }
}

function getNextQuestion() {
  questionNumber++;
  
  $('#current-question-number').text(`${questionNumber + 1} / ${myQuestions.length}`);
  
  handleButtons(questionNumber);
  return myQuestions[questionNumber];
}

function getPreviousQuestion() {
  questionNumber--;
  
  $('#current-question-number').text(`${questionNumber + 1} / ${myQuestions.length}`);
  
  handleButtons(questionNumber);
  return myQuestions[questionNumber];
}

function handleQuizStart() {
  $('.quiz-start-button').on('click', function(event) {
    
    event.preventDefault();
    
    questionNumber = -1;
    let currentQuestion = getNextQuestion();
    showAnswers(currentQuestion);
    
    removeStart();
    displayResults();
    
    $('.question-container').show();
  });
}

function handleSubmit() {
  $('#quiz-questions').on('submit', function(event) {
    
    event.preventDefault();
    
    let userAnswer = $(`input[name=question${questionNumber}]:checked`).val();
    console.log(new Date());
    $('#submit').hide();
    $('#next').show();
    
    userAnswerArray[questionNumber] = userAnswer;
    
    let currentQuestion = myQuestions[questionNumber];
    
    if (userAnswer === currentQuestion.correctAnswer) {
      
      $('.question-container').innerHTML = "CORRECT!";
      //$(this).parent().css('color', 'lightgreen');

      numCorrectAnswers++;
      
      $('.check-div').show();
      displayResults();
      
    } else {
      
      //$(this).parent().css('color', 'red');
      
      //$(`[value=${currentQuestion.correctAnswer}]`).parent().css('color', 'lightgreen');
      $('#correct-answer-span').text(`${currentQuestion.correctAnswer}`);
      $('.cross-div').show();
      displayResults();
    }
    
    if (questionNumber === myQuestions.length - 1) {
      $('#submit').hide();
      $('#next').hide();
      $('#finish').show();
    } 
    
    $(`[name=question${questionNumber}]`).attr('disabled', true);
  });
}

function handleNext() {
  $('#next').on('click', function(event) {
    
    event.preventDefault();
    
    let isChecked = $(`[name=question${questionNumber}]`).is(':checked');
    
    $('#check-img').hide();
    $('#cross-img').hide();
    $('#next').hide();
    $('.check-div').hide();
    $('.cross-div').hide();
    
    if (isChecked) {
      
      let currentQuestion = getNextQuestion();
      showAnswers(currentQuestion);
    } else {
      alert('Please check an answer');
    }
    
    let clickedAnswer = userAnswerArray[questionNumber];
    
    if(clickedAnswer){
      
      $(`[name=question${questionNumber}][value=${clickedAnswer}]`).attr('checked', true); 
      
      $('#next').show();
    
      $(`[name=question${questionNumber}]`).attr('disabled', true);
    }
  });
}

function handlePrevious() {
  $('#previous').on('click', function(event) {
    event.preventDefault();
    
    $('#next').show();
    $('.check-div').hide();
    $('.cross-div').hide();
    
    let currentQuestion = getPreviousQuestion();
    showAnswers(currentQuestion);
    
    let clickedAnswer = userAnswerArray[questionNumber];
    
    $(`[name=question${questionNumber}][value=${clickedAnswer}]`).attr('checked', true);
    
    $(`[name=question${questionNumber}]`).attr('disabled', true);
    
  });
}

function removeQuiz() {
  $('.question-container').hide();
}

function handleFinish() {
  $('#finish').on( 'click', function(event) {
    event.preventDefault();
    let isChecked = $(`[name=question${questionNumber}]`).is(':checked');
    
     if (isChecked) {
      removeQuiz();
      $('.final-page').show();

      $('#final-results').text(`${numCorrectAnswers} / ${myQuestions.length}`).css('color', '#036635');
    } else {
      alert('Please check an answer');
    }
  });
}

function handleRestart() {
  $('#restart-button').on('click', function(event) {
    event.preventDefault();

   location.reload();
  });
}

function handleQuiz() {
  handleQuizStart();
  handleSubmit();
  handleNext();
  handlePrevious();
  handleFinish();
  handleRestart();
}

$(handleQuiz);


