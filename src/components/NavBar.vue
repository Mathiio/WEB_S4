<template>
    <nav>
        <router-link class="logo" to="/">MédiaMatch</router-link>
        <div>
            <button :class="{ 'active_media': selectedMedia === 'films' }" @click="selectMedia('films')">Films</button>
            <button :class="{ 'active_media': selectedMedia === 'series' }" @click="selectMedia('series')">Séries</button>
        </div>
        <router-link class="match" to="/match">Chercher un match</router-link>
    </nav>
</template>


<style scoped>
div{
    display: flex;
    justify-content: start;
    align-items: center;
}
.logo{
    font-size:var(--mid-size);
    color:var(--third-color);
    font-family:'medium';
    text-decoration:none;
    display:none;
}
div button{
    color: var(--third-color-alt);
    font-size: var(--min-size);
    margin-right:var(--mid-space);
    transition: all ease-in-out .15s;
    background-color: transparent;
    border:none;
    cursor: pointer;
    font-family:'medium';
}
div button.active_media{
    color: var(--first-color);
}
div button:hover{
    color: var(--first-color);
    transition: all ease-in-out .15s;
}
nav{
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--max-space);
}
.match{
    background-color: var(--first-color);
    padding: var(--mid-space);
    border-radius:var(--radius);
    font-size:var(--min-size);
    color:var(--second-color);
    text-decoration:none;
    font-family: 'medium';
    transition: all ease-in-out .15s;
}
.match:hover{
    background-color: var(--first-color-alt);
    transition: all ease-in-out .15s;
}

@media only screen and (max-width: 760px) {
    .logo{
        display:block;
    }
    .match{
        display:none;
    }
    nav{
        padding: var(--big-space);
    }
    div button{
        margin-right:0px;
        margin-left:var(--mid-space);
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