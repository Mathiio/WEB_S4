<template>
    <section>
        <div class="head_slider">
            <h2>{{ selectedMedia === 'films' ? 'Tendances actuelles' : 'Tendances sur les séries' }}</h2>
            <router-link to="/Ratted">Voir plus<ArrowPicto></ArrowPicto></router-link>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, autoplay: true, pagination: false }">
                <template v-if="trendMedias.length > 0">
                    <MidCard v-for="media in trendMedias" :key="media.id" :media="media" :selectedMedia="selectedMedia">
                    </MidCard>
                </template>
                <template v-else>
                    <MidCardSkeleton v-for="index in 6" :key="index"></MidCardSkeleton>
                </template>
            </Splide>
        </div>
    </section>
    <section>
        <div class="head_slider">
            <h2>Les sorties toutes fraiches</h2>
            <router-link to="/News">Voir plus<ArrowPicto></ArrowPicto></router-link>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, pagination: false }">
                <template v-if="latestMedias.length > 0">
                    <MinCard v-for="media in latestMedias" :key="media.id" :media="media"
                        :selectedMedia="selectedMedia"></MinCard>
                </template>
                <template v-else>
                    <MinCardSkeleton v-for="index in 10" :key="index"></MinCardSkeleton>
                </template>
            </Splide>
        </div>
    </section>
</template>




<style scoped>
.none {
    display: none;
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--mid-space);
}

h2 {
    font-size: var(--mid-size);
    color: var(--third-color);
    font-weight: 100;
}

.head_slider a {
    text-decoration: none;
    color: var(--first-color);
    cursor: pointer;
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: var(--min-size);
    white-space: nowrap;
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
<style>
.head_slider a svg{
    stroke: var(--first-color);
    width: var(--min-size);
    margin-left: var(--min-space);
}
</style>




<script>
import { getEntityAPI } from '@services/interface.js';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import MidCard from '@components/cards/MidCard.vue';
import MidCardSkeleton from '@components/cards/MidCardSkeleton.vue';
import MinCardSkeleton from '@components/cards/MinCardSkeleton.vue';
import MinCard from '@components/cards/MinCard.vue';
import ArrowPicto from '@assets/svg/ArrowPicto.vue';


export default {
    components: {
        MidCard,
        MinCard,
        MidCardSkeleton,
        MinCardSkeleton,
        Splide,
        SplideSlide,
        ArrowPicto,
    },
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
                    this.trendMedias= [];
                    this.latestMedias= [];
                    this.retrieveTrendMedias();
                    this.retrieveLatestMedias();
                }
            }
        }
    },
    methods: {
        redirectToMedia(mediaId) {
            this.$router.push({ name: 'Media', params: { id: mediaId } });
        },
        async retrieveTrendMedias() {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.trendMedias = await entityAPI.getTrend(14);
        },
        async retrieveLatestMedias() {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.latestMedias = await entityAPI.getLatest(20);
        },
    }
}
</script>