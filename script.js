const categoryListEl = document.getElementById('categories');
const categoryEls = document.querySelectorAll('.category');
const popupEl = document.getElementById('category-popup');
const popupCloseBtn = document.getElementById("close-popup");
const popupBackBtn = document.querySelector(".btn-back");
let curCate = "";

const categoryList = ["Animals", "Movies", "Sports"];

loadCategories();

function loadCategories() {
    categoryList.forEach(item => {
        const categoryEl = document.createElement('div');
        categoryEl.classList.add("category");

        categoryEl.addEventListener('click', () => {
            curCate = item.toLowerCase();
            loadVideoForPopup(curCate);

            popupEl.children[0].children[1].children[1].innerHTML = item;
            popupEl.classList.remove('hidden');
        })
        categoryEl.innerHTML = `<img src="res/${item}/image.jpg" alt="${item}">
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

categoryEls.forEach((categoryEl) => categoryEl.addEventListener('click', () => {
    curCate = categoryEl.children[1].children[0].innerHTML.toLowerCase();
    loadVideoForPopup(curCate);

    popupEl.children[0].children[1].children[1].innerHTML = curCate.charAt(0).toUpperCase() + curCate.slice(1);
    popupEl.classList.remove('hidden');

}));


popupCloseBtn.addEventListener('click', () => {
    // Stop the video player
    const frame = document.getElementById("video-frame");
    if (frame) {
        frame.setAttribute('src', "");
    }

    popupEl.classList.add('hidden');
});

