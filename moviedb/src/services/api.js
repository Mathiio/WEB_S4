async function fetchTrendMovies() {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`);
      if (!response.ok) {
      throw new Error('Erreur lors de la requête');
      }
      const data = await response.json();
      return data.results;
  } catch (error) {
      console.error('Erreur lors du fetch de la requête:', error);
  }
}



export { fetchTrendMovies } 