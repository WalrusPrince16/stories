// DOM

const storyID = document.querySelector(".part").id;

// Take Reader Back To Last Position

init();

// Stores a unique bookmark for each story
let bookmarks = {}

// Sets the bookmark for the current story:
// If 1: 4343, 2: 3299, 3: 4343;
function initBookmarkData(prop) {
    if (bookmarks) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = {};
    }
    bookmarks[storyID] = prop;
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

const storyText = document.querySelector(".main__story");
const header = document.getElementById('header');
const mainContent = document.getElementById("main-content");
const story = document.getElementById('story');
const fontPlus = document.getElementById('fontPlus');
const fontMinus = document.getElementById('fontMinus');
let zoomLvl = document.getElementById('zoom');
let zoomBtns = document.querySelector('.main__header-font');
const progress = document.getElementById('progress');
const slideOutMenu = document.getElementById('main-menu');
const slideOutMenuContent = document.getElementById("main-menu-content");

// Header CSS

let headerShow = mainContent.offsetTop;

window.addEventListener("scroll", toggleHeader);

function toggleHeader() {
    if (window.pageYOffset > headerShow) {
        header.classList.add("main__header--active");
    } else {
        header.classList.remove("main__header--active");
    }
}

// Header Buttons

let fontSize = 2; // 2rem

function updateZoomLvl(e) {
    getStoryLength();
    updateProgress();
    const btn = e.target.classList;
    if (!(btn.contains('fas'))) {
        return;
    }
    const increment = btn.contains('fa-plus') ? 1 : -1;
    fontSize += increment;
    if (fontSize === 6 || fontSize === 0) {
        fontSize = 2;
        story.style.fontSize = "2rem";
    } else {
        story.style.fontSize = `${fontSize}rem`;
    }
    zoomLvl.innerText = `${fontSize}x`;
};

zoomBtns.addEventListener('click', updateZoomLvl);

// PROGRESS METER

window.addEventListener("scroll", updateProgress);

function getStoryLength() {
    return story.clientHeight;
}

function updateProgress() {
    saveProgress();
    if (progress.classList.contains("main__header-progress--done")) {
        return;
    } else {
        let percent = Math.floor((window.pageYOffset / getStoryLength()) * 100);
        if (percent <= 0) {
            progress.innerText = `0% read`;
        } else {
            progress.innerText = `${percent}% read`;
        }
    }
}

function saveProgress() {
    // Restore the header on page load
    toggleHeader();
    // localStorage.setItem('bookmark', window.pageYOffset.toString());
    initBookmarkData(window.pageYOffset.toString());
}

// SLIDE OUT MENU

function slideOut() {
    storyText.classList.toggle("main__story--menu-open");
    slideOutMenu.classList.toggle("main__menu--menu-open");
    slideOutMenuContent.classList.toggle("main__menu-content--menu-open");
};

slideOutMenu.addEventListener("click", slideOut);

// Settings Object

let selectedOptions = {
    hyphens: true,
    done: false,
    theme: "default"
};

// FORM

const menuOptions = document.getElementById('menu-form');
const hyphens = document.getElementById('hyphens');
const done = document.getElementById('done');
const themes = document.getElementById('themes');
const main = document.getElementById('main');

function updateSettingsViaForm(e) {
    e.preventDefault();
    updateSettings();
}

function updateSettings() {
    selectedOptions.hyphens = hyphens.checked;
    selectedOptions.done = done.checked;
    selectedOptions.theme = themes.value;
    localStorage.setItem('settings', JSON.stringify(selectedOptions));
    updateUI(JSON.parse(localStorage.getItem('settings')));
}

function updateUI(settings) {
    if (settings.hyphens) {
        storyText.classList.add("main__story--hyphens");
    } else {
        storyText.classList.remove("main__story--hyphens");
    }

    hyphens.checked = settings.hyphens;

    if (settings.done) {
        progress.classList.add("main__header-progress--done");
        progress.innerHTML = "100% read " + "<i class='fas fa-check'></i>";
        window.removeEventListener("scroll", updateProgress);
    } else {
        progress.classList.remove("main__header-progress--done");
        updateProgress();
        window.addEventListener("scroll", updateProgress);
    }
    
    done.checked = settings.done;
    main.className = `main main--${settings.theme}`;
    themes.value = settings.theme;
    console.log(main.className);
}

updateUI(JSON.parse(localStorage.getItem('settings')) ? JSON.parse(localStorage.getItem('settings')) : selectedOptions);

menuOptions.addEventListener("submit", updateSettingsViaForm);

// Done Reading Button

const doneReading = document.getElementById("doneReading");

doneReading.addEventListener("click", function () {
    let userSettings = JSON.parse(localStorage.getItem('settings'));
    done.checked = !(done.checked);
    userSettings.done = done.checked;
    updateSettings();
});

// Restore the Reader's Settings

function init() {
    let currentPlace = JSON.parse(localStorage.getItem('bookmarks'));
    if (currentPlace) {
        let scrollToPoint = currentPlace[storyID];
        window.scrollTo(0, scrollToPoint);
    }
}