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

const story = document.getElementById('story');
const fontPlus = document.getElementById('fontPlus');
const fontMinus = document.getElementById('fontMinus');
let zoomLvl = document.getElementById('zoom');

let fontSize = 2;

fontPlus.addEventListener('click', function(){
    getStoryLength();
    updateProgress();
    fontSize++;
    if (fontSize >= 5) {
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

const progress = document.getElementById('progress');

window.addEventListener("scroll", updateProgress);

function getStoryLength() {
    console.log(story.clientHeight);
    return story.clientHeight;
}

function updateProgress() {
    let percent = 
    Math.floor((window.pageYOffset / getStoryLength()) * 100);
    console.log(percent);
    progress.innerText = `${percent}% read`;
}