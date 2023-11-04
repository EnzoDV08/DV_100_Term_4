const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

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
    const main = document.querySelector('.movie-list');
    
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieListItem = document.createElement('div');
        movieListItem.classList.add("movie");

        const shortOverview = overview.length > 100 ? overview.substring(0, 100) + '...' : overview;

        movieListItem.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : "/assets/cinema.jpg"}" alt="${title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                ${shortOverview}
                <br/> 
                <a href="/pages/individual.html?id=${id}" class="know-more">Watch Trailer</a>
                <a href="/pages/individual.html?id=${id}" class="know-more-then">Add to watch list</a>
            </div>
        `;
        main.appendChild(movieListItem);
    });
}

// Fetch movies and update homepage
fetchMovies().then(movies => {
  const movieListContainer = document.querySelector('#new-releases .movie-list');
  updateMoviesOnHomepage(movies, movieListContainer);
});


// async function fetchMoviesFromAPI() {
//     try {
//       const response = await fetch('YOUR_API_URL'); // Replace 'YOUR_API_URL' with your actual API endpoint
//       const data = await response.json();
//       return data; // Make sure your API returns an array of movie objects
//     } catch (error) {
//       console.error('Error fetching movies:', error);
//       return [];
//     }
//   }

// fetchLatestMovie().then(movie => {
//     upd4ateFeaturedContent(movie);
// });


// Show Movies Images & Info

  

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


// Fetch movies and update homepage
fetchMovies().then(movies => {
    const movieListContainer = document.querySelector('#new-releases .movie-list');
    updateMoviesOnHomepage(movies, movieListContainer);
});


async function fetchMovieDetails(movieId) {
    const MOVIE_URL = `${BASE_URL}/movie/${movieId}?${API_KEY}`;
    try {
        const response = await fetch(MOVIE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const watchlistContainer = document.querySelector('.watchlist-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist2')) || [];

    if (watchlist.length > 0) {
        fetchMoviesByIds(watchlist).then(movies => {
            displayMoviesInWatchlist(movies, watchlistContainer);
        });
    } else {
        watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
    }
});

async function fetchMoviesByIds(movieIds) {
    const movies = [];
    for (const id of movieIds) {
        const movie = await fetchMovieDetails(id);
        movies.push(movie);
    }
    return movies;
}

function displayMoviesInWatchlist(movies, container) {
    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
            <img src="${poster_path ? IMG_URL + poster_path : "/assets/cinema.jpg"}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Watch Trailer <i class="fas fa-arrow-right"></i></button>
            </div>
        `;

        container.appendChild(movieEl);

        const watchTrailerButton = movieEl.querySelector('.know-more');
        watchTrailerButton.addEventListener('click', () => {
            showTrailer(id);
        });
    });
}
