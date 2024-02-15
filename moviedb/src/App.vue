<script setup>
import Aside from '@components/Aside.vue'
import NavBar from '@components/NavBar.vue'
</script>

<template>
  <header>
    <Aside> </Aside>
  </header>
  <main>
    <NavBar />
    <router-view>

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

<script>
  function adjustMainWidth() {
    var headerWidth = document.querySelector('header').offsetWidth;
    document.querySelector('main').style.width = `calc(100% - ${headerWidth}px)`;
  }

  window.onload = adjustMainWidth;
  window.onresize = adjustMainWidth;
</script>