const apiKey = "9HHQRQS55G";
const apiUrl = `https://api.openquizzdb.org/?key=${apiKey}&choice=4&categ=sports`;

// constructor Question
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(answer) {
    return answer === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

//constructor Quiz
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionCurrentIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.questionCurrentIndex];
  }

  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionCurrentIndex++;
  }

  hasEnded() {
    return this.questionCurrentIndex >= this.questions.length;
  }
}

// Quiz Display
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },

  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choice: function () {
    let choices = quiz.getCurrentQuestion().choices;

    function guessHandler(id, guess) {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        QuizApp();
      };
    }

    //Affichage choix + prise en compte
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quiz.questionCurrentIndex + 1} sur ${quiz.questions.length}`
    );
  },
  endQuiz: function () {
    let endQuiz = `
      <h1>Quiz terminé !</h1>
      <h3>Vous avez ${quiz.score} sur ${quiz.questions.length}
    `;
    this.elementShown("quiz", endQuiz);
  },
};

// Game Logic
function QuizApp() {
  if (quiz.hasEnded()) {
    // Ecran de fin
    display.endQuiz();
  } else {
    // Afficher les questions etc
    display.question();
    display.choice();
    display.progress();
  }
}

// Create Quizz
let quiz = new Quiz(questions);
QuizApp();
