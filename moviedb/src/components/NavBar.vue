<template>
    <nav>
        <div>
            <button :class="{ 'active_media': selectedMedia === 'films' }" @click="selectMedia('films')">Films</button>
            <button :class="{ 'active_media': selectedMedia === 'series' }" @click="selectMedia('series')">Séries</button>
        </div>
        <router-link  to="/match">{{ selectedMedia === 'films' ? 'Match ton film' : 'Match ta série' }}</router-link>
    </nav>
</template>


<style scoped>
div{
    display: flex;
    justify-content: start;
    align-items: center;
}
div button{
    color: var(--second-color);
    font-family: 'medium';
    font-size: var(--min-size);
    margin-right:var(--mid-space);
    transition: all ease-in-out .15s;
    background-color: transparent;
    border:none;
    cursor: pointer;
}
div button.active_media{
    color: var(--second-color-alt);
}
div button:hover{
    color: var(--second-color-alt);
    transition: all ease-in-out .15s;
}
nav{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: var(--big-space);
    padding-bottom: var(--big-space);
    padding-right: var(--max-space);
    padding-left: var(--max-space);
    border-bottom: solid 1.5px var(--second-color);
}

a{
    background-color: var(--first-color);
    padding-top: var(--min-space);
    padding-bottom: var(--min-space);
    padding-right: var(--mid-space);
    padding-left: var(--mid-space);
    border-radius:var(--min-radius);
    font-family: 'medium';
    font-size:var(--min-size);
    color:white;
    text-decoration:none;
    transition: all ease-in-out .15s;
}
a:hover{
    background-color: var(--first-color-alt);
    transition: all ease-in-out .15s;
}

@media only screen and (max-width: 540px) {
    nav {
        padding: var(--mid-space);
    }
}
</style>



<script>
export default {
    data() {
        return {
            selectedMedia: 'films' 
        };
    },
    methods: {
        selectMedia(media) {
            this.selectedMedia = media;
            this.$emit('media-selected', media);
        }
    }
}
</script>