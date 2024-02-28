import { getTrendMovies, getLatestMovies, getMoviesGenres, searchMovie, sortMovies } from '@services/moviesAPI.js';
import { getTrendSeries, getLatestSeries, getSeriesGenres, searchSerie, sortSeries } from '@services/seriesAPI.js';

export function getEntityAPI(entityType) {
  if (entityType === 'films') {
    return {
      getTrend: getTrendMovies,
      getLatest: getLatestMovies,
      getGenres: getMoviesGenres,
      searchMedia: searchMovie,
      sortMedias: sortMovies,
    };
  } else if (entityType === 'series') {
    return {
      getTrend: getTrendSeries,
      getLatest: getLatestSeries,
      getGenres: getSeriesGenres,
      searchMedia: searchSerie,
      sortMedias: sortSeries,
    };
  } else {
    throw new Error('Type d\'entité non pris en charge');
  }
}