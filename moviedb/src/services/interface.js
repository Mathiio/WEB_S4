import { getTrendMovies, getLatestMovies, getMoviesGenres } from '@services/moviesAPI.js';
import { getTrendSeries, getLatestSeries, getSeriesGenres } from '@services/seriesAPI.js';

export function getEntityAPI(entityType) {
  if (entityType === 'films') {
    return {
      getTrend: getTrendMovies,
      getLatest: getLatestMovies,
      getGenres: getMoviesGenres,
    };
  } else if (entityType === 'series') {
    return {
      getTrend: getTrendSeries,
      getLatest: getLatestSeries,
      getGenres: getSeriesGenres,
    };
  } else {
    throw new Error('Type d\'entité non pris en charge');
  }
}