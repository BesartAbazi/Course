const tmdbKey = 'd8ac747b21e8beaaa9c47c9389b80e97';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

async function getGenres(){
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + genreRequestEndpoint + requestParams;
  
  try{
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const genres = jsonResponse.genres;
      return genres;
    }
  }
  catch(error){
    console.log(error);
  }
};

async function getMovies () {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = tmdbBaseUrl + discoverMovieEndpoint + requestParams;

  try{
    const response = await fetch(urlToFetch);
    if (response.ok){
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;

      return movies;
    }
  }
  catch(error){
    console.log(error);
  }
};

async function getMovieInfo (movie){
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl + movieEndpoint + requestParams;

  try{
    const response = await fetch(urlToFetch);
    if (response.ok){
      const movieInfo = await response.json();
      
      return movieInfo;
    }
  }
  catch(error){
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
async function showRandomMovie (){
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);

  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;