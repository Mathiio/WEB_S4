<template>
    <section>
        <template v-if="movie">
            <img :src="getImageUrl(movie.poster_path)" alt="">
            <div class="media_data">
                <div class="quick_infos">
                    <p>{{ movie.runtime }} min</p>
                    <p>{{ movie.release_date }}</p>
                    <p>{{ movie.vote_average }}/10</p>
                </div>
                <h1>{{ movie.title }}</h1>
                <p class="overview">{{ movie.overview }}</p>
                <div class="media_genres">
                    <p v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</p>
                </div>
            </div>
        </template>
        <template v-else>
            <p>Chargement du film...</p>
        </template>
    </section>
</template>


<style scoped>
section{
    width:100%;
    padding: var(--max-space);
    display: flex;
    justify-content: start;
    align-items: start;
}
img{
    width:400px;
    border-radius:var(--max-radius);
    margin-right:var(--big-space);
}
.media_data{
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
}
h1{
    font-family:'bold';
    font-size:var(--max-size);
    color:var(--second-color-alt);
    margin-bottom:var(--mid-space);
}
.quick_infos{
    width:100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom:var(--mid-space);
}
.quick_infos p:first-child{
    padding-right:var(--mid-space);
    padding-left:0px;
    border: none
}
.quick_infos p{
    padding-right:var(--mid-space);
    padding-left:var(--mid-space);
    border-left: solid 1px var(--second-color);
    font-family: 'regular';
    color:var(--second-color);
    font-size:var(--min-size);
}
.overview{
    font-family: 'regular';
    color:var(--second-color-alt);
    font-size:var(--min-size);
    width:100%;
    text-align: left;
    margin-bottom:var(--mid-space);
}
.media_genres{
    width:100%;
    display: flex;
    justify-content: start;
    align-items: center;
}
.media_genres p{
    padding-left:var(--mid-space);
    padding-right:var(--mid-space);
    padding-top:var(--min-space);
    padding-bottom:var(--min-space);  
    font-family: 'regular';
    color:var(--second-color);
    font-size:var(--min-size);
    border: solid 1px var(--second-color);
    border-radius:var(--min-radius);
    margin-right:var(--mid-space);
}
</style>


<script>
export default {
    data() {
        return {
            movie: null
        };
    },
    created() {
        const movieId = this.$route.params.id;
        this.fetchMovieDetails(movieId);
    },
    methods: {
        async fetchMovieDetails(movieId) {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}&penv&language=fr`);
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
                const data = await response.json();
                this.movie = data;
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du film:', error);
            }
        },
        getImageUrl(posterPath) {
            return posterPath ? `https://image.tmdb.org/t/p/original${posterPath}` : ''; 
        },
        formatDate(dateString) {
            return dateString ? new Date(dateString).toLocaleDateString('en-US') : '';
        }
    }
}
</script>
