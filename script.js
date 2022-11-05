var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");

function onSearch() {
  console.log(searchInput.value);
}

searchButton.addEventListener("click", onSearch);
