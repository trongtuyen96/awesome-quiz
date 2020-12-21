const categoryListEl = document.getElementById('categories');
const categoryEls = document.querySelectorAll('.category');
const popupCateEl = document.getElementById('category-popup');
const popupCateCloseBtn = document.getElementById("close-popup");
const popupCateBackBtn = document.querySelector(".btn-back");
const popupCateGoBtn = document.querySelector(".btn-go");

const popupQuizEl = document.getElementById('quiz-popup');
const popupQuizCloseBtn = document.getElementById("close-quiz-popup");

const correctQuizCountEl = document.querySelector(".correct-quiz-count");
const wrongQuizCountEl = document.querySelector(".wrong-quiz-count");
const correctQuizEl = document.querySelector(".correct-quiz");
const wrongQuizEl = document.querySelector(".wrong-quiz");


var curCate = "";

const categoryList = ["Books", "Movies", "Music",
    "Television", "Video Games", "Board Games", "Science & Nature",
    "Mythology", "Sports", "Geography", "History", "Art", "Celebrities",
    "Animals", "Vehicles", "Comics", "Anime & Manga", "Cartoon & Animations"];
const categoryCodeList = [10, 11, 12, 14, 15, 16, 17, 20, 21, 22, 23, 25,
    26, 27, 28, 29, 31, 32];
var quizList = "";
var curQuiz = 0;
var curAnswer = "";
var curCorrectAnswer = "";
var correctQuizCount = 0;
var wrongQuizCount = 0;

loadCategories();

function loadCategories() {
    categoryList.forEach(item => {
        const categoryEl = document.createElement('div');
        categoryEl.classList.add("category");
        curCate = item;

        categoryEl.addEventListener('click', () => {
            curCate = item;
            loadVideoForPopup(item.toLowerCase());

            document.getElementById("cate-title").innerHTML = curCate;
            popupCateEl.classList.remove('hidden');
        })
        categoryEl.innerHTML = `<img src="res/${curCate.toLowerCase()}/image.jpg" alt="${item}">
        <div class="category-body">
            <h4>${item}</h4>
        </div>`;

        categoryListEl.appendChild(categoryEl);
    })
}

function loadVideoForPopup(category) {
    const frame = document.getElementById("video-frame");
    frame.setAttribute('src', "res/" + category + "/video.mp4");
}

popupCateCloseBtn.addEventListener('click', () => {
    // Stop the video player
    const frame = document.getElementById("video-frame");
    if (frame) {
        frame.setAttribute('src', "");
    }

    popupCateEl.classList.add('hidden');
});

popupCateBackBtn.addEventListener('click', () => {
    // Stop the video player
    const frame = document.getElementById("video-frame");
    if (frame) {
        frame.setAttribute('src', "");
    }

    popupCateEl.classList.add('hidden');
});


popupCateGoBtn.addEventListener('click', async () => {
    popupQuizEl.classList.remove('hidden');
    await loadQuizs(curCate, "", "");
    loadSingleQuiz(0);
})

popupQuizCloseBtn.addEventListener('click', () => {
    popupQuizEl.classList.add('hidden');
})


async function loadQuizs(category, difficulty, amount) {
    // Reset
    curQuiz = 0;
    correctQuizCount = 0;
    wrongQuizCount = 0;
    correctQuizCountEl.innerHTML = correctQuizCount;
    wrongQuizCountEl.innerHTML = correctQuizCount;

    const code = categoryCodeList[categoryList.indexOf(category)];

    const URL = "https://opentdb.com/api.php?amount=50&category=" + code + "&type=multiple"
    const res = await fetch(URL);
    const resData = await res.json();

    console.log(resData.results);
    quizList = resData.results;
}

function loadSingleQuiz(position) {
    const cateHeaderEl = document.querySelector(".cate-header");
    const quizEl = document.querySelector(".quiz");

    const quizNumberEl = document.querySelector(".current-quiz");
    const quizTotalEl = document.querySelector(".total-quiz");

    cateHeaderEl.children[0].innerHTML = curCate + " Quiz";
    quizNumberEl.innerHTML = "#" + (++curQuiz);
    quizTotalEl.innerHTML = "of 50"

    quizEl.innerHTML = quizList[position].question;
    var answerArray = [quizList[position].correct_answer, quizList[position].incorrect_answers[0], quizList[position].incorrect_answers[1], quizList[position].incorrect_answers[2]]
    switch (shuffleArray(answerArray)) {
        case 0:
            curCorrectAnswer = "A";
            break;
        case 1:
            curCorrectAnswer = "B";
            break;
        case 2:
            curCorrectAnswer = "C";
            break;
        case 3:
            curCorrectAnswer = "D";
            break;
        default:
            break;
    }


    const answersEl = document.querySelector(".answers");
    answersEl.innerHTML = ""

    var quizOption = "A";
    answerArray.forEach(answer => {
        switch (answerArray.indexOf(answer)) {
            case 0:
                quizOption = "A";
                break;
            case 1:
                quizOption = "B";
                break;
            case 2:
                quizOption = "C";
                break;
            case 3:
                quizOption = "D";
                break;
            default:
                break;
        }
        const answerEl = document.createElement("li");
        answerEl.classList.add("answer");
        answerEl.innerHTML = `<span class="quiz-mark">${quizOption}</span>
        <span>${answer}</span>`;

        answersEl.appendChild(answerEl);
    })

    const answersBtn = document.querySelectorAll(".answer-select");
    console.log(answersBtn);
    answersBtn.forEach(ansBtn => {
        ansBtn.addEventListener('click', () => {
            curAnswer = ansBtn.children[0].innerHTML;
            console.log("curAnser: " + curAnswer);
        })
    })
}

function shuffleArray(array) {
    const correctAns = array[0];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.indexOf(correctAns);
}

const btnQuizNext = document.querySelector(".next");
btnQuizNext.addEventListener('click', () => {
    console.log("curCorrectAnswer" + curCorrectAnswer);
    if (curAnswer === curCorrectAnswer) {
        correctQuizCount++;
        correctQuizCountEl.innerHTML = correctQuizCount;
        correctQuizEl.classList.add("ping");
    }
    else {
        wrongQuizCount++;
        wrongQuizCountEl.innerHTML = wrongQuizCount;
        wrongQuizEl.classList.add("ping");
    }
    setTimeout(function () {
        correctQuizEl.classList.remove("ping");
        wrongQuizEl.classList.remove("ping");
    }, 400)

    loadSingleQuiz(curQuiz);
})