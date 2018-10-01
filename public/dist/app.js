$(document).ready(function() { 
  const key = 'AIzaSyD8nXukjpqQ1sswHOQM1AmJjXeREnMheiA';
  const channelId = 'UC0nY9haTmlxXRTyeXqoKWIQ';
  const URL = 'https://www.googleapis.com/youtube/v3/search';

  $('.favorites').click(getFavorites);
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
      <i class="far fa-heart heart m-1" id="${videoId}" data-title="${title}" data-description="${description}"></i>
    </div>
    `);
    $('#' + videoId).click(saveFavorites);
  }

  function saveFavorites(event) {
    $(event.target).addClass('red fas').removeClass('far');
    let newFavorite = {
      videoId: event.target.id,
      title: $(event.target).data('title'),
      description: $(event.target).data('description'),
    }
    let oldFavorites = JSON.parse(localStorage.getItem('userFavorites'));
    let userFavorites;
    oldFavorites ? userFavorites = [...oldFavorites, newFavorite] : userFavorites = [newFavorite];
    localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
  }

  function getFavorites() {
    let userFavorites = JSON.parse(localStorage.getItem('userFavorites'));
    if(userFavorites) {
      $('.favoriteVideos').empty();
      userFavorites.forEach(item => showFavorites(item.videoId, item.title, item.description));
    }
  }

  function showFavorites(videoId, title, description) {
    $('.favoriteVideos').append(`
    <div class="d-flex flex-row my-3 mx-1 bg-light">
      <div class="m-auto">
      <iframe width="250" height="150" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div>
        <h5>${title}</h5>
        <p class="text-justify">${description}</p>
      </div>
      <i class="fas fa-trash-alt delete m-1" id="del${videoId}"></i>
    </div>
    `);
    $('#del' + videoId).click(deleteFavorite);
  }

  function deleteFavorite(event) {
    let deleteItem = event.target.id;
    let getItems = JSON.parse(localStorage.getItem('userFavorites'));
    getItems.forEach(function(item) {    
      if ('del' + item.videoId === deleteItem) {
        getItems.splice(item, 1);
      }
    });   
    localStorage.setItem('userFavorites', JSON.stringify(getItems));
    getFavorites();
  }
});