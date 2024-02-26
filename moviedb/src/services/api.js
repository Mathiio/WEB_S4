async function getTrendMovies(month_include, movies_number) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
      if (!response.ok) {
      throw new Error('Erreur lors de la requête');
      }
      const data = await response.json();

      // Si date < formattedDate -> non conservé dans filteredMovies
      let date = new Date();
      date.setMonth(date.getMonth() - month_include);
      // +1 car mois commence à 0 ---- padStart pour éviter 2-> 02
      let year = date.getFullYear();
      let month = String(date.getMonth() + 1).padStart(2, '0');
      let day = String(date.getDate()).padStart(2, '0');
      let formattedDate = `${year}-${month}-${day}`;
      const filteredMovies = data.results.filter(movie => movie.release_date >= formattedDate);

      // Si négatif a dev b ---- Si positif b dev a
      const sortedMovies = filteredMovies.sort((a, b) => b.vote_average - a.vote_average);

      // Conserver les élémeents de 0 à movies_number
      const limitedMovies = sortedMovies.slice(0, movies_number);

      return limitedMovies;
  } catch (error) {
      console.error('Erreur lors du fetch de la requête:', error);
  }
}



async function getLatestMovies(movies_number) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr-FR`);
      if (!response.ok) {
      throw new Error('Erreur lors de la requête');
      }
      const data = await response.json();

      // Si négatif a dev b ---- Si positif b dev a
      const sortedMovies = data.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      // Conserver les élémeents de 0 à movies_number
      const limitedMovies = sortedMovies.slice(0, movies_number);

      return limitedMovies;
  } catch (error) {
      console.error('Erreur lors du fetch de la requête:', error);
  }
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



async function getGenres() {
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







export { getTrendMovies, getLatestMovies, getMovie, getMovieRuntime, getGenres } 