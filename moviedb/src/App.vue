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


<style scoped>
main {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
}
</style>

<script setup>
import Aside from '@components/Aside.vue'
import NavBar from '@components/NavBar.vue'
import { ref } from 'vue'

  function adjustMainWidth() {
    var headerWidth = document.querySelector('header').offsetWidth;
    document.querySelector('main').style.width = `calc(100% - ${headerWidth}px)`;
  }

  window.onload = adjustMainWidth;
  window.onresize = adjustMainWidth;

  const selectedMedia = ref('films');

  function updateSelectedMedia(media) {
    selectedMedia.value = media;
  }
</script>