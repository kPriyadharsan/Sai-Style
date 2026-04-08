// Careers text animation
const careers = ["Priyadharsan", "Freelancer", "Engineer", "Innovator", "MERN Stack Developer"];
const typedText = document.getElementById("typed-text");
const articleSpan = document.getElementById("article");

let careerIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeSpeed = 100;
const deleteSpeed = 50;
const delayBetweenWords = 1500;

function getArticle(word) {
  const firstChar = word.trim().charAt(0).toLowerCase();
  return ['a', 'e', 'i', 'o', 'u'].includes(firstChar) ? "an" : "a";
}

function type() {
  const currentCareer = careers[careerIndex];
  const article = getArticle(currentCareer);
  articleSpan.textContent = article;

  if (isDeleting) {
    charIndex--;
    typedText.textContent = currentCareer.substring(0, charIndex);
  } else {
    charIndex++;
    typedText.textContent = currentCareer.substring(0, charIndex);
  }

  if (!isDeleting && charIndex === currentCareer.length) {
    isDeleting = true;
    setTimeout(type, delayBetweenWords);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    careerIndex = (careerIndex + 1) % careers.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
  }
}

type();
