<template>
  <header>
    <Aside> </Aside>
  </header>
  <main>
    <NavBar  @media-selected="updateSelectedMedia" />
    <router-view :selected-media="selectedMedia">

    </router-view>
  </main>
</template>


<style>
main {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
}
@media only screen and (max-width: 940px) {
  header{
    position:fixed;
    z-index:4;
    bottom: var(--big-space);
    width:auto;
    left: 50%;
    transform: translateX(-50%);
  }
  main {
    width: 100%;
    margin-bottom:var(--max-space);
    padding-bottom:var(--max-space);
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

  if(window.innerWidth > 940){
    window.addEventListener('load', adjustMainWidth);
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 940) {
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