<template>
  <div class="w-full h-screen">
    <div class="swiper-container w-full h-screen">
      <div class="swiper-wrapper">
        <div
          v-for="image in backgrounds"
          :key="image"
          :class="image"
          class="swiper-slide bg-cover"
        >
          <div class="w-full h-full bg-black bg-opacity-60"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHouseSwiper',

  data: () => ({
    backgrounds: ['bg-bg1', 'bg-bg2', 'bg-bg3', 'bg-bg4']
  })
}
</script>
