<template>
    <section>
        <h1>{{ selectedMedia === 'films' ? 'Une idée de film en tête ?' : 'Une idée de série en tête ?' }}</h1>
        <div class="selectors">
            <div class="select_box">
                <label for="genre">Genre</label>
                <select name="genre" id="genre" v-model="selectedGenre">
                    <option value="tout">Tout</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                </select>
            </div>
            <div class="select_box">      
                <label for="sortOrder">Trier par</label>
                <select name="sortOrder" id="sortOrder" v-model="sortOrder">
                    <option value="ordre croissant">Ordre croissant</option>
                    <option value="ordre décroissant">Ordre décroissant</option>
                </select>
            </div>
        </div>
        <input class="search_film" type="text" :placeholder="selectedMedia === 'films' ? 'Rechercher un film' : 'Rechercher une série'" v-model="searchQuery" @input="searchMedias">
        <div class="show_medias">
            <article v-for="media in filteredMedias" :key="media.id"  @click="redirectToMedia(media.id)" class="splide__slide" :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'">
                <div class="gradient">
                    <h3>{{ media.title }}</h3>
                    <span>
                        <p class="date">{{ formatDate(media.release_date) }}</p>
                        <p class="vote">{{ media.vote_average }} <ion-icon name="star"></ion-icon></p>
                    </span>
                </div>
            </article>
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
.show_medias{
    width:100%;
    display:grid;
    grid-template-columns: repeat(4,1fr);
    grid-column-gap: var(--mid-space);
    grid-row-gap: var(--big-space);
}
h1{
    width:100%;
    text-align: left;
    font-family:'bold';
    font-size:var(--max-size);
    color:var(--second-color-alt);
    margin-bottom:var(--big-space);
}
input{
    width:100%;
    border: solid 1.5px var(--second-color-alt);
    border-radius:var(--min-radius);
    font-family: 'regular';
    font-size:var(--min-size);
    padding: var(--mid-space);
    color:var(--second-color-alt);
    margin-bottom:var(--big-space);
}
input:focus{
    outline: none;
}
.select_box{
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
}
.select_box label{
    font-family: 'regular';
    color:var(--second-color);
    font-size:var(--min-size);
    margin-bottom: var(--min-space);
}
.selectors{
    width:100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom:var(--mid-space);
}
select{
    padding: var(--min-space);
    border-radius: var(--min-space);
    border: solid 1.5px var(--second-color-alt);
    color: var(--second-color-alt);
    font-family: 'regular';
    font-size: var(--min-size);
    margin-right:var(--mid-size);
}
select:focus{
    outline: none;
}
article{
    display: flex;
    border-radius:var(--max-radius);
    position: relative;
    height:250px;
    overflow: hidden;
    cursor:pointer;
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
    font-size:var(--min-size);
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
import { getImageUrl, formatDate } from '@services/utils.js'
import { getEntityAPI } from '@services/interface.js';


export default {
    props: {
        selectedMedia: String 
    },
    data() {
        return {
            genres: [],
            searchQuery: '',
            selectedGenre: 'tout',
            sortOrder: 'ordre croissant',
            searchedMedias: []
        };
    },
    created() {
        this.retrieveGenres();
    },
    methods: {
        redirectToMedia(mediaId) {
            this.$router.push({ name: 'MoviePrev', params: { id: mediaId } });
        },
        async retrieveGenres() {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.genres = await entityAPI.getGenres();
        },
        async searchMedias(event) {
            const query = event.target.value.trim();
            if (query.length > 0) { 
                try {
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&language=fr&query=${query}`);
                    if (!response.ok) {
                        throw new Error('Erreur lors de la requête');
                    }
                    const data = await response.json();
                    this.searchedMedias = data.results; 
                } catch (error) {
                    console.error('Erreur lors de la recherche de films:', error);
                }
            } else {
                this.searchedMedias = []; 
            }
        },
        filterMediasByGenre(medias) {
            if (this.selectedGenre === 'tout') {
                return medias; 
            } else {
                return medias.filter(media => media.genre_ids.includes(this.selectedGenre)); 
            }
        },
        getImageUrl,
        formatDate,
        sortMedias(medias) {
            const sortedMedias = [...medias]; 

            sortedMedias.sort((a, b) => {
                if (this.sortOrder === 'ordre croissant') {
                    return a.title.localeCompare(b.title);
                } else {
                    return b.title.localeCompare(a.title);
                }
            });
            return sortedMedias;
        },
    },
    computed: {
        filteredMedias() {
            const filteredMediasByGenre = this.filterMediasByGenre(this.searchedMedias);
            return this.sortMedias(filteredMediasByGenre);
        }
    }
}
</script>