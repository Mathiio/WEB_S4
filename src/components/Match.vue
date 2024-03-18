<template>
    <section>
        <form @submit.prevent="submitForm" v-if="!showfilm">
            <div class="question">
                <h2>Durée de cette séance ?</h2>
                <div class="range_show">
                    <input type="range" min="20" max="300" value="50" v-model="selectedRuntime" class="slider">
                    <p class="range_value">{{ selectedRuntime }}min</p>
                </div>
            </div>
            <div class="question">
                <h2>Ton genre préféré ?</h2>
                <div id="genre_selector">
                    <div class="wrapper">
                        <Splide :options="{ rewind: true, autoplay: true, pagination: false }">
                            <SplideSlide v-for="genre in genres" :key="genre.id" class="custom_select">
                                <input type="checkbox" :value="genre.id" v-model="selectedGenres">
                                <span>{{ genre.name }}</span>
                            </SplideSlide>
                        </Splide>
                    </div>
                </div>
            </div>
            <div class="question">
                <h2>Plutôt vintage ou dernier cri ?</h2>
                <div class="age_div">
                    <label class="custom_select_2">
                        <input type="radio" value="old" v-model="selectedAge">
                        <span>
                            <OldPicto></OldPicto>
                            <p>{{ selectedMedia === 'films' ? "Films anciens" : "Séries anciennes" }}</p>
                        </span>
                    </label>
                    <label class="custom_select_2">
                        <input type="radio" value="young" v-model="selectedAge">
                        <span>
                            <YoungPicto></YoungPicto>
                            <p>{{ selectedMedia === 'films' ? "Films récents" : "Séries récentes" }}</p>
                        </span>
                    </label>
                    <label class="custom_select_2">
                        <input type="radio" value="none" v-model="selectedAge">
                        <span>
                            <MidAgePicto></MidAgePicto>
                            <p>Sans préférence</p>
                        </span>
                    </label>
                </div>
            </div>
            <button type="submit">{{ loading === true ? 'Chargement en cours' : 'Rechercher' }}<span v-if="loading"
                    class="loader"></span></button>
        </form>
        <div v-if="showfilm" class="search_result">
            <h2>Ces films sont faits pour vous !</h2>
            <ul class="result_list">
                <li v-for="media in matchMedia.slice(0, 20) " @click="redirectToMedia(media.id)" :key="media.id">
                    <p>{{selectedMedia === 'films' ? media.title : media.name }}</p>
                    <p>{{ media.runtime }} min</p>
                </li>
            </ul>
        </div>
    </section>
</template>



<style scoped>
.loader {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid var(--second-color);
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin-left: var(--mid-space);
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.search_result {
    width: 100%;
}

.result_list {
    list-style: none;
    width: 100%;
}

.result_list li {
    border-bottom: solid 0.5px var(--third-color-alt);
    padding-top: var(--min-space);
    padding-bottom: var(--min-space);
    width: 100%;
    color: var(--third-color-alt);
    font-size: var(--min-size);
    font-family: 'light';
    cursor: pointer;
    transition: all ease-in-out 0.15s;
    display: flex;
    justify-content: space-between;
}

.result_list li:hover {
    color: var(--first-color);
    font-family: 'medium';
    transition: all ease-in-out 0.15s;
}

.age_div {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
}

.range_value {
    color: var(--third-color-alt);
    font-size: var(--min-size);
    margin-left: var(--mid-space);
}

.range_show {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    border-radius: 5px;
    background: linear-gradient(to right, #ffbb3d 0%, #ffbb3d calc((var(--selectedRuntime) - 20) * 100% / (300 - 20)), #a6a6a681 calc((var(--selectedRuntime) - 20) * 100% / (300 - 20)), #a6a6a681 100%);
    outline: none;
    position: relative;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ffbb3d;
    border: solid 2px var(--first-color);
    cursor: pointer;
    position: relative;
    z-index: 2;
}

.slider::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: solid 2px var(--first-color);
    transition: all ease-in-out .15s;
    cursor: pointer;
    position: relative;
    z-index: 2;
}

button {
    background-color: var(--first-color);
    padding: var(--mid-space);
    border-radius: var(--radius);
    font-size: var(--min-size);
    color: var(--second-color);
    display: flex;
    border: none;
    font-family: 'medium';
    transition: all ease-in-out .15s;
    cursor: pointer;
}

button:hover {
    background-color: var(--first-color-alt);
    transition: all ease-in-out .15s;
}

.question {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    margin-bottom: var(--max-space);
}

h1 {
    width: 100%;
    text-align: left;
    font-family: 'medium';
    font-size: var(--max-size);
    color: var(--third-color);
    margin-bottom: var(--big-space);
}

h2 {
    font-size: var(--mid-size);
    color: var(--third-color);
    margin-bottom: var(--mid-space);
    font-weight: 100;
}

section {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
    padding-right: var(--max-space);
    padding-left: var(--max-space);
    padding-bottom: var(--max-space);
}

form {
    width: 100%;
}

#genre_selector {
    width: 100%;
}

.genre_selector {
    display: flex;
    justify-content: start;
    align-items: center;
}

.custom_select {
    margin-right: var(--mid-space);
    width: min-content !important;
}

