import { getDate } from '@services/utils.js'



async function getTrendMovies(month_include, movies_number, max_page) {
    try {
        let trendMovies = [];

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            const limitDate = await getDate(month_include);
            const filteredByDate = data.results.filter(movie => movie.release_date >= limitDate)
            const filteredByVote = filteredByDate.filter(movie => movie.vote_count >= 20)

            trendMovies.push(...filteredByVote);

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }

        trendMovies.sort((a, b) => b.vote_average - a.vote_average);
        trendMovies = trendMovies.slice(0, movies_number);
        return trendMovies;
  } catch (error) {
      console.error('Erreur lors du fetch de la requête:', error);
  }
}



async function getLatestMovies(movies_number, max_page) {
    try {
        let latestMovies = [];

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            const limitDate = await getDate(0)
            const filteredMovies = data.results.filter(movie => movie.release_date <= limitDate);

            latestMovies.push(...filteredMovies);

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }
        latestMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        latestMovies = latestMovies.slice(0, movies_number);
        return latestMovies;
    }
    catch (error) {
        console.error('Erreur lors du fetch de la requête:', error);
    }
}



async function searchMovie(query, max_page){
    try {
        let searchedMovie = [];

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr&query=${query}&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();
            const movies = data.results;

            searchedMovie.push(...movies);

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }
        return searchedMovie;  
    } catch (error) {
        console.error('Erreur lors de la recherche de films:', error);
    }
}



async function sortMovies(movies, order) {
    movies.sort((a, b) => {
        if (order === 'ordre croissant') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });
    return movies;
}



 
async function getMovie(movieId) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
      if (!response.ok) {
          throw new Error('Erreur lors de la requête');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Erreur lors de la récupération des détails du film:', error);
  }
}



async function getMovieRuntime(movieId) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`);
      if (!response.ok) {
      throw new Error('Erreur lors de la requête');
      }
      const data = await response.json();
      return data.runtime;
  } catch (error) {
      console.error('Erreur lors de la récupération du runtime du film:', error);
      return null;
  }
}



async function getMoviesGenres() {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}&language=fr`);
      if (!response.ok) {
          throw new Error('Erreur lors de la requête');
      }
      const data = await response.json();
      return data.genres;
  } catch (error) {
      console.error('Erreur lors du fetch des genres:', error);
  }
}




async function getMoviesRandomGenre() {
  try {
      const genres = await getMoviesGenres();
      const randomIndex = Math.floor(Math.random() * genres.length);
      return genres[randomIndex];
  } catch (error) {
      console.error('Erreur lors de la sélection d\'un genre aléatoire:', error);
  }
}



async function getLatestGenreMovies(genreId, movies_number, max_page) {
    try {
        let latestMovies = [];
        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            const currentDate = await getDate(0);
            const filteredByDate = data.results.filter(movie => currentDate >= movie.release_date)

            const filteredByGenre = filteredByDate.filter(movie => {
                return movie.genre_ids.includes(genreId.id);
            });

            latestMovies.push(...filteredByGenre);

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }
        latestMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        latestMovies = latestMovies.slice(0, movies_number);
        return latestMovies;
    }
    catch (error) {
        console.error('Erreur lors du fetch de la requête:', error);
    }
}




export { getTrendMovies, getLatestMovies, getMovie, getMovieRuntime, getMoviesGenres, getMoviesRandomGenre, getLatestGenreMovies, searchMovie, sortMovies } 