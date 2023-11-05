// $(document).ready(function(){
//   let isResizing = false;
//   let lastDownX = 0;

//   const container = document.querySelector('.container');

//   container.addEventListener('mousedown', (e) => {
//       if (e.offsetX > container.offsetWidth - 10) {
//           isResizing = true;
//           lastDownX = e.clientX;
//       }
//   });

//   document.addEventListener('mousemove', (e) => {
//       if (isResizing) {
//           const offset = e.clientX - lastDownX;
//           container.style.width = `${container.offsetWidth + offset}px`;
//           lastDownX = e.clientX;
//       }
//   });

//   document.addEventListener('mouseup', () => {
//       isResizing = false;
//   });

//   const params = new URLSearchParams(window.location.search);
//   const movieId = params.get('id');

//   fetchMovieDetails(movieId).then(movie => {
//       const container = document.querySelector('.container');
//       const { title, overview, release_date, genres, director, cast, vote_average, runtime } = movie;

//       container.innerHTML = `
//           <h1 class="movie-title">${title}</h1>
//           <div class="trailer">
//               <iframe width="560" height="315" src="https://www.youtube.com/embed/0VH9WCFV6XQ?si=DT8Na2awSEmrVrLC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
//           </div>
//           <div class="details">
//               <h2>Movie Details</h2>
//               <p>${overview}</p>
//               <p><strong>Release Date:</strong> ${release_date}</p>
//               <p><strong>Genre:</strong> ${genres.map(genre => genre.name).join(', ')}</p>
//               <p><strong>Director:</strong> ${director}</p>
//               <p><strong>Starring:</strong> ${cast.map(actor => actor.name).join(', ')}</p>
//               <p><strong>Rating:</strong> ${vote_average}/10</p>
//               <p><strong>Duration:</strong> ${runtime} minutes</p>
//           </div>
//       `;
//   });
// });

// async function fetchMovieDetails(movieId) {
//   const MOVIE_URL = `${BASE_URL}/movie/${movieId}?${API_KEY}`;
//   try {
//       const response = await fetch(MOVIE_URL);
//       const data = await response.json();
//       return data;
//   } catch (error) {
//       console.error('Error fetching movie details:', error);
//       return null;
//   }
// }

const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Function to navigate to the watchlist page
function navigateToWatchlist() {
  window.location.href = 'watchlist.html'; // Replace with the actual URL of your watchlist page
}

$(document).ready(function(){
    let wathcTrailer = JSON.parse(sessionStorage.getItem('wathcTrailer'));
    const MOVIE_URL = `${BASE_URL}/movie/${wathcTrailer[0]}?${API_KEY}`;
  
    fetch(MOVIE_URL)
    .then(response => response.json())
    .then(data => {
        const movieDetailsContainer = document.querySelector('.movie-details-container');
  
        const movieTitle = data.title;
        const overview = data.overview;
        const releaseDate = data.release_date;
  
        let genre = [];
        for (let i = 0; i < data.genres.length; i++) {
            genre.push(data.genres[i].name);
        }
        genre = genre.join(', ');
  
        const director = "Emma Tammi"; // You can replace this with actual director data from the API
        const starring = "Josh Hutcherson, Matthew Lillard, Elizabeth Lail"; // You can replace this with actual cast data from the API
        const rating = data.vote_average; // Assuming the API provides the vote average
  
        const videoURL = `${BASE_URL}/movie/${wathcTrailer[0]}/videos?${API_KEY}`;
        fetch(videoURL)
        .then(response => response.json())
        .then(videoData => {
          const trailerKey = videoData.results.find(video => video.type === 'Trailer')?.key;
  
          const movieDetailsHTML = `
            <div class="container">
                <h1 class="movie-title">${movieTitle}</h1>
                <div class="trailer">
                    <div id="player">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
                <div class="buttons">
                    <button class="add-to-watchlist">Add to Watchlist</button>
                </div>
                <div class="details">
                    <h2>Movie Details</h2>
                    <p>${overview}</p>
                    <p><strong>Release Date:</strong> ${releaseDate}</p>
                    <p><strong>Genre:</strong> ${genre}</p>
                    <!--<p><strong>Director:</strong> ${director}</p>-->
                    <!--<p><strong>Starring:</strong> ${starring}</p>-->
                    <p><strong>Rating:</strong> ${rating}/10</p>
                </div>
            </div>
          `;
  
          movieDetailsContainer.innerHTML = movieDetailsHTML;
  
          // Adding event listener for "Add to Watchlist" button
          const addToWatchlistButton = document.querySelector('.add-to-watchlist');
          addToWatchlistButton.addEventListener('click', (event) => {
            event.preventDefault();
            let wathcTrailer = JSON.parse(sessionStorage.getItem('wathcTrailer'));
  
            const movieId = wathcTrailer[0];        
            let watchlist2 = JSON.parse(localStorage.getItem('watchlist2')) || [];      
        
            if (!watchlist2.includes(movieId)) {
                watchlist2.push(movieId);
                alert(`Added ${movieTitle} to watchlist.`);
            } else {
                alert(`${movieTitle} is already in watchlist.`);
            }
            
            localStorage.setItem('watchlist2', JSON.stringify(watchlist2));
          });
        })
        .catch(error => {
            console.error('Error fetching video data:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching movie details:', error);
    });
  });
  