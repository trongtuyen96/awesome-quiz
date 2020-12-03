const categoryListEl = document.getElementById('categories');
const categoryEls = document.querySelectorAll('.category');
const popupCateEl = document.getElementById('category-popup');
const popupCateCloseBtn = document.getElementById("close-popup");
const popupCateBackBtn = document.querySelector(".btn-back");
const popupCateGoBtn = document.querySelector(".btn-go");

const popupQuizEl = document.getElementById('quiz-popup');
const popupQuizCloseBtn = document.getElementById("close-quiz-popup");


var curCate = "";

const categoryList = ["Animals", "Movies", "Sports"];
var quizList = "";
var curQuiz = 0;

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
    await loadQuizs();
    loadSingleQuiz(0);
})

popupQuizCloseBtn.addEventListener('click', () => {
    popupQuizEl.classList.add('hidden');
})


async function loadQuizs(category, difficulty, set) {
    const URL = "https://opentdb.com/api.php?amount=50&category=27&type=multiple"
    const res = await fetch(URL);
    const resData = await res.json();

    console.log(resData.results);
    quizList = resData.results;
}

function loadSingleQuiz(position) {
    const quizEl = document.querySelector(".quiz");

    const quizNumberEl = document.querySelector(".current-quiz");
    const quizTotalEl = document.querySelector(".total-quiz");

    quizNumberEl.innerHTML = "#"+ (++curQuiz);
    quizTotalEl.innerHTML = "of 50"

    quizEl.innerHTML = quizList[position].question;
    var answerArray = [quizList[position].correct_answer, quizList[position].incorrect_answers[0], quizList[position].incorrect_answers[1], quizList[position].incorrect_answers[2]]
    shuffleArray(answerArray);

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
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const btnQuizNext = document.querySelector(".next");
btnQuizNext.addEventListener('click', () => {
    loadSingleQuiz(++curQuiz);
})