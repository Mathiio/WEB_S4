<template>
    <section>
        <div class="head_slider">
            <h1>Surfe sur les tendances</h1>
            <router-link to="/Ratted">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
        </div>
        <div :class="{ 'wrapper': loadinglatest, 'none': !loadinglatest }">
            <article class="skeleton_latest">
            </article>
            <article class="skeleton_latest">
            </article>
            <article class="skeleton_latest">
            </article>
        </div>
        <div :class="{ 'wrapper': !loadinglatest, 'none': loadinglatest }">
            <Splide :options="{ rewind: true, pagination: false, autoplay: true}">
                <SplideSlide v-for="media in latestMedias" :key="media.id" @click="redirectToMedia(media.id)" class="splide__slide latest" :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'">
                        <div class="gradient">
                            <h3>{{ selectedMedia === 'films' ? media.title : media.name }}</h3>
                            <span>
                                <p class="date">{{ selectedMedia === 'films' ? formatDate(media.release_date) : formatDate(media.first_air_date) }}</p>
                                <p class="vote">{{ media.vote_average }} <ion-icon name="star"></ion-icon></p>
                            </span>
                        </div>
                </SplideSlide>
            </Splide>
        </div>
    </section>
    <section>
        <div class="head_slider">
            <h1>Les nouveautés côté {{ this.currentGenre.name }}</h1>
            <router-link to="/News">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
        </div>
        <div :class="{ 'wrapper': loadinglatestGenre, 'none': !loadinglatestGenre }">
            <article class="skeleton_latestGenre">
            </article>
        </div>
        <div :class="{ 'wrapper': !loadinglatestGenre, 'none': loadinglatestGenre }">
            <Splide :options="{ rewind: true, pagination: false }">
                <SplideSlide v-for="media in latestGenreMedias" :key="media.id" @click="redirectToMedia(media.id)" class="splide__slide latest_genre" :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'">
                    <div class="gradient">
                        <h3>{{ selectedMedia === 'films' ? media.title : media.name }}</h3>
                        <span>
                            <p class="date">{{ selectedMedia === 'films' ? formatDate(media.release_date) : formatDate(media.first_air_date) }}</p>
                            <p class="vote">{{ media.vote_average }} <ion-icon name="star"></ion-icon></p>
                        </span>
                    </div>
                </SplideSlide>
            </Splide>
        </div>
    </section>
</template>




<style scoped>
.none{
    display:none;
}
.skeleton_latest{
  background-color: rgba(236, 236, 236, 0.6);
  width: 400px;
  height: 250px;
  border-radius: var(--max-radius);
  margin-right: var(--big-space) !important;
  position: relative;
  overflow: hidden;
}
.skeleton_latestGenre{
    background-color: rgba(236, 236, 236, 0.6);
    width: 100%;
    height: 300px;
    border-radius: var(--max-radius);
    position: relative;
    overflow: hidden;
}
.skeleton_latest::after, .skeleton_latestGenre::after {
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
section {
    width: 100%;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    padding: var(--max-space);
}

.head_slider {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--mid-space);
}

h1 {
    font-family: 'medium';
    font-size: var(--mid-size);
    color: var(--second-color-alt);
}

a {
    text-decoration: none;
    color: var(--first-color);
    cursor: pointer;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: var(--min-size);
    font-family: 'medium';
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
.splide__list li {
    display: flex;
    border-radius: var(--max-radius);
    position: relative;
    overflow: hidden;
    margin-right: var(--big-space) !important;
}
.latest_genre{
    width: 100%;
    height: 300px;
} 
.latest {
    width: 400px !important;
    height: 250px;
}

.gradient {
    padding: var(--big-space);
    display: flex;
    justify-content: start;
    align-items: end;
    align-content: end;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.6) 100%);
}

.gradient h3 {
    font-family: 'medium';
    font-size: var(--mid-size);
    color: white;
    margin-bottom: var(--min-space);
}

.gradient span {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
}

.gradient span p:first-child {
    font-family: 'medium';
    font-size: var(--min-size);
    color: white;
    padding-right: var(--min-space);
    border-right: solid 1px white;
    margin-right: var(--min-space);
}

.gradient span p {
    font-family: 'medium';
    font-size: var(--min-size);
    color: var(--first-color);
}

.gradient span p {
    font-family: 'medium';
    font-size: var(--min-size);
    color: var(--first-color);
}
</style>





<script>
import { getImageUrl, formatDate } from '@services/utils.js'
import { getEntityAPI } from '@services/interface.js';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';


export default {
  props: {
    selectedMedia: String 
  },
  data() {
    return {
      latestMedias: [],
      latestGenreMedias: [],
      loadinglatest: true,
      loadinglatestGenre: true,
      currentGenre: '',
    };
  },
  created() {
    this.retrieveLatestMedias();
    this.retrieveLatestGenreMedias();
  },
  watch: {
    selectedMedia: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
            this.retrieveLatestMedias();
            this.retrieveLatestGenreMedias();
        }
      }
    }
  },
  methods: {
    redirectToMedia(mediaId) {
        this.$router.push({ name: 'MediaPrev', params: { id: mediaId } });
    },
    async retrieveLatestMedias() {
        this.loadinglatest = true;
        try {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.latestMedias = await entityAPI.getLatest(12, 50);
        } finally {
            this.loadinglatest = false;
        }
    },
    async retrieveLatestGenreMedias() {
        this.loadinglatestGenre = true;
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.currentGenre = await entityAPI.getRandomGenre();
        try {
            this.latestGenreMedias = await entityAPI.getLatestGenre(this.currentGenre, 10, 50);
        } finally {
            this.loadinglatestGenre = false;
        }
    },
    getImageUrl,
    formatDate,
    Splide,
    SplideTrack,
    SplideSlide,
  }
}
</script>