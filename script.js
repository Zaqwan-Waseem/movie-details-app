const searchForm = document.querySelector('form')
const movieContainer = document.querySelector('.movie-container')
const inputBox = document.querySelector('.inputBox')

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try {
        const myApiKey = "f873a3a3";
        const URL =  `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
        const response =  await fetch(URL);

        if(!response.ok) {
            throw new Error("Unable to Fetch Movie Data");
        }

        const data = await response.json();
        showMovieData(data)
    }
    catch(error) {
        showErrorMessage("No movie found")
    }
   
}

// function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
    // use Destructuring Assingment to extract properties from Data obj
    const {Title , imdbRating , Genre , Released ,Runtime , Actors , Plot , Poster} = data;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `<h2>${Title}</h2> 
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    movieContainer.appendChild(movieElement);

    const movieGenreElement = document.createElement("div");
    movieGenreElement.classList.add("movie-genre");
    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);
    movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p> 
                              <p><strong>Duration: </strong>${Runtime}</p>
                              <p><strong>Cast: </strong>${Actors}</p>
                              <p><strong>Plot: </strong>${Plot}</p>`;

    // creating a din for movie poster
    const moviePosterElement = document.createElement("div");
    moviePosterElement.classList.add("movie-poster");
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="">`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

// show error message

const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

// Handling form submission...
const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== "") {
        showErrorMessage("Fetching Movie Info...");
        getMovieInfo(movieName);
    } else {
        showErrorMessage("Enter Movie Name to get movie info");
    }
}

// Adding EventListner to seach form
searchForm.addEventListener("submit", handleFormSubmission);




