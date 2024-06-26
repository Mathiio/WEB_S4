import { getDate } from "@services/utils.js";

export async function getTrendMovies(movies_number) {
  try {
    let trendMovies = [];
    let uniqueNames = {};
    let max_page = 1;
    const today = await getDate(0);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
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

    trendMovies = trendMovies.slice(0, movies_number);
    return trendMovies;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getLatestMovies(movies_number) {
  try {
    let latestMovies = [];
    let uniqueNames = {};
    let max_page = 1;
    const today = await getDate(0);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((movie) => {
        if (
          !uniqueNames[movie.title] &&
          movie.vote_count > 10 &&
          movie.release_date <= today
        ) {
          latestMovies.push(movie);
          uniqueNames[movie.title] = true;
        }
      });
      if (latestMovies.length < movies_number) {
        max_page++;
      }
    }
    latestMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    latestMovies = latestMovies.slice(0, movies_number);
    return latestMovies;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function searchMovie(query, max_page) {
  try {
    let searchedMovie = [];

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr&query=${query}&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();
      const movies = data.results;

      searchedMovie.push(...movies);

      if (max_page > data.total_pages) {
        max_page = data.total_pages;
      }
    }
    return searchedMovie;
  } catch (error) {
    console.error("Erreur lors de la recherche de films:", error);
  }
}

export function sortMovies(movies, order) {
  movies.sort((a, b) => {
    if (order === "ascendant") {
      return a.title.localeCompare(b.title);
    } else if (order === "descendant") {
      return b.title.localeCompare(a.title);
    } else if (order === "notes") {
      return b.vote_average - a.vote_average;
    } else if (order === "dates") {
      return new Date(b.release_date) - new Date(a.release_date);
    }
  });
  return movies;
}

export async function getMovie(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails du film:", error);
  }
}

export async function getMovieRuntime(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    const data = await response.json();
    return data.runtime;
  } catch (error) {
    console.error("Erreur lors de la récupération du runtime du film:", error);
    return null;
  }
}

export async function getMoviesGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=fr`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Erreur lors du fetch des genres:", error);
  }
}

export async function getMoviesRandomGenre() {
  try {
    const genres = await getMoviesGenres();
    const randomIndex = Math.floor(Math.random() * genres.length);
    return genres[randomIndex];
  } catch (error) {
    console.error("Erreur lors de la sélection d'un genre aléatoire:", error);
  }
}

export async function getLatestMoviesByGenre(genreId, movies_number) {
  try {
    let latestMovies = [];
    let uniqueNames = {};
    let max_page = 1;
    const today = await getDate(0);
    const old = await getDate(4);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}&release_date.gte=${old}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((movie) => {
        if (
          !uniqueNames[movie.title] &&
          movie.vote_count > 10 &&
          movie.release_date <= today &&
          movie.genre_ids.includes(genreId.id)
        ) {
          latestMovies.push(movie);
          uniqueNames[movie.title] = true;
        }
      });
      if (latestMovies.length < movies_number) {
        max_page++;
      }
    }
    latestMovies.sort(
      (a, b) => new Date(b.release_date) - new Date(a.release_date)
    );
    latestMovies = latestMovies.slice(0, movies_number);
    return latestMovies;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function sortMoviesByMatch(genres, date, runtime, movies_number) {
  try {
    let matchMovies = [];
    let uniqueNames = [];
    let max_page = 1;
    let selectedAge = "";
    if (date === "young") {
      selectedAge = `&release_date.gte=${getDate(264)}`;
    } else if (date === "old") {
      selectedAge = `&release_date.lte=${getDate(264)}`;
    }

    while (matchMovies.length < movies_number) {
      const selectedGenres = genres.join(",");
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${max_page}&with_genres=${selectedGenres}${selectedAge}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      const data = await response.json();
      const pageResults = data.results.filter((movie) => {
        if (!uniqueNames[movie.title]) {
          uniqueNames[movie.title] = true;
          return true;
        }
        return false;
      });

      for (const movie of pageResults) {
        const movieRuntime = await getMovieRuntime(movie.id);
        if (movieRuntime !== null && movieRuntime <= runtime) { 
          const movieWithRuntime = {
            ...movie,
            runtime: movieRuntime
          };
          matchMovies.push(movieWithRuntime);
        }
      }

      max_page++;
    }
    console.log(matchMovies)
    return matchMovies;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getTrendMoviesByYear(year, movies_number) {
  try {
    let yearMovies = [];
    let uniqueNames = {};
    let max_page = 1;
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((movie) => {
        if (!uniqueNames[movie.title] && movie.vote_count > 10) {
          yearMovies.push(movie);
          uniqueNames[movie.title] = true;
        }
      });
      if (yearMovies.length < movies_number) {
        max_page++;
      }
    }
    yearMovies.sort((a, b) => b.vote_average - a.vote_average);
    yearMovies = yearMovies.slice(0, movies_number);
    return yearMovies;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getTrendMoviesByGenre(genreId, movies_number) {
  try {
    let trendMovies = [];
    let uniqueNames = {};
    let max_page = 1;

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((movie) => {
        if (
          !uniqueNames[movie.title] &&
          movie.vote_count > 10 &&
          movie.vote_average >= 7.7
        ) {
          trendMovies.push(movie);
          uniqueNames[movie.title] = true;
        }
      });
      trendMovies.filter((movie) => {
        movie.genre_ids.includes(genreId.id);
      });

      if (trendMovies.length < movies_number) {
        max_page++;
      }
    }
    trendMovies.sort((a, b) => b.vote_average - a.vote_average);
    trendMovies = trendMovies.slice(0, movies_number);
    return trendMovies;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}
