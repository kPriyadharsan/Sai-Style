// The collections section __ search bar
// always the text start with Upper case

const input1 = document.getElementById("collections-search");

input1.addEventListener("input", () => {
  let value = input1.value;
  if (value.length > 0) {
    input1.value = value.charAt(0).toUpperCase() + value.slice(1);
  }
});


const input = document.getElementById("search-input");
const placeholderText = "Search color of the saree";
let index = 0;

function typePlaceholder() {
    if (index <= placeholderText.length) {
        input.placeholder = placeholderText.slice(0, index++);
        setTimeout(typePlaceholder, 100);
    } else {
        setTimeout(() => {
            index = 0;
            typePlaceholder();
        }, 2500);
    }
}
typePlaceholder();






// Search function >>>>
let searchInput = document.getElementById("search-input"); // Get search input
let cards = document.querySelectorAll(".my-card"); // Get all product cards
let noResultsMessage = document.getElementById("no-results-message"); // Get the "Coming Soon" message element

searchInput.addEventListener("keyup", (event) => {
  let enteredText = event.target.value.toUpperCase(); // Get the typed text, converted to uppercase
  let isAnyCardVisible = false; // Track if any card matches

  cards.forEach((card) => {
    let title = card.querySelector("h2").textContent.toUpperCase(); // Get card title

    if (title.includes(enteredText)) {
      card.style.display = "flex"; // Show card if title matches
      isAnyCardVisible = true; // At least one card is visible
    } else {
      card.style.display = "none"; // Hide card if title doesn't match
    }
  });

  // Show the "Coming Soon" message if no cards are visible
  if (!isAnyCardVisible) {
    noResultsMessage.style.display = "block"; // Show message
  } else {
    noResultsMessage.style.display = "none"; // Hide message if there are matching cards
  }
});

  



