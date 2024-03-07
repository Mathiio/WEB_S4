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
                    <option value="ascendant">Ascendant</option>
                    <option value="descendant">Descendant</option>
                </select>
            </div>
        </div>
        <input class="search_film" type="text" :placeholder="selectedMedia === 'films' ? 'Rechercher un film' : 'Rechercher une série'" v-model="searchQuery" @input="search">
        <div class="show_medias">
            <article v-for="media in filteredSearch" :key="media.id" @click="redirectToMedia(media.id)" class="min_card" >
                <div class="img_poster" :style="'background:url(' + getImageUrl(media.poster_path) + ') center center; background-size: cover;'"></div>
                <div class="card_infos">
                    <h3 class="one-line">
                        <div class="bg_oneline"></div>
                        <span>{{ selectedMedia === 'films' ? media.title : media.name }}</span>
                    </h3>
                    <span>
                        <p class="card_date">{{ selectedMedia === 'films' ? formatDate(media.release_date) : formatDate(media.first_air_date) }}</p>
                        <p class="card_vote">{{ formatVote(media.vote_average) }}<ion-icon name="star"></ion-icon></p>
                    </span>
                </div>
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
            <article v-if="loading" class="skeleton_article">
            </article>
        </div>
    </section>
</template>



<style scoped>
.skeleton_article{
  position: relative;
  overflow: hidden;
  background-color: rgba(236, 236, 236, 0.6);
}
.skeleton_article::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0) 100%);
    animation: shimmer 1.4s infinite;
    content: '';
}
@keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
section{
    width:100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    padding-right: var(--max-space);
    padding-left: var(--max-space);
    padding-bottom: var(--max-space);
}
.show_medias{
    width:100%;
    display:flex;
    flex-wrap:wrap;
}
h1{
    width:100%;
    text-align: left;
    font-size: var(--mid-size);
    color:var(--third-color);
    font-weight: 100;
}
input{
    width: 100%;
    background: var(--second-color-alt);
    border-radius: var(--radius);
    border: none;
    font-size: var(--min-size);
    padding: var(--big-space);
    color: var(--third-color);
    margin-bottom: var(--big-space);
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
    padding: var(--mid-space);
    border-radius: var(--min-space);
    background: var(--second-color-alt);
    color: var(--third-color-alt);
    border: none;
    font-size: var(--min-size);
    margin-right: var(--mid-size);
}
select:focus{
    outline: none;
}
article{
   margin-right: var(--big-space);
   margin-bottom: var(--max-space);
}

@media only screen and (max-width: 540px) {
    section {
        padding-top: var(--max-space);
        padding-bottom: var(--max-space);
        padding-right: var(--big-space);
        padding-left: var(--big-space);
    }
}
</style>




<script>
import { getImageUrl, formatDate, formatVote } from '@services/utils.js'
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
            sortOrder: 'ascendant',
            searchedMedias: [],
            show_limit: 20,
            loading: false,
        };
    },
    created() {
        this.retrieveGenres();
    },
    watch: {
        selectedMedia: {
            immediate: true,
            handler(newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.search();
                }
            }
        }
    },
    computed: {
        filteredSearch() {
            let filteredMedias = this.searchedMedias;

            if (this.selectedGenre !== 'tout') {
                filteredMedias = filteredMedias.filter(media => {
                    return media.genre_ids.includes(parseInt(this.selectedGenre));
                });
            }

            if (this.sortOrder === 'ascendant') {
                filteredMedias.sort((a, b) => {
                    if(this.selectedMedia==='films'){
                        return a.title.localeCompare(b.title);
                    }else{
                        return a.name.localeCompare(b.name);
                    }
                });
            } else if (this.sortOrder === 'descendant') {
                filteredMedias.sort((a, b) => {
                    if(this.selectedMedia==='films'){
                        return b.title.localeCompare(a.title);
                    }else{
                        return b.name.localeCompare(a.name);
                    }
                });
            }

            return filteredMedias;
        }
    },
    methods: {
        redirectToMedia(mediaId) {
            this.$router.push({ name: 'MediaPrev', params: { id: mediaId } });
        },
        async retrieveGenres() {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.genres = await entityAPI.getGenres();
        },
        async search() {
            const query = this.searchQuery.trim();
            this.resetResults()
            if (query.length > 0) { 
                this.loading = true;
                this.searchedMedias = [];
                const entityAPI = getEntityAPI(this.selectedMedia);
                try {
                    this.searchedMedias = await entityAPI.searchMedia(query, 8);
                } finally {
                    this.loading = false;
                }
            } else {
                this.searchedMedias = []; 
                this.loading = false; 
            }
        },
        resetResults(){
            const resultsElements = document.querySelectorAll('.results');
            resultsElements.forEach(element => {
                element.remove();
            });
        },
        getImageUrl,
        formatDate,
        formatVote,
    },
}
</script>