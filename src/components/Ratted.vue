<template>
    <section>
        <div class="head_slider">
            <h2>Retour sur les succès de {{ this.year }}</h2>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, pagination: false, autoplay: true}">
                <template v-if="yearMedias.length > 0">
                    <MinCard v-for="media in yearMedias" :key="media.id" :media="media" :selectedMedia="selectedMedia"></MinCard>
                </template>
                <template v-else>
                    <MinCardSkeleton v-for="index in 10" :key="index"></MinCardSkeleton>
                </template>
            </Splide>
        </div>
    </section>
    <section>
        <div class="head_slider">
            <h2>Le podium côté, {{ this.genre.name }}</h2>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, pagination: false}">
                <template v-if="genreMedias.length > 0">
                    <MidCard v-for="media in genreMedias" :key="media.id" :media="media" :selectedMedia="selectedMedia"></MidCard>
                </template>
                <template v-else>
                    <MidCardSkeleton v-for="index in 10" :key="index"></MidCardSkeleton>
                </template>
            </Splide>
        </div>
    </section>
</template>




<style scoped>
.none{
    display:none;
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
    font-weight: 100;
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
import { getEntityAPI } from '@services/interface.js';
import { getRandomYear } from '@services/utils.js';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import MidCard from '@components/cards/MidCard.vue';
import MidCardSkeleton from '@components/cards/MidCardSkeleton.vue';
import MinCardSkeleton from '@components/cards/MinCardSkeleton.vue';
import MinCard from '@components/cards/MinCard.vue';



export default {
  components: {
    MidCard,
    MinCard,
    MidCardSkeleton,
    MinCardSkeleton,
  },
  props: {
    selectedMedia: String 
  },
  data() {
    return {
      yearMedias: [],
      year: '',
      genreMedias: [],
      genre: '',
    };
  },
  async created() {
    await this.getYear();
    this.retrieveYearMedias();
    await this.getGenre();
    this.retrieveGenreMedias();
  },
  watch: {
    selectedMedia: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
            this.retrieveYearMedias();
            this.retrieveGenreMedias();
        }
      }
    }
  },
  methods: {
    redirectToMedia(mediaId) {
        this.$router.push({ name: 'MediaPrev', params: { id: mediaId } });
    },
    async getYear(){
        this.year = await getRandomYear(); 
    },
    async retrieveYearMedias() {
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.yearMedias = await entityAPI.getYearTrend(this.year, 24);
    },
    async getGenre(){
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.genre = await entityAPI.getRandomGenre(); 
    },
    async retrieveGenreMedias() {
        const entityAPI = getEntityAPI(this.selectedMedia);
        this.genreMedias = await entityAPI.getGenreTrend(this.genre, 18);
    },
    getRandomYear,
    Splide,
    SplideTrack,
    SplideSlide,
  }
}
</script>