$(document).ready(function() { 
  const key = 'AIzaSyD8nXukjpqQ1sswHOQM1AmJjXeREnMheiA';
  const channelId = 'UC0nY9haTmlxXRTyeXqoKWIQ';
  const URL = 'https://www.googleapis.com/youtube/v3/search'
  let userFavorites = [];

  $('.favorites').click(showFavorites);
  $('#searchBtn').click(() => {
    $('.results').html('');
    const options = {
      part: 'snippet',
      key: key,
      channelId: channelId,
      q: $('#searchInput').val(),
    }
    getData(options);
  });

  function getData(options) {
    $.getJSON(URL, options, function(data){
      getVideos(data.items);
      console.log(data);
      
    });
  }
  
  function getVideos(items){
    $.each(items, function(i, val) {
      showVideos(this.id.videoId, this.snippet.title, this.snippet.description);
    });
  }

  function showVideos(videoId, title, description) {
    $('.results').append(`
    <div class="d-flex flex-row my-3 mx-1 bg-light">
      <div class="m-auto">
      <iframe width="250" height="150" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div>
        <h5>${title}</h5>
        <p class="text-justify">${description}</p>
      </div>
      <i class="far fa-heart heart" id="${videoId}" data-title="${title}" data-description="${description}"></i>
    </div>
    `);
    $('#' + videoId).click(saveFavorites);
  }

  function saveFavorites(event) {
    $(event.target).toggleClass('red fas far');
    let newFavorite = {
      videoId: event.target.id,
      title: $(event.target).data('title'),
      description: $(event.target).data('description'),
    }
    userFavorites.push(newFavorite);
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
  }

  function showFavorites() {
    let a = localStorage.getItem('userFavorites');
    console.log(JSON.parse(a));
  }
});