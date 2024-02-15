<template>
    <section>
        <div class="head_slider">
        <h1>Tendances actuelles</h1>
        <router-link to="/Ratted">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
    </div>
    <div class="wrapper">
            <div class="splide" id="splide">
                <div class="splide__track">
                    <div class="splide__list">
                        <article v-for="movie in limitedTrendMovies" :key="movie.id" @click="redirectToMovie(movie.id)" class="splide__slide accueil_trend" :style="'background:url(' + getImageUrl(movie.backdrop_path) + ') center center; background-size: cover;'">
                            <div class="gradient">
                                <h3>{{ movie.title }}</h3>
                                <span>
                                    <p class="date">{{ formatDate(movie.release_date) }}</p>
                                    <p class="vote">{{ movie.vote_average }} <ion-icon name="star"></ion-icon></p>
                                </span>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section>
        <div class="head_slider">
        <h1>Dernières sorties</h1>
        <router-link to="/News">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
    </div>
    <div class="wrapper">
            <div class="splide" id="splide2">
                <div class="splide__track">
                    <div class="splide__list">
                        <article v-for="movie in limitedLatestMovies" :key="movie.id" @click="redirectToMovie(movie.id)" class="splide__slide accueil_news" :style="'background:url(' + getImageUrl(movie.poster_path) + ') center center; background-size: cover;'">
                            <div class="gradient">
                                <h3>{{ movie.title }}</h3>
                                <span>
                                    <p class="date">{{ formatDate(movie.release_date) }}</p>
                                    <p class="vote">{{ movie.vote_average }} <ion-icon name="star"></ion-icon></p>
                                </span>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>




<style scoped>
    section{
        width:100%;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        padding:var(--max-space);
    }
    .head_slider{
        width:100%;
        display: flex;
        justify-content: space-between;
        align-items: center; 
        margin-bottom:var(--mid-space);
    }
    h1{
        font-family:'medium';
        font-size:var(--mid-size);
        color:var(--second-color-alt);
    }
    a{
        text-decoration: none;
        color:var(--first-color);
        cursor: pointer;
        display: flex;
        justify-content: start;
        align-items: center;
        font-size: var(--min-size);
        font-family: 'medium';
    }
    .wrapper {
		width:100%;
		display: flex;
		justify-content: center;
		align-items: center;
        overflow: hidden;
	}
	.splide {
        width:100%;
		cursor:grab;
		overflow:hidden;
		display: flex;
		justify-content: center;
		align-items: center;
        align-content: center;
	}
    .splide__track{
        width:100%;
    }
    article{
        display: flex;
        border-radius:var(--max-radius);
        position: relative;
        overflow: hidden;
        margin-right:var(--big-space) !important;
    }
    .accueil_trend{
        width:100%;
        height:300px;
    }
    .accueil_news{
        width:400px;
        height:250px;
    }
    .gradient{
        padding:var(--big-space);
        display: flex;
        justify-content: start;
        align-items: end;
        align-content: end;
        flex-wrap:wrap;
        width:100%;
        height:100%;
        background: rgb(0,0,0);
        background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.6) 100%);
    }
    .gradient h3{
        font-family:'medium';
        font-size:var(--mid-size);
        color:white;
        margin-bottom:var(--min-space);
    }
    .gradient span{
        display: flex;
        justify-content: start;
        align-items: center;
        width:100%;
    }
    .gradient span p:first-child{
        font-family:'medium';
        font-size:var(--min-size);
        color:white;
        padding-right:var(--min-space);
        border-right: solid 1px white;
        margin-right:var(--min-space);
    }
    .gradient span p{
        font-family:'medium';
        font-size:var(--min-size);
        color:var(--first-color);
    }
    .gradient span p{
        font-family:'medium';
        font-size:var(--min-size);
        color:var(--first-color);
    }
</style>





<script>
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';



export default {
  data() {
    return {
      trendMovies: [],
      latestMovies: [],
      limitTrend: 6,
      limitLatest: 12,
    };
  },
  created() {
    this.fetchTrendMovies();
    this.fetchLatestMovies();
  },
  methods: {
    redirectToMovie(movieId) {
        this.$router.push({ name: 'MoviePrev', params: { id: movieId } });
    },
    async fetchTrendMovies() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`);
            if (!response.ok) {
            throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();
            this.trendMovies = data.results;
            this.initSplide();
        } catch (error) {
            console.error('Erreur lors du fetch de la requête:', error);
        }
    },
    async fetchLatestMovies() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&primary_release_year=2024`);
            if (!response.ok) {
                throw new Error('Erreur lors de la requête');
            }
            const data = await response.json();
            this.latestMovies = data.results; 
            this.initSplide2();
        } catch (error) {
            console.error('Erreur lors du fetch de la requête:', error);
        }
    },
    getImageUrl(posterPath) {
        return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : ''; 
    },
    formatDate(dateString) {
        return dateString ? new Date(dateString).toLocaleDateString('fr-FR') : '';
    },
    initSplide() {
        setTimeout(() => {
            const splideElement = document.getElementById('splide');

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
        }, 10);
    },
    initSplide2() {
        setTimeout(() => {
            const splideElement = document.getElementById('splide2');

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
        }, 10);
    },
  },
  computed: {
    limitedTrendMovies() {
        return this.trendMovies.slice(0, this.limitTrend);
    },
    limitedLatestMovies() {
        return this.latestMovies.slice(0, this.limitLatest);
    }
  }
}
</script>



