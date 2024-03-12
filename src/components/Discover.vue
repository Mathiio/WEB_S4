<template>
    <section>
        <h1>{{ selectedMedia === 'films' ? 'Une idée de film en tête ?' : 'Une idée de série en tête ?' }}</h1>
        <div class="selectors">
            <div class="select_box">
                <label for="genre">Filtrer par</label>
                <select name="genre" id="genre" v-model="selectedGenre">
                    <option value="tout">Tout</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
                </select>
            </div>
            <div class="select_box">
                <label for="sortOrder">Trier par</label>
                <select name="sortOrder" id="sortOrder" v-model="sortOrder">
                    <option value="ascendant">A-Z</option>
                    <option value="descendant">Z-A</option>
                    <option value="notes">Notes</option>
                    <option value="dates">Dates</option>
                </select>
            </div>
        </div>
        <input class="search_film" type="text"
            :placeholder="selectedMedia === 'films' ? 'Rechercher un film' : 'Rechercher une série'"
            v-model="searchQuery" @input="search">
        <div class="show_medias">
            <template v-if="loading">
                <MinCardSkeleton v-for="index in 20" :key="index"></MinCardSkeleton>
            </template>
            <template v-else>
                <MinCard v-for="media in filteredSearch" :key="media.id" :media="media" :selectedMedia="selectedMedia">
                </MinCard>
            </template>
        </div>
    </section>
</template>



<style scoped>
section {
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    padding-right: var(--max-space);
    padding-left: var(--max-space);
    padding-bottom: var(--max-space);
}

.show_medias {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(138px, 1fr));
    grid-column-gap: var(--big-space);
    grid-row-gap: var(--big-space);
}

h1 {
    width: 100%;
    text-align: left;
    font-size: var(--mid-size);
    color: var(--third-color);
    font-weight: 100;
}

input {
    width: 100%;
    background: var(--second-color-alt);
    border-radius: var(--radius);
    border: none;
    font-size: var(--min-size);
    padding: var(--big-space);
    color: var(--third-color);
    margin-bottom: var(--big-space);
}

input:focus {
    outline: none;
}

.select_box {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    margin-top: var(--big-space);
}

.select_box label {
    color: var(--third-color-alt);
    font-size: var(--min-size);
    margin-bottom: var(--min-space);
}

.selectors {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: var(--mid-space);
}

select {
    padding: var(--mid-space);
    border-radius: var(--min-space);
    background: var(--second-color-alt);
    color: var(--third-color-alt);
    border: none;
    font-size: var(--min-size);
    margin-right: var(--mid-size);
}

select:focus {
    outline: none;
}

article {
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
import { getEntityAPI } from '@services/interface.js';
import MinCardSkeleton from '@components/cards/MinCardSkeleton.vue';
import MinCard from '@components/cards/MinCard.vue';


export default {
    components: {
        MinCard,
        MinCardSkeleton,
    },
    props: {
        selectedMedia: String
    },
    data() {
        return {
            genres: [],
            searchQuery: '',
            selectedGenre: 'tout',
            sortOrder: localStorage.getItem('sortOrder') || 'notes',
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
        },
        sortOrder(newValue) {
            localStorage.setItem('sortOrder', newValue);
        },
    },
    computed: {
        filteredSearch() {
            let filteredMedias = this.searchedMedias;

            if (this.selectedGenre !== 'tout') {
                filteredMedias = filteredMedias.filter(media => {
                    return media.genre_ids.includes(parseInt(this.selectedGenre));
                });
            }

            const entityAPI = getEntityAPI(this.selectedMedia);
            filteredMedias = entityAPI.sortMedias(filteredMedias, this.sortOrder);
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
        resetResults() {
            const resultsElements = document.querySelectorAll('.results');
            resultsElements.forEach(element => {
                element.remove();
            });
        },
    },
}
</script>