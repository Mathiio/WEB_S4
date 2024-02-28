function getImageUrl(posterPath) {
  return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : ''; 
}



function formatDate(dateString) {
  return dateString ? new Date(dateString).toLocaleDateString('fr-FR') : '';
}



async function filterByGenre(medias, selectedGenre) {
  if (selectedGenre === 'tout') {
      return medias; 
  } else {
      return medias.filter(media => media.genre_ids.includes(selectedGenre)); 
  }
}



export{ formatDate, getImageUrl, filterByGenre }