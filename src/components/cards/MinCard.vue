
<template>
    <SplideSlide class="splide__slide min_card" @click="redirectToMedia(media.id)">
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
  </template>



<style scoped>

.min_card{
    width: var(--min-card-width) !important;
}

.min_card{
    display: flex;
    justify-content: start;
    flex-direction: column;
    align-items: start;
    transition: all ease-in-out .15s;
}
.min_card:hover{
    transform: scale(0.98);
    transition: all ease-in-out .15s;
}
.img_poster{
    width:100%;
    height: var(--min-card-height);
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
    font-family: 'medium';
    font-size: var(--min-size);
    color: var(--third-color-alt);
    margin-bottom: 4px;
}
.card_infos span {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
}
.card_date{
    font-family:'light';
    font-weight:100;
    font-size: var(--tin-size);
    color: var(--third-color-alt);
    padding-right: var(--min-space);
    border-right: solid 1px var(--third-color-alt);
    margin-right: var(--min-space);
}
.card_vote{
    font-family:'light';
    font-size: var(--tin-size);
    color: var(--first-color);
    display: flex;
    align-items: center;
}
.one-line {
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    position:relative;
  }
  .one-line:not(:hover) {
    text-overflow: ellipsis;
  }
  .bg_oneline{
    position:absolute;
    width:100%;
    background: rgb(44,44,52);
    background: linear-gradient(90deg, rgba(28,28,38,0) 75%, rgba(28,28,38,1) 100%);
    height: -webkit-fill-available;
    z-index:3;
  }
  .one-line:hover span, .one-line:focus span {
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