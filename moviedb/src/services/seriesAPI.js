async function getTrendSeries(month_include, series_number, max_page) {
    try {
        let trendSeries = [];

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            let date = new Date();
            date.setMonth(date.getMonth() - month_include);
            let year = date.getFullYear();
            let month = String(date.getMonth() + 1).padStart(2, '0');
            let day = String(date.getDate()).padStart(2, '0');
            let formattedDate = `${year}-${month}-${day}`;
            const filteredSeries = data.results.filter(serie => serie.first_air_date >= formattedDate);

            trendSeries.push(...filteredSeries);

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

        for (let page = 1; page <= max_page; page++) {
            const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR&page=${page}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();

            latestSeries.push(...data.results);

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




  export { getTrendSeries, getLatestSeries, getSeriesGenres, searchSerie, sortSeries } 