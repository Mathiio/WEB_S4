import { getTrendMovies, getLatestMovies, getMoviesGenres, searchMovie, sortMovies, getMovie, getLatestGenreMovies, getMoviesRandomGenre, sortMoviesByTime, sortMoviesByGenres, sortMoviesByDate } from '@services/moviesAPI.js';
import { getTrendSeries, getLatestSeries, getSeriesGenres, searchSerie, sortSeries, getSerie, getLatestGenreSeries, getSeriesRandomGenre, sortSeriesByTime, sortSeriesByGenres, sortSeriesByDate } from '@services/seriesAPI.js';

export function getEntityAPI(entityType) {
  if (entityType === 'films') {
    return {
      getTrend: getTrendMovies,
      getLatest: getLatestMovies,
      getGenres: getMoviesGenres,
      searchMedia: searchMovie,
      sortMedias: sortMovies,
      getMedia: getMovie,
      getLatestGenre: getLatestGenreMovies,
      getRandomGenre: getMoviesRandomGenre,
      sortMediasByTime: sortMoviesByTime,
      sortMediasByDate: sortMoviesByDate,
      sortMediasByGenres: sortMoviesByGenres
    };
  } else if (entityType === 'series') {
    return {
      getTrend: getTrendSeries,
      getLatest: getLatestSeries,
      getGenres: getSeriesGenres,
      searchMedia: searchSerie,
      getMedia: getSerie,
      getLatestGenre: getLatestGenreSeries,
      getRandomGenre: getSeriesRandomGenre,
      sortMediasByTime: sortSeriesByTime,
      sortMediasByDate: sortSeriesByDate,
      sortMediasByGenres: sortSeriesByGenres
    };
  } else {
    throw new Error('Type d\'entité non pris en charge');
  }
}