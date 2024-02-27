<template>
    <section>
        <div class="head_slider">
            <h1>{{ selectedMedia === 'films' ? 'Tendances actuelles' : 'Tendances sur les séries' }}</h1>
            <router-link to="/Ratted">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
        </div>
        <div class="wrapper">
            <div class="splide" id="splide">
                <div class="splide__track">
                    <div class="splide__list">
                        <article v-for="media in trendMedias" :key="media.id" @click="redirectToMedia(media.id)"
                            class="splide__slide accueil_trend"
                            :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'">
                            <div class="gradient">
                                <h3>{{ selectedMedia === 'films' ? media.title : media.name }}</h3>
                                <span>
                                    <p class="date">{{ selectedMedia === 'films' ? formatDate(media.release_date) : formatDate(media.first_air_date) }}</p>
                                    <p class="vote">{{ media.vote_average }} <ion-icon name="star"></ion-icon></p>
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
            <h1>Les sorties toutes fraiches</h1>
            <router-link to="/News">Voir plus<ion-icon name="chevron-forward-outline"></ion-icon></router-link>
        </div>
        <div class="wrapper">
            <div class="splide" id="splide2">
                <div class="splide__track">
                    <div class="splide__list">
                        <article v-for="media in latestMedias" :key="media.id" @click="redirectToMedia(media.id)"
                            class="splide__slide accueil_news"
                            :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'">
                            <div class="gradient">
                                <h3>{{ selectedMedia === 'films' ? media.title : media.name }}</h3>
                                <span>
                                    <p class="date">{{ selectedMedia === 'films' ? formatDate(media.release_date) : formatDate(media.first_air_date) }}</p>
                                    <p class="vote">{{ media.vote_average }} <ion-icon name="star"></ion-icon></p>
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

.splide__track {
    width: 100%;
}

article {
    display: flex;
    border-radius: var(--max-radius);
    position: relative;
    overflow: hidden;
    margin-right: var(--big-space) !important;
}

.accueil_trend {
    width: 100%;
    height: 300px;
}

.accueil_news {
    width: 400px;
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
import { initSlider, getImageUrl, formatDate } from '@services/utils.js'
import { getEntityAPI } from '@services/interface.js';


export default {
  props: {
    selectedMedia: String 
  },
  data() {
    return {
      trendMedias: [],
      latestMedias: [],
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
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.trendMedias = await entityAPI.getTrend(2,8,25);
        setTimeout(() => {
            this.initSlider('splide')
        }, 10); 
    },
    async retrieveLatestMedias() {
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.latestMedias = await entityAPI.getLatest(10,25);
        setTimeout(() => {
            this.initSlider('splide2')
        }, 10); 
    },
    getImageUrl,
    formatDate,
    initSlider,
  }
}
</script>