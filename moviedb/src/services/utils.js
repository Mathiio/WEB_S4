import Splide from '@splidejs/splide'
import '@splidejs/splide/dist/css/splide.min.css'



function initSlider(splideID) {
    const splideElement = document.getElementById(splideID)

    new Splide(splideElement, {
    type   : 'loop',
    perMove: 1,
    autoWidth: true,
    pagination: false,
    breakpoints: {
        740: {
            type   : 'loop',
            focus : 'center'
        },
    }
    }).mount();
}



function getImageUrl(posterPath) {
  return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : ''; 
}



function formatDate(dateString) {
  return dateString ? new Date(dateString).toLocaleDateString('fr-FR') : '';
}




export{ initSlider, formatDate, getImageUrl }