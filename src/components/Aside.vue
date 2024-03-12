<template>
    <div>
        <router-link class="logo" to="/">MédiaMatch</router-link>
        <ul>
            <li>
                <router-link to="/"><HomePicto></HomePicto><span>Accueil</span></router-link>
            </li>
            <li>
                <router-link to="/discover"><DiscoverPicto></DiscoverPicto><span>Découvrir</span></router-link>
            </li>
            <li>
                <router-link to="/news"><NewsPicto></NewsPicto><span>Nouveautés</span></router-link>
            </li>
            <li>
                <router-link to="/ratted"><RattedPicto></RattedPicto><span>Mieux notés</span></router-link>
            </li>
            <li>
                <router-link to="/match"><MatchPicto></MatchPicto><span>Match</span></router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    padding: var(--max-space);
    background-color: var(--second-color-alt);
    height: 100vh;
    position: sticky;
}

.logo {
    font-size: var(--mid-size);
    margin-bottom: var(--max-space);
    color: var(--third-color) !important;
    font-family: 'medium';
}

ul {
    list-style-type: none;
    display: flex;
    justify-content: start;
    align-items: start;
    flex-direction: column;
}

li {
    display: flex;
    justify-content: start;
    align-items: center;
}

.router-link-active {
    color: var(--first-color);
}

a {
    color: var(--third-color-alt);
    text-decoration: none;
    margin-bottom: var(--big-space);
    display: flex;
    justify-content: start;
    align-items: center;
    font-family: 'medium';
    font-size: var(--min-size);
    transition: all ease-in-out .15s;
}

a:hover {
    color: var(--first-color);
    transition: all ease-in-out .15s;
}

@media only screen and (max-width: 760px) {
    div {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: var(--big-space);
        height: auto;
        width: 100%;
    }

    .logo {
        display: none;
    }

    span {
        display: none;
    }

    ul {
        flex-direction: row;
        width: auto;
        justify-content: space-around;
        align-items: center;
        width: 100%;
    }

    a {
        margin-bottom: 0px;
        margin-right: var(--min-space);
        margin-left: var(--min-space);
    }
}
</style>
<style>
a svg {
    margin-right: var(--min-space);
    fill: var(--third-color-alt);
    width: var(--min-size);
    transition: all ease-in-out .15s;
}
.router-link-active svg {
    fill: var(--first-color);
}
a:hover svg {
    fill: var(--first-color);
    transition: all ease-in-out .15s;
}
</style>




<script>
import HomePicto from '@assets/svg/HomePicto.vue';
import NewsPicto from '@assets/svg/NewsPicto.vue';
import RattedPicto from '@assets/svg/RattedPicto.vue';
import DiscoverPicto from '@assets/svg/DiscoverPicto.vue';
import MatchPicto from '@assets/svg/MatchPicto.vue';

export default {
    components: {
        HomePicto,
        NewsPicto,
        RattedPicto,
        DiscoverPicto,
        MatchPicto,
    },
}
</script>