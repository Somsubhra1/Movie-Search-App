$(document).ready(() => {
  $("#searchForm").on("submit", event => {
    event.preventDefault();
    var searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

var getMovies = searchText => {
  axios
    .get(`http://www.omdbapi.com/?apikey=5d29f831&s=${searchText}`)
      .then(response => {
      var output = "";      
      if (response.data.Response === 'False') {          
        output = `<h2 class="mx-auto">Movie Not Found</h2>`;
          $("#movies").html(output);
          return;
      }
      output = "";
      var movies = response.data.Search;
    //   console.log(response);
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

var movieSelected = id => {
    sessionStorage.setItem('movieId', id);
    // window.location = 'movie.html';
    return false;
}

var getMovie = () => {
    var movieId = sessionStorage.getItem('movieId');
    axios
        .get(`http://www.omdbapi.com/?apikey=5d29f831&i=${movieId}`)
        .then(response => {
            // console.log(response);
            var movie = response.data;
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
                        <a href="index.html" target="_self" class="btn btn-secondary">
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
