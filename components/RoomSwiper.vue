<template>
  <div class="swiper-container room-swiper h-full">
    <div class="swiper-wrapper">
      <div
        v-for="image in images"
        :key="image"
        :style="`background-image: url(${image})`"
        class="swiper-slide bg-cover"
      >
        <div class="w-full h-full bg-gradient-room"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomSwiper',

  props: {
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>
