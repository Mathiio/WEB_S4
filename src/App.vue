<template>
  <header>
    <Aside> </Aside>
  </header>
  <main>
    <NavBar @media-selected="updateSelectedMedia" />
    <router-view :selected-media="selectedMedia">

    </router-view>
  </main>
</template>


<style>
main {
  height: 100vh;
  overflow-y: scroll;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
}
main::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
}

main::-webkit-scrollbar
{
	width: 10px;
}

main::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	background-color: var(--second-color-alt);
}

@media only screen and (max-width: 760px) {
  header {
    position: fixed;
    z-index: 4;
    bottom: 0px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  main {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-bottom: var(--max-space);
    padding-bottom: var(--max-space);
  }
}
</style>



<script setup>
import Aside from '@components/Aside.vue'
import NavBar from '@components/NavBar.vue'
import { ref } from 'vue'

function adjustMainWidth() {
  const headerWidth = document.querySelector('header').offsetWidth;
  const mainElement = document.querySelector('main');
  mainElement.style.width = `calc(100% - ${headerWidth}px)`;
}

if (window.innerWidth > 760) {
  window.addEventListener('load', adjustMainWidth);
}
window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    adjustMainWidth();
  } else {
    document.querySelector('main').style.width = '';
  }
});

const selectedMedia = ref('films');

function updateSelectedMedia(media) {
  selectedMedia.value = media;
}
</script>