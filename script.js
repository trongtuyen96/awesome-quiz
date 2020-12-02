const categoryListEl = document.getElementById('categories');
const categoryEls = document.querySelectorAll('.category');
const popupEl = document.getElementById('category-popup');
const popupCloseBtn = document.getElementById("close-popup");
const popupBackBtn = document.querySelector(".btn-back");

const popupGoBtn = document.querySelector(".btn-go");
const popupQuizEl = document.getElementById('quiz-popup');
const popupQuizCloseBtn = document.getElementById("close-quiz-popup");


var curCate = "";

const categoryList = ["Animals", "Movies", "Sports"];

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
            popupEl.classList.remove('hidden');
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

popupCloseBtn.addEventListener('click', () => {
    // Stop the video player
    const frame = document.getElementById("video-frame");
    if (frame) {
        frame.setAttribute('src', "");
    }

    popupEl.classList.add('hidden');
});


popupGoBtn.addEventListener('click',()=> {
    popupQuizEl.classList.remove('hidden');
})

popupQuizCloseBtn.addEventListener('click',()=> {
    popupQuizEl.classList.add('hidden');
})
