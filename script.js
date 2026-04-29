let stories = [];
let currentIndex = 0;

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const card = document.querySelector(".card");
const form = document.getElementById("testimonialForm");

prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

form.addEventListener("submit", function(event) {
   event.preventDefault();

   let nameInput = document.getElementById("name").value;
   let storyInput = document.getElementById("comments").value;

   stories.push({ name: nameInput, story: storyInput });
   
   // SAVE to localStorage
   localStorage.setItem("stories", JSON.stringify(stories));

   currentIndex = stories.length - 1;
   displayStory(currentIndex);

   form.reset();
});

let savedStories = localStorage.getItem("stories");

if (savedStories) {
   stories = JSON.parse(savedStories);
}

function showNext() {
   if (stories.length === 0) return;

   card.classList.add("slide-left");

   setTimeout(() => {
      currentIndex = (currentIndex + 1) % stories.length;
      displayStory(currentIndex);
      card.classList.remove("slide-left");
   }, 300);
}

function showPrev() {
   if (stories.length === 0) return;

   card.classList.add("slide-right");

   setTimeout(() => {
      currentIndex = (currentIndex - 1 + stories.length) % stories.length;
      displayStory(currentIndex);
      card.classList.remove("slide-right");
   }, 300);
}

function displayStory(index) {
   document.getElementById("story").textContent = stories[index].story;
   document.getElementById("displayName").textContent = "~ " + stories[index].name;
}