<template>
  <div
    v-if="value"
    class="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50"
  >
    <swiper ref="swipe" :options="swiperOptions" class="h-full" @click-slide="close">
      <swiper-slide
        v-for="image in images"
        :key="image"
        class="flex justify-center items-center cursor-pointer"
      >
        <img :src="image" class="max-w-4xl" />
      </swiper-slide>

      <div slot="button-next" class="swiper-button-next"></div>
      <div slot="button-prev" class="swiper-button-prev"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'RoomLightbox',

  props: {
    value: Boolean,
    images: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    swiperOptions: {
      slidesPerView: 1,
      centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    }
  }),

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          document.documentElement.classList.add('overflow-y-hidden')
        } else {
          document.documentElement.classList.remove('overflow-y-hidden')
        }
      }
    }
  },

  methods: {
    close() {
      this.$emit('input', false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .swiper-button-next,
  .swiper-button-prev {
    width: 64px;
    height: 64px;
    color: white;
    &::after {
      font-size: 64px;
    }
    &.swiper-button-disabled {
      pointer-events: unset;
    }
  }
}
</style>
