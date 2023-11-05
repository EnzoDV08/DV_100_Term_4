const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tagsEl = document.getElementById("tags");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const current = document.getElementById("current");

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = "";
var totalPages = 100;

// Get Movie Genres

var selectedGenre = [];
setGenre();
function setGenre() {
  tagsEl.innerHTML = "";
  genres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("tag");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if (id == genre.id) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

// Highlight Tag
function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag) => {
    tag.classList.remove("highlight");
  });
  clearBtn();
  if (selectedGenre.length != 0) {
    selectedGenre.forEach((id) => {
      const hightlightedTag = document.getElementById(id);
      hightlightedTag.classList.add("highlight");
    });
  }
}

// Clear Highlighted Tag
function clearBtn() {
  let clearBtn = document.getElementById("clear");
  if (clearBtn) {
    clearBtn.classList.add("highlight");
  } else {
    let clear = document.createElement("div");
    clear.classList.add("tag", "highlight");
    clear.id = "clear";
    clear.innerText = "Clear x";
    clear.addEventListener("click", () => {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    });
    tagsEl.append(clear);
  }
}

// Get Movies
getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;
        totalPages = data.total_pages;

        current.innerText = currentPage;

        if (currentPage <= 1) {
          prev.classList.add("disabled");
          next.classList.remove("disabled");
        } else if (currentPage >= totalPages) {
          prev.classList.remove("disabled");
          next.classList.add("disabled");
        } else {
          prev.classList.remove("disabled");
          next.classList.remove("disabled");
        }

        tagsEl.scrollIntoView({ behavior: "smooth" });
      } else {
        main.innerHTML = `<div class="no-results">
        <h1>The <span class="searchItem">${search.value}</span> You have Searched</h1>
        <h2>No Results Found</h2>
        <img class="sad-face" src="/assets/sad-face.svg" alt="Error" />
        </div>`;
      }
    });
}

// Show Movies Images & Info
function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    const movieLink = document.createElement("a");
    movieLink.href = `individual.html?id=${id}`;

    movieLink.innerHTML = `
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
        <button class="add-to-watchlist" data-movie-id="${id}">Add to Watchlist</button>
      </div>
    `;

    movieEl.appendChild(movieLink);
    main.appendChild(movieEl);

    document.getElementById(id).addEventListener("click", () => {
      openNav(movie);
    });

    const addToWatchlistButton = movieEl.querySelector('.add-to-watchlist');
    addToWatchlistButton.addEventListener('click', (event) => {
      event.preventDefault();
      const movieId = event.target.dataset.movieId;
      
      let watchlist2 = JSON.parse(localStorage.getItem('watchlist2')) || [];
    
      if (!watchlist2.includes(movieId)) {
          watchlist2.push(movieId);
          alert(`Added ${title} to watchlist.`);
      } else {
          alert(`${title} is already in watchlist.`);
      }
  
      localStorage.setItem('watchlist2', JSON.stringify(watchlist2));
    });
  });
}



const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");

leftArrow.addEventListener("click", () => {
  if (activeSlide > 0) {
    activeSlide--;
  } else {
    activeSlide = totalVideos - 1;
  }

  showVideos();
});

rightArrow.addEventListener("click", () => {
  if (activeSlide < totalVideos - 1) {
    activeSlide++;
  } else {
    activeSlide = 0;
  }
  showVideos();
});

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Search Any Movie on Search Bar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

// Go to current, Next & Previous Page
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});

next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});

function pageCall(page) {
  let urlSplit = lastUrl.split("?");
  let queryParams = urlSplit[1].split("&");
  let key = queryParams[queryParams.length - 1].split("=");
  if (key[0] != "page") {
    let url = lastUrl + "&page=" + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    let a = key.join("=");
    queryParams[queryParams.length - 1] = a;
    let b = queryParams.join("&");
    let url = urlSplit[0] + "?" + b;
    getMovies(url);
  }
}

// function addToWatchlist(movie) {
//   consol.log('Test Watch list')
//   let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
//   // watchlist.push(movie);
//   localStorage.setItem('watchlist', JSON.stringify(watchlist));
//   updateWatchlistDisplay();
// }

function showAlert(message) {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert-container-2');
  alertContainer.innerHTML = `
      <div class="alert-message-2">${message}</div>
      <div class="alert-close-2"></div>
  `;
  document.body.appendChild(alertContainer);

  const alertClose = alertContainer.querySelector('.alert-close');

  alertClose.addEventListener('click', () => {
      alertContainer.classList.remove('active');
      setTimeout(() => {
          alertContainer.remove();
      }, 500);
  });

  setTimeout(() => {
      alertContainer.classList.add('active');
  }, 100);

  setTimeout(() => {
      alertContainer.classList.remove('active');
      setTimeout(() => {
          alertContainer.remove();
      }, 500);
  }, 5000);
}

showAlert('This is a sample alert message.');
let isResizing = false;
let lastDownX = 0;

const container = document.querySelector('.container');

container.addEventListener('mousedown', (e) => {
  if (e.offsetX > container.offsetWidth - 10) {
    isResizing = true;
    lastDownX = e.clientX;
  }
});

document.addEventListener('mousemove', (e) => {
  if (isResizing) {
    const offset = e.clientX - lastDownX;
    container.style.width = `${container.offsetWidth + offset}px`;
    lastDownX = e.clientX;
  }
});

document.addEventListener('mouseup', () => {
  isResizing = false;
});

