document.addEventListener('DOMContentLoaded', function() {
    var watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    var watchlistElement = document.getElementById('watchlist');

    watchlist.forEach(function(movieId) {
        fetch(BASE_URL + "/movie/" + movieId + "?" + API_KEY)
            .then((res) => res.json())
            .then((data) => {
                var listItem = document.createElement('li');
                listItem.textContent = data.title;
                watchlistElement.appendChild(listItem);
            });
    });
});