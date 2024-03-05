<template>
    <div>
        <router-link class="logo" to="/">MédiaMatch</router-link>
        <ul>
            <li>   
                <router-link  to="/"><ion-icon name="home"></ion-icon><span>Accueil</span></router-link>
            </li>
            <li>
                <router-link to="/discover"><ion-icon  name="navigate-circle"></ion-icon><span>Découvrir</span></router-link>
            </li>
            <li>
                <router-link  to="/news"><ion-icon  name="time"></ion-icon><span>Nouveautés</span></router-link>
            </li>
            <li>
                <router-link to="/ratted"><ion-icon  name="star"></ion-icon><span>Mieux notés</span></router-link>
            </li>
            <li>
                <router-link to="/match"><ion-icon name="heart-circle"></ion-icon><span>Match</span></router-link>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    div{
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: start;
        padding:var(--max-space);
        background-color:var(--second-color-alt);
        height:100vh;
        position:sticky;
    }
    .logo{
        font-size:var(--mid-size);
        margin-bottom:var(--max-space);
        color:var(--third-color) !important;
        font-family:'medium';
    }
    ul{
        list-style-type: none;
        display: flex;
        justify-content: start;
        align-items: start;
        flex-direction: column;
    }
    li{
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .router-link-active{
        color:var(--first-color);
    }
    a{
        color:var(--third-color-alt);
        text-decoration: none;
        margin-bottom:var(--big-space);
        display: flex;
        justify-content: start;
        align-items: center;
        font-family:'medium';
        font-size: var(--min-size);
        transition: all ease-in-out .15s;
    }
    a:hover{
        color:var(--first-color);
        transition: all ease-in-out .15s;
    }
    a ion-icon{
        margin-right:var(--min-space);
        font-size: var(--mid-size);
    }
    @media only screen and (max-width: 760px) {
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding:var(--big-space);
            height:auto;
            width:100%;
        }
        .logo{
            display:none;
        }
        span{
            display:none;
        }
        ul{
            flex-direction: row;
            width:auto;
            justify-content: center;
            align-items: center;
            width:100%;
        }
        a{
            margin-bottom: 0px;
            margin-right:var(--min-space);
            margin-left:var(--min-space);
        }
    }
</style>