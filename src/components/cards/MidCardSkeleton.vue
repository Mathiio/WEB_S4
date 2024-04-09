<template>
  <SplideSlide class="splide__slide mid_card">
    <div class="img_banner skeleton"></div>
    <div class="card_infos">
      <h3 class="skeleton">
      </h3>
      <span class="skeleton">
      </span>
    </div>
  </SplideSlide>
</template>



<style scoped>
.skeleton {
  position: relative;
  overflow: hidden;
  background-color: rgba(236, 236, 236, 0.2);
  border-radius: var(--radius);
}

.skeleton::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0) 100%);
  animation: shimmer 1.4s infinite;
  content: '';
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.mid_card {
  width: var(--mid-card-width) !important;
}

.mid_card {
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  transition: all ease-in-out .15s;
}

.mid_card:hover {
  transform: scale(0.98);
  transition: all ease-in-out .15s;
}

.img_banner {
  width: 100%;
  height: var(--mid-card-height);
  border-radius: var(--radius);
}

.card_infos {
  margin-top: var(--mid-space);
  display: flex;
  justify-content: start;
  align-items: start;
  align-content: start;
  flex-wrap: wrap;
  width: 100%;
}

.card_infos h3 {
  margin-bottom: 4px;
  width: 100%;
  height: var(--min-size);
}

.card_infos span {
  width: 60%;
  height: var(--min-size);
}
</style>