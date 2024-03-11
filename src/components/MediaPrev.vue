<template>
    <section>
        <template v-if="media">
            <img :src="getImageUrl(media.poster_path)" alt="">
            <div class="media_data">
                <div class="quick_infos">
                    <p>{{ selectedMedia === 'films' ? media.runtime + " min" : media.number_of_episodes + " épisodes" }}</p>
                    <p>{{ selectedMedia === 'films' ? formatDate(media.release_date) : formatDate(media.first_air_date)
                        }}</p>
                    <p>{{ formatVote(media.vote_average) }}/10</p>
                </div>
                <h1>{{ selectedMedia === 'films' ? media.title : media.name }}</h1>
                <p class="overview">{{ media.overview }}</p>
                <div class="media_genres">
                    <p v-for="genre in media.genres" :key="genre.id">{{ genre.name }}</p>
                </div>
            </div>
        </template>
        <template v-else>
            <p>Chargement du média...</p>
        </template>
    </section>
</template>


<style scoped>
section {
    width: 100%;
    padding: var(--max-space);
    display: flex;
    justify-content: start;
    align-items: start;
}

img {
    width: 400px;
    border-radius: var(--radius);
    margin-right: var(--big-space);
}

.media_data {
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
}

h1 {
    font-family: 'medium';
    font-size: var(--max-size);
    color: var(--third-color);
    margin-bottom: var(--mid-space);
}

.quick_infos {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: var(--mid-space);
}

.quick_infos p:first-child {
    padding-right: var(--mid-space);
    padding-left: 0px;
    border: none
}

.quick_infos p {
    padding-right: var(--mid-space);
    padding-left: var(--mid-space);
    border-left: solid 1px var(--third-color-alt);
    color: var(--third-color);
    font-size: var(--min-size);
}

.overview {
    color: var(--third-color-alt);
    font-size: var(--min-size);
    line-height: var(--mid-line);
    font-weight: 100;
    width: 100%;
    text-align: left;
    margin-bottom: var(--big-space);
}

.media_genres {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
}

.media_genres p {
    padding-left: var(--mid-space);
    padding-right: var(--mid-space);
    padding-top: var(--min-space);
    padding-bottom: var(--min-space);
    color: var(--third-color-alt);
    font-size: var(--min-size);
    border: solid 1px var(--third-color-alt);
    border-radius: var(--radius);
    margin-right: var(--mid-space);
    margin-bottom: var(--mid-space);
}

@media only screen and (max-width: 940px) {
    img {
        width: 100%;
        margin-bottom: var(--big-space);
        margin-right: 0px;
    }

    section {
        flex-direction: column;
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


<script>
import { getEntityAPI } from '@services/interface.js'
import { getImageUrl, formatDate, formatVote } from '@services/utils.js'

export default {
    props: {
        selectedMedia: String
    },
    data() {
        return {
            media: null
        };
    },
    created() {
        const mediaId = this.$route.params.id;
        this.retrieveMedia(mediaId);
    },
    methods: {
        async retrieveMedia(mediaId) {
            const entityAPI = getEntityAPI(this.selectedMedia);
            this.media = await entityAPI.getMedia(mediaId);
            console.log(this.media);
        },
        getImageUrl,
        formatDate,
        formatVote
    }
}
</script>