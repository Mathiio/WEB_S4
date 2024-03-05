<template>
    <section>
        <div class="head_slider">
            <h1>{{ selectedMedia === 'films' ? 'Tendances actuelles' : 'Tendances sur les séries' }}</h1>
            <router-link to="/Ratted">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
        </div>
        <div :class="{ 'wrapper': loadingTrend, 'none': !loadingTrend }">
            <article class="skeleton_trend">
            </article>
        </div>
        <div :class="{ 'wrapper': !loadingTrend, 'none': loadingTrend }">
            <Splide :options="{ rewind: true, autoplay: true, pagination: false  }">
                <SplideSlide v-for="media in trendMedias" :key="media.id" @click="redirectToMedia(media.id)" class="splide__slide mid_card">
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
            <h1>Les sorties toutes fraiches</h1>
            <router-link to="/News">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
        </div>
        <div :class="{ 'wrapper': loadingTrend, 'none': !loadingTrend }">
            <article class="skeleton_news">
            </article>
            <article class="skeleton_news">
            </article>
            <article class="skeleton_news">
            </article>
        </div>
        <div :class="{ 'wrapper': !loadingTrend, 'none': loadingLatest }">
            <Splide :options="{ rewind: true, pagination: false }">
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
</template>




<style scoped>
.none{
    display:none;
}
.skeleton_news{
  background-color: rgba(236, 236, 236, 0.6);
  width: var(--max-card);
  height: var(--min-card);
  border-radius: var(--max-radius);
  margin-right: var(--big-space) !important;
  position: relative;
  overflow: hidden;
}
.skeleton_trend{
    background-color: rgba(236, 236, 236, 0.6);
    width: 100%;
    height: var(--mid-card);
    border-radius: var(--max-radius);
    position: relative;
    overflow: hidden;
}
.skeleton_trend::after, .skeleton_news::after {
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
    font-size: var(--mid-size);
    color: var(--third-color);
}

a {
    text-decoration: none;
    color: var(--first-color);
    cursor: pointer;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: var(--min-size);
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
      trendMedias: [],
      latestMedias: [],
      loadingTrend: true,
      loadingLatest: true,
    };
  },
  created() {
    this.retrieveLatestMedias();
    this.retrieveTrendMedias();
  },
  watch: {
    selectedMedia: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.retrieveTrendMedias();
          this.retrieveLatestMedias();
        }
      }
    }
  },
  methods: {
    redirectToMedia(mediaId) {
        this.$router.push({ name: 'MediaPrev', params: { id: mediaId } });
    },
    async retrieveTrendMedias() {
        this.loadingTrend = true;
        try {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.trendMedias = await entityAPI.getTrend(14);
        } finally {
            this.loadingTrend = false;
        }
    },
    async retrieveLatestMedias() {
        this.loadingLatest = true;
        try {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.latestMedias = await entityAPI.getLatest(20);
        } finally {
            this.loadingLatest = false;
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