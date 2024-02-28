import { getDate } from '@services/utils.js'


async function getTrendSeries(month_include, series_number, max_page) {
    try {
        let trendSeries = [];
        let uniqueNames = {};

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            const limitDate = await getDate(month_include);
            const filteredByDate = data.results.filter(serie => serie.first_air_date >= limitDate);
            const filteredByVote = filteredByDate.filter(serie => serie.vote_count >= 8)

            filteredByVote.forEach(serie => {
                if (!uniqueNames[serie.name]) {
                    trendSeries.push(serie);
                    uniqueNames[serie.name] = true; 
                }
            });

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }
        trendSeries.sort((a, b) => b.vote_average - a.vote_average);
        trendSeries = trendSeries.slice(0, series_number);
        return trendSeries;
    } catch (error) {
        console.error('Erreur lors du fetch de la requête:', error);
    }
}



  async function getLatestSeries(series_number, max_page) {
    try {
        let latestSeries = [];
        let uniqueNames = {};

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            const limitDate = await getDate(0)
            const filteredSeries = data.results.filter(serie => serie.first_air_date <= limitDate);

            filteredSeries.forEach(serie => {
                if (!uniqueNames[serie.name]) {
                    latestSeries.push(serie);
                    uniqueNames[serie.name] = true; 
                }
            });

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }
        latestSeries.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date))
        latestSeries = latestSeries.slice(0, series_number);
        return latestSeries;
    }
    catch (error) {
        console.error('Erreur lors du fetch de la requête:', error);
    }
}

  

async function getSeriesGenres() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${import.meta.env.VITE_API_KEY}&language=fr`);
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Erreur lors du fetch des genres:', error);
    }
}



  async function searchSerie(query, max_page){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${import.meta.env.VITE_API_KEY}&language=fr&query=${query}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        const series = data.results;

        return series; 
    } catch (error) {
        console.error('Erreur lors de la recherche de films:', error);
    }
}



async function sortSeries(series, order) {
    series.sort((a, b) => {
        if (order === 'ordre croissant') {
            return a.name.localeCompare(b.title);
        } else {
            return b.name.localeCompare(a.title);
        }
    });
    return series;
}



async function getSerie(serieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
        if (!response.ok) {
            throw new Error('Erreur lors de la requête');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du film:', error);
    }
  }



  async function getSeriesRandomGenre() {
    try {
        const genres = await getSeriesGenres();
        const randomIndex = Math.floor(Math.random() * genres.length);
        return genres[randomIndex];
    } catch (error) {
        console.error('Erreur lors de la sélection d\'un genre aléatoire:', error);
    }
  }
  



  async function getLatestGenreSeries(genreId, series_number, max_page) {
    try {
        let latestSeries = [];
        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            const currentDate = await getDate(0);
            const filteredByDate = data.results.filter(serie => currentDate >= serie.first_air_date)

            const filteredByGenre = filteredByDate.filter(serie => {
                return serie.genre_ids.includes(genreId.id);
            });

            latestSeries.push(...filteredByGenre);

            if (max_page > data.total_pages) {
                max_page = data.total_pages
            }
        }
        latestSeries.sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));
        latestSeries = latestSeries.slice(0, series_number);
        return latestSeries;
    }
    catch (error) {
        console.error('Erreur lors du fetch de la requête:', error);
    }
  }



  export { getTrendSeries, getLatestSeries, getSeriesGenres, searchSerie, sortSeries, getSerie, getLatestGenreSeries, getSeriesRandomGenre } 