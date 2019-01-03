$(document).ready(() => {
    // handling submit event and setting sessionStorage
    $("#searchForm").on("submit", event => {
        event.preventDefault();
        var searchText = $("#searchText").val();        
        var movieSearch = [];
        movieSearch[0] = searchText;
        sessionStorage.setItem('movieId', JSON.stringify(movieSearch));
        getMovies(searchText);
  });
});

// Fetching movies
var getMovies = () => {
    var searchText = JSON.parse(sessionStorage.getItem("movieId"))[0];
    // Validation check
    if (!searchText) {
      return;
    }
    $('#searchText').val(searchText); 
    
    // calling to OMdb API
    axios
    .get(`http://www.omdbapi.com/?apikey=5d29f831&s=${searchText}`)
      .then(response => {
      var output = "";  
      // Not Found check    
      if (response.data.Response === 'False') {          
        output = `<h2 class="mx-auto">Movie Not Found</h2>`;
          $("#movies").html(output);
          return;
      }
      output = "";
      var movies = response.data.Search;
    //   console.log(response);
      // Designing output
      $.each(movies, (index, movie) => {
        output += `
            <div class="col-md-3">
                <div class="text-center card card-body bg-light">
                    <img src="${movie.Poster}" alt="${movie.Title} Poster" class="img img-fluid">
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="movie.html">
                    Movie Details
                    </a>
                </div>
            </div>`;
      });
      $("#movies").html(output);
    })
    .catch(error => {
      console.log(error);
    });
};

// setting movieId to sessionStorage
var movieSelected = id => {
    var movieSearch = JSON.parse(sessionStorage.getItem('movieId'));
    movieSearch[1] = id;
    sessionStorage.setItem('movieId', JSON.stringify(movieSearch));
    // sessionStorage.setItem('movieId', id);
    // window.location = 'movie.html';
    return false;
}

// fetching the selected movie by it's ID
var getMovie = () => {
    // var movieId = sessionStorage.getItem('movieId');
    var movieSearch = JSON.parse(sessionStorage.getItem("movieId"));
    movieId = movieSearch[1];    
    axios
        .get(`http://www.omdbapi.com/?apikey=5d29f831&i=${movieId}`)
        .then(response => {
            // console.log(response);
            var movie = response.data;
            // Designing output
            var output = `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster}" alt="${movie.Title}" class="img img-thumbnail img-fluid">
                    </div>
                    <div class ="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>BoxOffice: </strong>${movie.BoxOffice}</li>
                            <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDb Rating: </strong>${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Language: </strong>${movie.Language}</li>
                            <li class="list-group-item"><strong>Runtime: </strong>${movie.Runtime}</li>
                            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                        </ul>
                    </div>
                </div> 
                <div class="row">
                    <div class="card card-body bg-light">
                        <h3>Plot:</h3>
                        ${movie.Plot}
                        <hr> 
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary mb-3">
                        View IMDb
                        </a>
                        <a target="_self" class="btn btn-secondary" onclick="getMovies()" href="index.html">
                        Go back
                        </a>
                    </div>
                </div>         
            `;
            $("#movie").html(output);            
        })
        .catch(error => {
            console.log(error);
        });
}