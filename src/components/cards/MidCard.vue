<template>
    <SplideSlide class="splide__slide mid_card" @click="redirectToMedia(media.id)">
        <div class="img_banner"
            :style="'background:url(' + getImageUrl(media.backdrop_path) + ') center center; background-size: cover;'">
        </div>
        <div class="card_infos">
            <h3 class="one_line">
                <div class="bg_oneline"></div>
                <span>{{ selectedMedia === 'films' ? media.title : media.name }}</span>
            </h3>
            <span class="date_vote">
                <p class="card_date">{{ selectedMedia === 'films' ? formatDate(media.release_date)
        : formatDate(media.first_air_date) }}</p>
                <span class="card_vote">
                    <p>{{ formatVote(media.vote_average) }}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z" />
                    </svg>
                </span>
            </span>
        </div>
    </SplideSlide>
</template>



<style scoped>
.mid_card {
    width: var(--mid-card-width) !important;
}

.mid_card {
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: start;
    transition: all ease-in-out .15s;
}

.mid_card:hover {
    transform: scale(0.98);
    transition: all ease-in-out .15s;
}

.img_banner {
    width: 100%;
    height: var(--mid-card-height);
    border-radius: var(--radius);
}

.card_infos {
    margin-top: var(--mid-space);
    display: flex;
    justify-content: start;
    align-items: start;
    align-content: start;
    flex-wrap: wrap;
    width: 100%;
}

.card_infos h3 {
    /* font-family: 'medium'; */
    font-size: var(--min-size);
    color: var(--third-color-alt);
    margin-bottom: 4px;
}

.date_vote {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
}

.card_date {
    font-family: 'light';
    font-weight: 100;
    font-size: var(--tin-size);
    color: var(--third-color-alt);
    padding-right: var(--min-space);
    border-right: solid 1px var(--third-color-alt);
    margin-right: var(--min-space);
}

.card_vote {
    font-family: 'light';
    font-size: var(--tin-size);
    color: var(--first-color);
    display: flex;
    align-items: center;
    align-content: center;
}

.card_vote svg {
    width: var(--tin-size);
    fill: var(--first-color);
    margin-left: 4px;
}

.one_line {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    position: relative;
}

.one_line:not(:hover) {
    text-overflow: ellipsis;
}

.bg_oneline {
    position: absolute;
    width: 100%;
    background: rgb(44, 44, 52);
    background: linear-gradient(90deg, rgba(28, 28, 38, 0) 75%, rgba(28, 28, 38, 1) 100%);
    height: -webkit-fill-available;
    z-index: 3;
}

.one_line:hover span,
.one_line:focus span {
    display: inline-block;
    animation-name: scroll-text;
    animation-duration: 7s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: infinite;
    animation-direction: normal;
}

@keyframes scroll-text {
    0% {
        transform: translateX(0%);
    }

    90% {
        transform: translateX(-100%);
    }

    95% {
        transform: translateX(0%);
    }

    100% {
        transform: translateX(0%);
    }
}
</style>



<script>
import { getImageUrl, formatDate, formatVote } from '@services/utils.js'
import { SplideSlide } from '@splidejs/vue-splide';

export default {
    props: {
        media: Object,
        selectedMedia: String
    },
    methods: {
        redirectToMedia(mediaId) {
            this.$router.push({ name: 'MediaPrev', params: { id: mediaId } });
        },
        getImageUrl,
        formatDate,
        formatVote
    }
}
</script>