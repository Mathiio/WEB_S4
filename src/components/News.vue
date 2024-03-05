<template>
    <section>
        <div class="head_slider">
            <h2>Surfe sur les dernières arrivées</h2>
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
                <SplideSlide v-for="media in latestMedias" :key="media.id" @click="redirectToMedia(media.id)" class="splide__slide min_card" >
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
                </SplideSlide>
            </Splide>
        </div>
    </section>
    <section>
        <div class="head_slider">
            <h2>Dernières actualités côté {{ this.genre1.name }}</h2>
        </div>
        <div :class="{ 'wrapper': loadinglatestGenre, 'none': !loadinglatestGenre }">
            <article class="skeleton_latestGenre">
            </article>
        </div>
        <div :class="{ 'wrapper': !loadinglatestGenre, 'none': loadinglatestGenre }">
            <Splide :options="{ rewind: true, pagination: false }">
                <SplideSlide v-for="media in latestGenre1" :key="media.id" @click="redirectToMedia(media.id)" class="splide__slide mid_card">
                    <div class="img_banner" :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'"></div>
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
                </SplideSlide>
            </Splide>
        </div>
    </section>
    <section>
        <div class="head_slider">
            <h2>Dernières actualités côté {{ this.genre2.name }}</h2>
        </div>
        <div :class="{ 'wrapper': loadinglatestGenre, 'none': !loadinglatestGenre }">
            <article class="skeleton_latestGenre">
            </article>
        </div>
        <div :class="{ 'wrapper': !loadinglatestGenre, 'none': loadinglatestGenre }">
            <Splide :options="{ rewind: true, pagination: false }">
                <SplideSlide v-for="media in latestGenre2" :key="media.id" @click="redirectToMedia(media.id)" class="splide__slide mid_card">
                    <div class="img_banner" :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'"></div>
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
    padding-right: var(--max-space);
    padding-left: var(--max-space);
    padding-bottom: var(--max-space);
}
.head_slider {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: var(--mid-space);
}
h2{
    font-size: var(--mid-size);
    color: var(--third-color);
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
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';


export default {
  props: {
    selectedMedia: String 
  },
  data() {
    return {
      latestMedias: [],
      latestGenre1: [],
      latestGenre2: [],
      loadinglatest: true,
      loadinglatestGenre: true,
      genre1: '',
      genre2: '',
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
            this.latestMedias = await entityAPI.getLatest(24);
        } finally {
            this.loadinglatest = false;
        }
    },
    async retrieveLatestGenreMedias() {
        this.loadinglatestGenre = true;
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.genre1 = await entityAPI.getRandomGenre();
        this.genre2 = await entityAPI.getRandomGenre();
        try {
            this.latestGenre1 = await entityAPI.getLatestGenre(this.genre1, 10);
            this.latestGenre2 = await entityAPI.getLatestGenre(this.genre2, 10);
        } finally {
            this.loadinglatestGenre = false;
        }
    },
    getImageUrl,
    formatDate,
    formatVote,
    Splide,
    SplideTrack,
    SplideSlide,
  }
}
</script>