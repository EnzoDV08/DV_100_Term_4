const IMG_URL = "https://image.tmdb.org/t/p/w500";

function removeFromWatchlist(movieId) {
  let watchlist = JSON.parse(localStorage.getItem('watchlist2')) || [];
  watchlist = watchlist.filter(id => id !== movieId);
  localStorage.setItem('watchlist2', JSON.stringify(watchlist));
  updateWatchlistDisplay();
}

function updateWatchlistDisplay() {
  let watchlist = JSON.parse(localStorage.getItem('watchlist2')) || [];
  const watchlistContainer = document.getElementById('watchlistContainer');
  watchlistContainer.innerHTML = "";

  watchlist.forEach((movieId) => {
    getMovieDetails(movieId);
  });
}

function getMovieDetails(movieId) {
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1cf50e6248dc270629e802686245c2c8`;

  fetch(movieUrl)
    .then((res) => res.json())
    .then((data) => {
      const { title, poster_path } = data;

      const movieItem = document.createElement('div');
      movieItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mb-4');
      movieItem.innerHTML = `
        <div class="card">
          <img src="${IMG_URL + poster_path}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <button class="btn btn-danger remove-from-watchlist" data-movie-id="${movieId}">Remove</button>
            <button class="btn btn-primary watch-movie" data-movie-id="${movieId}">Watch</button>
          </div>
        </div>
      `;

      movieItem.querySelector('.remove-from-watchlist').addEventListener('click', () => {
        removeFromWatchlist(movieId);
      });

      watchlistContainer.appendChild(movieItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  updateWatchlistDisplay();
});

