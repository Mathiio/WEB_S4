<template>
    <section>
        <div class="head_slider">
            <h2>Surfe sur les dernières arrivées</h2>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, pagination: false, autoplay: true }">
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
    <section>
        <div class="head_slider">
            <h2>Dernières actualités côté, {{ this.genre1.name }}</h2>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, pagination: false }">
                <template v-if="latestGenre1.length > 0">
                    <MidCard v-for="media in latestGenre1" :key="media.id" :media="media"
                        :selectedMedia="selectedMedia"></MidCard>
                </template>
                <template v-else>
                    <MidCardSkeleton v-for="index in 10" :key="index"></MidCardSkeleton>
                </template>
            </Splide>
        </div>
    </section>
    <section>
        <div class="head_slider">
            <h2>Dernières actualités côté, {{ this.genre2.name }}</h2>
        </div>
        <div class="wrapper">
            <Splide :options="{ rewind: true, pagination: false }">
                <template v-if="latestGenre2.length > 0">
                    <MidCard v-for="media in latestGenre2" :key="media.id" :media="media"
                        :selectedMedia="selectedMedia"></MidCard>
                </template>
                <template v-else>
                    <MidCardSkeleton v-for="index in 10" :key="index"></MidCardSkeleton>
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
    justify-content: start;
    align-items: center;
    margin-bottom: var(--mid-space);
}

h2 {
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
            latestMedias: [],
            latestGenre1: [],
            latestGenre2: [],
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
                this.latestGenre1 = await entityAPI.getLatestMediasByGenre(this.genre1, 10);
                this.latestGenre2 = await entityAPI.getLatestMediasByGenre(this.genre2, 10);
            } finally {
                this.loadinglatestGenre = false;
            }
        },
        Splide,
        SplideTrack,
        SplideSlide,
    }
}
</script>