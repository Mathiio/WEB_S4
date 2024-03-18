import { getDate } from "@services/utils.js";

export async function getTrendSeries(series_number) {
  try {
    let trendSeries = [];
    let uniqueNames = {};
    let max_page = 1;
    const today = await getDate(0);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((serie) => {
        if (!uniqueNames[serie.name] && serie.first_air_date <= today) {
          trendSeries.push(serie);
          uniqueNames[serie.name] = true;
        }
      });
      if (trendSeries.length < series_number) {
        max_page++;
      }
    }
    trendSeries = trendSeries.slice(0, series_number);
    return trendSeries;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getLatestSeries(series_number) {
  try {
    let latestSeries = [];
    let uniqueNames = {};
    let max_page = 1;
    const today = await getDate(0);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((serie) => {
        if (
          !uniqueNames[serie.name] &&
          serie.vote_count > 10 &&
          serie.first_air_date <= today
        ) {
          latestSeries.push(serie);
          uniqueNames[serie.name] = true;
        }
      });
      if (latestSeries.length < series_number) {
        max_page++;
      }
    }
    latestSeries.sort(
      (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
    );
    latestSeries = latestSeries.slice(0, series_number);
    return latestSeries;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getSeriesGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${
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

export async function searchSerie(query, max_page) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=fr&query=${query}`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    const data = await response.json();
    const series = data.results;

    return series;
  } catch (error) {
    console.error("Erreur lors de la recherche de films:", error);
  }
}

export function sortSeries(series, order) {
  series.sort((a, b) => {
    if (order === "ascendant") {
      return a.name.localeCompare(b.name);
    } else if (order === "descendant") {
      return b.name.localeCompare(a.name);
    } else if (order === "notes") {
      return b.vote_average - a.vote_average;
    } else if (order === "dates") {
      return new Date(b.first_air_date) - new Date(a.first_air_date);
    }
  });
  return series;
}

export async function getSerie(serieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${serieId}?api_key=${
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

export async function getSeriesRandomGenre() {
  try {
    const genres = await getSeriesGenres();
    const randomIndex = Math.floor(Math.random() * genres.length);
    return genres[randomIndex];
  } catch (error) {
    console.error("Erreur lors de la sélection d'un genre aléatoire:", error);
  }
}

export async function getLatestSeriesByGenre(genreId, series_number) {
  try {
    let latestSeries = [];
    let uniqueNames = {};
    let max_page = 1;
    const today = await getDate(0);
    const old = await getDate(4);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}&release_date.gte=${old}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((serie) => {
        if (
          !uniqueNames[serie.title] &&
          serie.vote_count > 10 &&
          serie.first_air_date <= today &&
          serie.genre_ids.includes(genreId.id)
        ) {
          latestSeries.push(serie);
          uniqueNames[serie.name] = true;
        }
      });
      if (latestSeries.length < series_number) {
        max_page++;
      }
    }
    latestSeries.sort(
      (a, b) => new Date(b.first_air_date) - new Date(a.first_air_date)
    );
    latestSeries = latestSeries.slice(0, series_number);
    return latestSeries;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getSerieRuntime(serie) {
  const filteredSeries = [];
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${serie}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=fr-FR`
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la requête");
    }
    const data = await response.json();

    const episodeRuntimes = data.episode_run_time;
    const averageRuntime =
      episodeRuntimes.reduce((acc, cur) => acc + cur, 0) /
      episodeRuntimes.length;

    return averageRuntime;
  } catch (error) {
    console.error("Erreur lors du tri des séries par durée moyenne:", error);
  }
  return filteredSeries;
}

export async function sortSeriesByMatch(genres, date, runtime, series_number) {
  try {
    let matchSeries = [];
    let uniqueNames = {};
    let max_page = 1;
    let selectedAge = "";
    if (date === "young") {
      selectedAge = `&first_release_date.gte=${getDate(264)}`;
    } else if (date === "old") {
      selectedAge = `&first_release_date.lte=${getDate(264)}`;
    }

    while (matchSeries.length < series_number) {
      const selectedGenres = genres.join(",");
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${max_page}&with_genres=${selectedGenres}${selectedAge}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }

      const data = await response.json();
      const pageResults = data.results.filter((serie) => {
        if (!uniqueNames[serie.name]) {
          uniqueNames[serie.name] = true;
          return true;
        }
        return false;
      });
      for (const serie of pageResults) {
        const serieRuntime = await getSerieRuntime(serie.id);
        if (serieRuntime !== null && serieRuntime <= runtime) { 
          const serieWithRuntime = {
            ...serie,
            runtime: serieRuntime
          };
          matchSeries.push(serieWithRuntime);
        }
      }

      max_page++;
    }
    return matchSeries;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getTrendSeriesByYear(year, series_number) {
  try {
    let yearSeries = [];
    let uniqueNames = {};
    let max_page = 1;
    const startDate = new Date(`${year}-01-01`);
    const endDate = new Date(`${year}-12-31`);

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((serie) => {
        if (!uniqueNames[serie.name] && serie.vote_count > 10) {
          yearSeries.push(serie);
          uniqueNames[serie.name] = true;
        }
      });
      if (yearSeries.length < series_number) {
        max_page++;
      }
    }
    yearSeries.sort((a, b) => b.vote_average - a.vote_average);
    yearSeries = yearSeries.slice(0, series_number);
    return yearSeries;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}

export async function getTrendSeriesByGenre(genreId, series_number) {
  try {
    let trendSeries = [];
    let uniqueNames = {};
    let max_page = 1;

    for (let page = 1; page <= max_page; page++) {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=fr-FR&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
      const data = await response.json();

      data.results.forEach((serie) => {
        if (
          !uniqueNames[serie.name] &&
          serie.vote_count > 10 &&
          serie.vote_average >= 7.7
        ) {
          trendSeries.push(serie);
          uniqueNames[serie.name] = true;
        }
      });
      trendSeries.filter((serie) => {
        serie.genre_ids.includes(genreId.id);
      });

      if (trendSeries.length < series_number) {
        max_page++;
      }
    }
    trendSeries.sort((a, b) => b.vote_average - a.vote_average);
    trendSeries = trendSeries.slice(0, series_number);
    return trendSeries;
  } catch (error) {
    console.error("Erreur lors du fetch de la requête:", error);
  }
}
