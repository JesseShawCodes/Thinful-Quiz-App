$(function () {
  beginQuiz();
  handleAnswerFeedback();
  handleAnswerSubmits();
  renderQuestionCard();
});

var state = {
  questions: [
    {
      question: 'Who was the founder of Moog?',
      answers: ['Travis Moog',
                'Steve Moog',
                'Bill Moog',
                'Robert Moog'],
      correctAnswer: 'Robert Moog'
    },
    {
      question: 'What was the first musical instrument that the Moog founder invented?',
      answers: ['The Sampler',
                'The Drum Machine',
                'Electric Guitar',
                'The Thermin'],
      correctAnswer: 'The Thermin' 
    },
    {
      question: 'The Moog factory is currently located in what city?',
      answers: ['Santa Fe, NM', 
                'Miami, FL',
                'Asheville, NC',
                'Tulsa, OK'],
      correctAnswer: 'Asheville, NC'
    },
    {
      question: 'A Moog snythesizer is',
      answers: ['Monophonic',
                'Polyphonic', 
                'Hydrosonic',
                'Supersonic'],
      correctAnswer: 'Monophonic'
    },
    {
      question: 'The main source of sound in a synthesizer chain starts with a (an)',
      answers: ['amplifier',
                'oscilator',
                'string',
                'modulator'],
      correctAnswer: 'oscilator'
    },
    {
      question: 'Which of the following is not a Moog synthesizer model?',
      answers: ['Voyager',
                'Model D',
                'Sub Phatty',
                'R3'],
      correctAnswer: 'R3'
    },
    {
      question: 'Starting in 2004, Moog launched an annual music festival known as ',
      answers: ['Moogchella',
                'Moogapalooza',
                'Moogfest',
                'The Moog Synthesizer festival'],
      correctAnswer: 'Moogfest'
    },
    {
      question: 'In June 2015, Moog sold half of it\'s company to',
      answers: ['Korg',
                'their shareholders',
                'their employees',
                'Apple'],
      correctAnswer: 'their employees'
    },
    {
      question: 'Which of the following is not a type of filter in a synthesizer?',
      answers: ['Band Pass',
                'Formant',
                'Low Pass',
                'Overpass'],
      correctAnswer: 'Overpass'
    },
    {
      question: 'Which of the following is not a type of wave an oscilator can create?',
      answers: ['Triangle Wave',
                'Sine Wave',
                'Ocean Wave',
                'Sawtooth Wave'],
    correctAnswer: 'Ocean Wave'
    }
  ],
  currentQuestionIndex: 0,
  correctCount: 0,

};

//Quiz Reset//
function resetQuiz() {
  state.correctCount = 0
  state.currentQuestionIndex = 0;
}

//Question Cards, prompts, choices//
function renderQuestionCard() {
  var currentQuestionObj = state.questions[state.currentQuestionIndex];
  renderQuestionPrompt();
  renderQuestionChoices(currentQuestionObj.answers);
}

/*Question prompt.*/
function renderQuestionPrompt() {
  var progressHTML = '<span>(' + (state.currentQuestionIndex + 1) + '/' + state.questions.length + ') </span>'
  var questionText = state.questions[state.currentQuestionIndex].question;
  $('.question-text').html(progressHTML + questionText);
}

function renderQuestionChoices(answers) { //array
  $('#question-form label').each(function (index, label) {
    $(this).find('input').attr('value', answers[index]);
    $(this).find('input').prop('checked', false); //render choices without previous selection.
    $(this).find('span').text(answers[index]);
  });
}

function renderFinalResults() {
  $('.question').addClass('hidden');
  $('#start-quiz-over').removeClass('hidden');
  var element = $('.js-final-results');
  element.html('<h2>' + 'You got ' + state.correctCount + ' out of ' + state.questions.length + ' right!' + '</h2>');
  handleQuizRestart();
}

function checkAnswer(userChoice) {
  var correctChoice = state.questions[state.currentQuestionIndex].correctAnswer;
  if (userChoice == correctChoice) {
    state.correctCount++;
    renderQuestionFeedback(true);
    state.currentQuestionIndex++;
  } else if(userChoice == undefined){
    renderQuestionFeedback('unanswered');
  } else {
    renderQuestionFeedback(false);
    state.currentQuestionIndex++;
  }
  if (state.currentQuestionIndex == state.questions.length) {
    renderFinalResults()
  } else {
    renderQuestionCard();
  }
}


function renderQuestionFeedback(boolean) {
  var feedback = $('.popup-inner');
  if (boolean == true){
    feedback.find('h2').text('Correct! You\'re robot rockin!');
    feedback.find('img').attr('src', 'https://media.giphy.com/media/lrIAlkASMniSs/giphy.gif');
    feedback.removeClass('hidden');
  } else if (boolean == false){
    feedback.find('h2').text('Sorry, that wasn\'t correct.');
    feedback.find('img').attr('src', 'https://media.giphy.com/media/e7XO0rWSOZIk0/giphy.gif');
    feedback.removeClass('hidden');
  } else if (boolean == 'unanswered'){
    feedback.find('h2').text('Make a Decision!');
    feedback.find('img').attr('src', 'https://media.giphy.com/media/HAlTyTIpnM3rq/giphy.gif');
    feedback.removeClass('hidden');
  }
}

/*
Start quiz function
*/
function beginQuiz() {
  $('.start').click(function (e) {
    $('.question').removeClass('hidden');
    $('.start').addClass('hidden');
  });
}

/*
Restart quiz functions
*/

function handleQuizRestart() {
  $('#start-quiz-over').on('click', function (e) {
    $('.question').removeClass('hidden');
    $('#start-quiz-over').addClass('hidden');
    $('.js-final-results').text('');
    resetQuiz();
    renderQuestionCard();
  });
}

/*
answer submission functions
*/

function handleAnswerSubmits() {
  $('.submit').click(function (e) {
    e.preventDefault();
    var userChoice = $('input[name="answerChoice"]:checked').val();
    checkAnswer(userChoice);
  });
}

/*
answer feedback functions
*/

function handleAnswerFeedback() {
  //OPEN MODAL
  $('.submit').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-open');
    $('[data-popup="' + targetPopupClass + '"]').fadeIn(250);
    e.preventDefault();
  });
  //CLOSE MODAL
  $('#close-feedback-modal').on('click', function (e) {
    var targetPopupClass = $(this).attr('data-popup-close');
    $('[data-popup="' + targetPopupClass + '"]').fadeOut(250);
    e.preventDefault();
  });
}
