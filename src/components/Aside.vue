<template>
    <div>
        <h2>MatchYourMedia</h2>
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
        border-right: solid 1.5px var(--second-color);
        height:100vh;
        position:sticky;
    }
    h2{
        font-family: 'bold';
        font-size:var(--mid-size);
        margin-bottom:var(--max-space);
        color:var(--second-color-alt);
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
        color:var(--second-color);
    }
    .router-link-active{
        color:var(--first-color);
    }
    a{
        color:var(--second-color);
        text-decoration: none;
        margin-bottom:var(--big-space);
        display: flex;
        justify-content: start;
        align-items: center;
        font-family: 'medium';
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
    @media only screen and (max-width: 940px) {
        div{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding:var(--big-space);
            border: solid 1.5px var(--second-color);
            height:auto;
            border-radius:var(--mid-radius);
            background-color: white;
            margin:0 auto;
        }
        h2{
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
        }
        a{
            margin-bottom: 0px;
            margin-right:var(--min-space);
            margin-left:var(--min-space);
        }
    }
</style>