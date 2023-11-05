$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();
  
      $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top
      }, 800, 'swing');
    });
  });
  $(document).ready(function(){
    $('.toggle-trailer').on('click', function() {
      $('.trailer-section').toggleClass('hidden');
    });
  });

  $(document).ready(function(){
    $('.watchlist-button').hover(
      function() {
        $(this).css('background-color', '#45a049');
      },
      function() {
        $(this).css('background-color', '#4caf50');
      }
    );
  });

  $(document).ready(function(){
    $('.toggle-comments').on('click', function() {
      $('.comment-section').toggleClass('hidden');
    });
  });
  $(document).ready(function(){
    $('.watchlist-button').on('click', function() {
      // Show modal
      $('#watchlistModal').modal('show');
    });
  });

  $(document).ready(function(){
    let player;
  
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'VIDEO_ID', // Replace with your YouTube video ID
        playerVars: {
          'playsinline': 1,
          'controls': 0,
          'rel': 0
        },
        events: {
          'onReady': onPlayerReady
        }
      });
    }
  
    function onPlayerReady(event) {
      event.target.pauseVideo(); // Pause the video when the player is ready
    }
  
    $('.play-button').on('click', function() {
      player.playVideo(); // Play the video when the button is clicked
      player.fullscreen(); // Request fullscreen mode
    });
  });