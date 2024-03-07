import { getDate } from '@services/utils.js'



export async function getTrendMovies(movies_number) {
    try {
        let trendMovies = [];
        let uniqueNames = {};
        let max_page = 1; 
        const today = await getDate(0);

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();
            
            data.results.forEach((movie) => {
                if (!uniqueNames[movie.title] && movie.release_date <= today) {
                    trendMovies.push(movie);
                    uniqueNames[movie.title] = true;
                }
            });
            if (trendMovies.length < movies_number) {
                max_page++; 
            }
        }
        
        trendMovies = trendMovies.slice(0, movies_number)
        return trendMovies;
        
  } catch (error) {
      console.error('Erreur lors du fetch de la requête:', error);
  }
}



export async function getLatestMovies(movies_number) {
    try {
        let latestMovies = [];
        let uniqueNames = {};
        let max_page=1;
        const today = await getDate(0);

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            data.results.forEach((movie) => {
                if (!uniqueNames[movie.title] && movie.vote_count > 10 && movie.release_date <= today) {
                    latestMovies.push(movie);
                    uniqueNames[movie.title] = true;
                }
            });
            if (latestMovies.length < movies_number) {
                max_page++; 
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



export async function searchMovie(query, max_page){
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



export async function sortMovies(movies, order) {
    movies.sort((a, b) => {
        if (order === 'ascendant') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });
    return movies;
}



export async function getMovie(movieId) {
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



export async function getMovieRuntime(movieId) {
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



export async function getMoviesGenres() {
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



export async function getMoviesRandomGenre() {
  try {
      const genres = await getMoviesGenres();
      const randomIndex = Math.floor(Math.random() * genres.length);
      return genres[randomIndex];
  } catch (error) {
      console.error('Erreur lors de la sélection d\'un genre aléatoire:', error);
  }
}



export async function getLatestGenreMovies(genreId, movies_number) {
    try {
        let latestMovies = [];
        let uniqueNames = {};
        let max_page=1;
        const today = await getDate(0);

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            data.results.forEach((movie) => {
                if (!uniqueNames[movie.title] && movie.vote_count > 10 && movie.release_date <= today && movie.genre_ids.includes(genreId.id)) {
                    latestMovies.push(movie);
                    uniqueNames[movie.title] = true;
                }
            });
            if (latestMovies.length < movies_number) {
                max_page++; 
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



export async function sortMoviesByTime(movies, runtime) {
    const filteredMovies = [];
    for (const movie of movies) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();
            const movieRuntime = data.runtime;

            if (movieRuntime < runtime) {
                filteredMovies.push(movie);
            }
        } catch (error) {
            console.error('Erreur lors du tri des films par durée moyenne:', error);
        }
    }
    return filteredMovies;
}



export async function sortMoviesByGenres(selectedGenres, max_page) {
    try {
        let genresMovies = [];
        let uniqueNames = [];

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();
            const matchGenres = data.results.filter(movie => {
                return selectedGenres.every(genreId => movie.genre_ids.includes(genreId));
            });

            genresMovies.push(...matchGenres);
        }
        genresMovies = genresMovies.filter(movie => {
            if (!uniqueNames[movie.title]) {
                uniqueNames[movie.title] = true;
                return true;
            }
            return false; 
        });
        return genresMovies;
  } catch (error) {
      console.error('Erreur lors du fetch de la requête:', error);
  }
}



export async function sortMoviesByDate(movies, date) {
    let MoviesDate = [];
    const limitDate = await getDate(264)

    if (date === 'young') {
        MoviesDate = movies.filter(movie => movie.release_date > limitDate);
    } else if (date === 'old') {
        MoviesDate = movies.filter(movie => movie.release_date < limitDate);
    } else {
        MoviesDate = movies;
    }

    return MoviesDate;
}