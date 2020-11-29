// const quizData = [{
//     question: 'How old is Tuyen?',
//     a: '10',
//     b: '17',
//     c: '24',
//     d: '100',
//     correct: 'c'
// },
// {
//     question: "What is the most used programming language in 2019?",
//     a: "Java",
//     b: "C",
//     c: "Python",
//     d: "JavaScript",
//     correct: "d",
// },
// {
//     question: "Who is the President of US?",
//     a: "Florin Pop",
//     b: "Donald Trump",
//     c: "Ivan Saldano",
//     d: "Mihai Andrei",
//     correct: "b",
// },
// {
//     question: "What does HTML stand for?",
//     a: "Hypertext Markup Language",
//     b: "Cascading Style Sheet",
//     c: "Jason Object Notation",
//     d: "Helicopters Terminals Motorboats Lamborginis",
//     correct: "a",
// },
// {
//     question: "What year was JavaScript launched?",
//     a: "1996",
//     b: "1995",
//     c: "1994",
//     d: "none of the above",
//     correct: "b",
// }
// ];

// const quiz = document.getElementById('quiz');
// const answerEls = document.querySelectorAll('.answer');
// const questionEl = document.getElementById('question');
// const a_text = document.getElementById('a_text');
// const b_text = document.getElementById('b_text');
// const c_text = document.getElementById('c_text');
// const d_text = document.getElementById('d_text');
// const submitBtn = document.getElementById('submit');

const categoryEls = document.querySelectorAll('.category');
const popupEl = document.getElementById('category-popup');
const popupCloseBtn = document.getElementById('close-popup');

// let currentQuiz = 0;
// let score = 0;

// loadQuiz();

// function loadQuiz() {
//     deselectAnswer();
//     const currentQuizData = quizData[currentQuiz];

//     questionEl.innerText = currentQuizData.question;
//     a_text.innerText = currentQuizData.a;
//     b_text.innerText = currentQuizData.b;
//     c_text.innerText = currentQuizData.c;
//     d_text.innerText = currentQuizData.d;
// }

// function getSelected() {
//     let answer = undefined;

//     answerEls.forEach((answerEl) => {
//         if (answerEl.checked) {
//             return answer = answerEl.id;
//         }
//     });

//     return answer;
// }

// function deselectAnswer() {
//     answerEls.forEach((answerEl) => {
//         answerEl.checked = false;
//     });
// }

// submitBtn.addEventListener('click', () => {
//     // check to see the answer
//     const answer = getSelected();

//     if (answer) {
//         if (answer === quizData[currentQuiz].correct) {
//             score++;
//         }
//         currentQuiz++;
//         if (currentQuiz < quizData.length) {
//             loadQuiz();
//         } else {
//             quiz.innerHTML = `
//             <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>

//             <button onClick="location.reload()">Reload</button>`;
//         }
//     }
// })

categoryEls.forEach((category) => category.addEventListener('click', () => {
    popupEl.classList.remove('hidden');
}));

popupCloseBtn.addEventListener('clicked', () => {
    // Stop the video player
    const frame = document.getElementById("video-frame");
    if (frame) {
        frame.setAttribute('src', "");
    }

    popupEl.classList.add('hidden');
});