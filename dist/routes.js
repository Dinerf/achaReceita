page('/', index);
page('/favorites', favorites);
page('/home', home);
page();

function index() {
  $('.results').removeClass('d-none');
  $('.favoriteVideos').addClass('d-none');
}

function favorites() {
  $('.results').addClass('d-none');
  $('.favoriteVideos').removeClass('d-none');
}

function home() {
  $('.results').removeClass('d-none');
  $('.favoriteVideos').addClass('d-none');
}