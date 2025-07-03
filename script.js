let questions = [
    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Williams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Bieber',
        'right_answer': 3
    },
    {
        'question': 'Was bedeutet das HTML Tag &lt;a&gt;?',
        'answer_1': 'Text Fett',
        'answer_2': 'Container',
        'answer_3': 'Ein Link',
        'answer_4': 'Kursiv',
        'right_answer': 3
    },
    {
        'question': 'Wie bindet man eine Website in eine Website ein?',
        'answer_1': '&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;',
        'answer_2': '&lt;iframe&gt;',
        'answer_3': '&lt;frame&gt;',
        'answer_4': '&lt;frameset&gt;',
        'right_answer': 2
    },
    {
        'question': 'Wie stellt man Text am BESTEN fett dar?',
        'answer_1': '&lt;strong&gt;',
        'answer_2': 'CSS nutzen',
        'answer_3': '&lt;bold&gt;',
        'answer_4': '&lt;b&gt;',
        'right_answer': 1
    },
    {
        'question': 'Welches Attribut kann man NICHT für Textarea verwenden?',
        'answer_1': 'readonly',
        'answer_2': 'max',
        'answer_3': 'from',
        'answer_4': 'spellcheck',
        'right_answer': 1
    },
    {
        'question': 'Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem Attribut title aus?',
        'answer_1': 'a[title]{...}',
        'answer_2': 'a > title {...}',
        'answer_3': 'a.title {...}',
        'answer_4': 'a=title {...}',
        'right_answer': 1
    },
    {
        'question': 'Wie definiert man in JavaScript eine Variable?',
        'answer_1': 'let 100 = rate;',
        'answer_2': '100 = let rate;',
        'answer_3': 'rate = 100;',
        'answer_4': 'let rate = 100;',
        'right_answer': 4
    },
];

let currentQuestion = 0;

let rightQuestions = 0;

let AUDIO_SUCCESS = new Audio('./assets/audio/success.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;

    showQuestion();
}

function showQuestion() {

    if(currentQuestion >= questions.length) {

        // Ende Quiz
        document.getElementById('end-screen').style = '';

        document.getElementById('question-body').style = 'display:none';

        document.getElementById('amount-of-questions').innerHTML = questions.length;
        document.getElementById('amount-correct-answers').innerHTML = rightQuestions;
        // document.getElementById('header-image').src = '';
        document.getElementById('progress-bar').innerHTML = '100%';
        document.getElementById('progress-bar').style = 'width: 100%';

    } else {
        
        // Normaler Quizverlauf

        // Progress Bar
        let percent = currentQuestion / questions.length;
        percent = Math.round(percent * 100);
        console.log(percent);
        document.getElementById('progress-bar').innerHTML = `${percent}%`;
        document.getElementById('progress-bar').style = `width: ${percent}%`;

        let question = questions[currentQuestion];

        document.getElementById('question-text').innerHTML = question['question'];

        document.getElementById('answer_1').innerHTML = question.answer_1;

        document.getElementById('answer_2').innerHTML = questions[currentQuestion].answer_2;

        document.getElementById('answer_3').innerHTML = questions[currentQuestion].answer_3;

        document.getElementById('answer_4').innerHTML = questions[currentQuestion].answer_4;

        document.getElementById('current-question').innerHTML = currentQuestion + 1;
    }
}

function answer(selection) {
    let question = questions[currentQuestion];

    console.log('Selected answer is', selection);

    // hier wird der letzte Buchstabe (Charachter) des Strings abgeschnitten und dieser in einer neuen Variable gespeichert
    let selectedQuestionNumber = selection.slice(-1);

    console.log(selectedQuestionNumber);

    console.log('Correct answer of current question is', question.right_answer);

    let idOfRightAnswer = `answer_${question.right_answer}`;

    if(selectedQuestionNumber == question.right_answer) {
        console.log('Richtige Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        console.log('Falsche Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {

    currentQuestion++;

    document.getElementById('next-button').disabled = true;

    resetAnswerButtons();

    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartQuiz() {

    // document.getElementById('header-image').src = '';

    currentQuestion = 0;

    rightQuestions = 0;

    document.getElementById('end-screen').style = 'display:none';

    document.getElementById('question-body').style = '';

    init();
}