document.addEventListener('DOMContentLoaded', function() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const watchlistContainer = document.getElementById('watchlist');

    watchlist.forEach(movieId => {
        fetch(`https://api.example.com/movie/${movieId}`)
            .then(response => response.json())
            .then(movieData => {
                const movieElement = document.createElement('div');
                movieElement.classList.add('movie-list-item');

                const titleElement = document.createElement('h2');
                titleElement.textContent = movieData.title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = movieData.description;

                movieElement.appendChild(titleElement);
                movieElement.appendChild(descriptionElement);
                watchlistContainer.appendChild(movieElement);
            })
            .catch(error => console.error('Error fetching movie data:', error));
    });
});