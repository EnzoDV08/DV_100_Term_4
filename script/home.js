const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");
const arrowsRight = document.querySelectorAll('.fa-chevron-right');
const arrowsLeft = document.querySelectorAll('.fa-chevron-left');

// Right arrows
arrowsRight.forEach((arrow, i) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
        const itemNumber = movieLists[i].querySelectorAll("img").length;
        const ratio = Math.floor(window.innerWidth / 270);
        if (itemNumber - (8 + clickCounter) + (7 - ratio) >= 0) {
            clickCounter++;
            movieLists[i].style.transform = `translateX(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value - 225
            }px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });
});

// Left arrows
arrowsLeft.forEach((arrow, i) => {
    let clickCounter = 0;
    arrow.addEventListener("click", () => {
        if (clickCounter > 0) {
            clickCounter--;
            movieLists[i].style.transform = `translateX(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value + 225
            }px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const ball = document.querySelector(".toggle-ball");
    const items = document.querySelectorAll(
        ".container, .movie-list-title, .navbar-container, .sidebar, .left-menu-icon, .toggle"
    );

    ball.addEventListener("click", () => {
        items.forEach(item => {
            item.classList.toggle("active");
        });
        ball.classList.toggle("active");
    });
    console.log(Math.floor(window.innerWidth/270));
});

document.getElementById("profileDropdownButton").addEventListener("click", function() {
    var dropdown = document.getElementById("profileDropdownContent");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
});

const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Function to fetch movies
async function fetchMovies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Function to update HTML with movie data
function updateMoviesOnHomepage(movies, container) {
    const movieListContainer = document.querySelector('.movie-list');
    movieListContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieListItem = document.createElement('div');
        movieListItem.classList.add('movie-list-item');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-list-item-img');
        movieImg.src = IMG_URL + movie.poster_path;
        movieImg.alt = movie.title;

        const movieTitle = document.createElement('span');
        movieTitle.classList.add('movie-list-item-title');
        movieTitle.textContent = movie.title;

        const movieDesc = document.createElement('p');
        movieDesc.classList.add('movie-list-item-desc');
        movieDesc.textContent = movie.overview;

        const movieRating = document.createElement('span'); // Create a new element for rating
        movieRating.classList.add('movie-list-item-rating');
        movieRating.textContent = `Rating: ${movie.vote_average}`;

        const watchButton = document.createElement('button');
        watchButton.classList.add('movie-list-item-button');
        watchButton.textContent = 'Watch';

        movieListItem.appendChild(movieImg);
        movieListItem.appendChild(movieTitle);
        movieListItem.appendChild(movieDesc);
        movieListItem.appendChild(movieRating); // Append the rating element
        movieListItem.appendChild(watchButton);

        movieListContainer.appendChild(movieListItem);
    });
}
// Fetch movies and update homepage
fetchMovies().then(movies => {
  const movieListContainer = document.querySelector('#new-releases .movie-list');
  updateMoviesOnHomepage(movies, movieListContainer);
});


