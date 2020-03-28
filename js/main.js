// Header

const header = document.getElementById('header');
const mainContent = document.getElementById("main-content");
let headerShow = mainContent.offsetTop;

window.addEventListener("scroll", toggleHeader);

function toggleHeader() {
    if (window.pageYOffset > headerShow) {
        header.classList.add("main__header--active");
    } else {
        header.classList.remove("main__header--active");
    }
}

// HEADER

const story = document.getElementById('story');
const fontPlus = document.getElementById('fontPlus');
const fontMinus = document.getElementById('fontMinus');
let zoomLvl = document.getElementById('zoom');

let fontSize = 2;

fontPlus.addEventListener('click', function(){
    getStoryLength();
    updateProgress();
    fontSize++;
    if (fontSize >= 6) {
        fontSize = 2;
        story.style.fontSize = "2rem";
    } else {
        story.style.fontSize = `${fontSize}rem`;
    }
    zoomLvl.innerText = `${fontSize}x`;
});

fontMinus.addEventListener('click', function(){
    getStoryLength();
    updateProgress();
    fontSize--;
    if (fontSize == 0) {
        fontSize = 2;
        story.style.fontSize = "2rem";
    } else {
        story.style.fontSize = `${fontSize}rem`;
    }
    zoomLvl.innerText = `${fontSize}x`;
});

// PROGRESS METER

const progress = document.getElementById('progress');

window.addEventListener("scroll", updateProgress);

function getStoryLength() {
    return story.clientHeight;
}

function updateProgress() {
    if (progress.classList.contains("main__header-progress--done")) {
        return;
    } else {
        let percent = 
        Math.floor((window.pageYOffset / getStoryLength()) * 100);
        if (percent <= 0) {
            progress.innerText = `0% read`;
        } else {
            progress.innerText = `${percent}% read`;
        }
    }
}

// SLIDE OUT MENU

const slideOutMenu = document.getElementById('main-menu');
const storyText = document.querySelector(".main__story");
const slideOutMenuContent = document.getElementById("main-menu-content")

function slideOut() {
    storyText.classList.toggle("main__story--menu-open");
    slideOutMenu.classList.toggle("main__menu--menu-open");
    slideOutMenuContent.classList.toggle("main__menu-content--menu-open");
};

slideOutMenu.addEventListener("click", slideOut);

// FORM

const menuOptions = document.getElementById('menu-form');
const hyphens = document.getElementById('hyphens');
const done = document.getElementById('done');
const themes = document.getElementById('themes');
const main = document .getElementById('main');

let selectedOptions = {
    hyphens: true,
    done: false,
    theme: "default"
}

function updateSettings(e) {
    e.preventDefault();
    selectedOptions.hyphens = hyphens.checked;
    selectedOptions.done = done.checked;
    selectedOptions.theme = themes.value;
    updateUI();
}

function updateUI() {
    if (selectedOptions.hyphens) {
        storyText.classList.add("main__story--hyphens");
    } else {
        storyText.classList.remove("main__story--hyphens");
    }
    if (selectedOptions.done) {
        progress.classList.add("main__header-progress--done");
        progress.innerHTML = "Completed  " + "<i class='fas fa-check'></i>";
        window.removeEventListener("scroll", updateProgress);
    } else {
        progress.classList.remove("main__header-progress--done");
        updateProgress();
        window.addEventListener("scroll", updateProgress);
    }

    main.className = `main main--${selectedOptions.theme}`;
}

updateUI();

menuOptions.addEventListener("submit", updateSettings);