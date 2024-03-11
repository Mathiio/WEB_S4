import {
  getTrendMovies,
  getLatestMovies,
  getMoviesGenres,
  searchMovie,
  sortMovies,
  getMovie,
  getLatestMoviesByGenre,
  getMoviesRandomGenre,
  sortMoviesByTime,
  sortMoviesByGenres,
  sortMoviesByDate,
  getTrendMoviesByYear,
  getTrendMoviesByGenre,
} from "@services/moviesAPI.js";
import {
  getTrendSeries,
  getLatestSeries,
  getSeriesGenres,
  searchSerie,
  sortSeries,
  getSerie,
  getLatestSeriesByGenre,
  getSeriesRandomGenre,
  sortSeriesByTime,
  sortSeriesByGenres,
  sortSeriesByDate,
  getTrendSeriesByYear,
  getTrendSeriesByGenre,
} from "@services/seriesAPI.js";

export function getEntityAPI(entityType) {
  if (entityType === "films") {
    return {
      getTrend: getTrendMovies,
      getLatest: getLatestMovies,
      getGenres: getMoviesGenres,
      searchMedia: searchMovie,
      sortMedias: sortMovies,
      getMedia: getMovie,
      getLatestMediasByGenre: getLatestMoviesByGenre,
      getRandomGenre: getMoviesRandomGenre,
      sortMediasByTime: sortMoviesByTime,
      sortMediasByDate: sortMoviesByDate,
      sortMediasByGenres: sortMoviesByGenres,
      getTrendByYear: getTrendMoviesByYear,
      getTrendByGenre: getTrendMoviesByGenre,
    };
  } else if (entityType === "series") {
    return {
      getTrend: getTrendSeries,
      getLatest: getLatestSeries,
      getGenres: getSeriesGenres,
      searchMedia: searchSerie,
      sortMedias: sortSeries,
      getMedia: getSerie,
      getLatestMediasByGenre: getLatestSeriesByGenre,
      getRandomGenre: getSeriesRandomGenre,
      sortMediasByTime: sortSeriesByTime,
      sortMediasByDate: sortSeriesByDate,
      sortMediasByGenres: sortSeriesByGenres,
      getTrendByYear: getTrendSeriesByYear,
      getTrendByGenre: getTrendSeriesByGenre,
    };
  } else {
    throw new Error("Type d'entité non pris en charge");
  }
}
