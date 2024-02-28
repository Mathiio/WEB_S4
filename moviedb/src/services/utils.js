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



async function getDate(include_month) {
  let date = new Date();
  date.setMonth(date.getMonth() - include_month);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}



export{ formatDate, getImageUrl, filterByGenre, getDate }