.custom_select_2 {
    margin-right: var(--mid-space);
    position: relative;
}

.custom_select_2 input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: -webkit-fill-available;
    padding-top: var(--min-space);
    padding-bottom: var(--min-space);
    padding-right: var(--mid-space);
    padding-left: var(--mid-space);
}

.custom_select input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: -webkit-fill-available;
    padding-top: var(--min-space);
    padding-bottom: var(--min-space);
    padding-right: var(--mid-space);
    padding-left: var(--mid-space);
}

.custom_select span {
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease-in-out;
    padding: var(--mid-space);
    border-radius: var(--radius);
    border: solid 1px var(--third-color-alt);
    color: var(--third-color-alt);
    font-size: var(--min-size);
    display: block;
}

.custom_select_2 span {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: var(--mid-space);
    border-radius: var(--radius);
    border: solid 1px var(--third-color-alt);
    color: var(--third-color-alt);
    font-size: var(--min-size);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.custom_select_2 span p {
    width: 100%;
    text-align: center;
}

.custom_select input[type="checkbox"]:checked+span {
    border: solid 1px var(--first-color);
    color: var(--first-color);
    transition: all 0.2s ease-in-out;
}

.custom_select input[type="checkbox"]:hover+span {
    border: solid 1px var(--first-color);
    color: var(--first-color);
    transition: all 0.2s ease-in-out;
}

.custom_select_2 input[type="radio"]:checked+span {
    border: solid 1px var(--first-color);
    color: var(--first-color);
    transition: all 0.2s ease-in-out;
}

.custom_select_2 input[type="radio"]:hover+span {
    border: solid 1px var(--first-color);
    color: var(--first-color);
    transition: all 0.2s ease-in-out;
}

#genre {
    height: 44px;
    border: none;
    overflow: hidden;
}

#genre::-moz-focus-inner {
    border: 0;
}

#genre:focus {
    outline: none;
}

#genre option {
    width: 60px;
    font-size: 1.2em;
    padding: 10px 0;
    text-align: center;
    margin-right: 20px;
    display: inline-block;
    cursor: pointer;
    border: rgb(204, 204, 0) solid 1px;
    border-radius: 5px;
    color: rgb(204, 204, 0);
}

.wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.splide {
    width: 100%;
    cursor: grab;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.splide__track {
    width: 100%;
}

@media only screen and (max-width: 940px) {
    .age_div {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: var(--mid-space);
        grid-row-gap: var(--big-space);
    }

    .custom_select_2 {
        margin-right: 0px;
    }
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
<style>
.custom_select_2 span svg {
    fill: var(--third-color-alt);
    transition: all 0.2s ease-in-out;
    margin-bottom: var(--mid-space);
}

.custom_select_2 input[type="radio"]:checked+span svg {
    fill: var(--first-color);
    transition: all 0.2s ease-in-out;
}

.custom_select_2 input[type="radio"]:hover+span svg {
    fill: var(--first-color);
    transition: all 0.2s ease-in-out;
}

@media only screen and (max-width: 940px) {
    .custom_select_2 span svg {
        width: 60px;
        margin-bottom: var(--min-space);
    }
}
</style>



<script>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import { getEntityAPI } from '@services/interface.js'
import OldPicto from '@assets/svg/OldPicto.vue';
import YoungPicto from '@assets/svg/YoungPicto.vue';
import MidAgePicto from '@assets/svg/MidAgePicto.vue';
import { getImageUrl, formatDate, formatVote } from '@services/utils.js'



export default {
    components: {
        OldPicto,
        YoungPicto,
        MidAgePicto
    },
    props: {
        selectedMedia: String
    },
    data() {
        return {
            genres: [],
            selectedGenres: [],
            matchMedia: [],
            selectedRuntime: '20',
            selectedAge: {
                old: false,
                young: false,
                none: false
            },
            loading: false,
            showfilm: false,
        };
    },
    created() {
        this.retrieveGenres();
    },
    mounted() {
        this.$el.style.setProperty('--selectedRuntime', `${this.selectedRuntime}`);
    },
    watch: {
        selectedRuntime() {
            this.$el.style.setProperty('--selectedRuntime', `${this.selectedRuntime}`);
        }
    },
    methods: {
        redirectToMedia(mediaId) {
            this.$router.push({ name: 'MediaPrev', params: { id: mediaId } });
        },
        async retrieveGenres() {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.genres = await entityAPI.getGenres()
        },
        async submitForm() {
            try {
                this.loading = true;

                const entityAPI = getEntityAPI(this.selectedMedia);
                this.matchMedia = await entityAPI.sortMediasByMatch(this.selectedGenres, this.selectedAge, this.selectedRuntime,  20)

                if (this.matchMedia.length === 0) {
                    this.matchMedia.push({ title: "Aucun média trouvé", name: "aucun média n'a été trouvé avec tes critères de recherche" });
                }
                else {
                    this.matchMedia = this.matchMedia.sort((a, b) => b.vote_average - a.vote_average);
                }
                this.loading = false;
                this.showfilm = true;
            } catch (error) {
                console.error('Erreur lors de la recherche de films:', error);
            }
        },
        formatDate,
    },
};
</script>