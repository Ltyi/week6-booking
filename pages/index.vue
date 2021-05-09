<template>
  <div class="relative">
    <div class="w-full h-screen">
      <!-- Swiper 背景輪播 -->
      <div class="fixed inset-0">
        <swiper ref="swipe" :options="swiperOptions" class="h-full">
          <swiper-slide v-for="image in backgrounds" :key="image">
            <div :class="image" class="swiper-slide bg-cover">
              <div class="w-full h-full bg-black bg-opacity-60"></div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Main -->
      <div class="w-10/12 absolute center z-50 h-full lg:h-auto">
        <div class="flex align-stretch flex-wrap w-full min-h-full lg:min-h-0">
          <div
            class="flex flex-wrap justify-center items-center w-full h-screen mb-4 py-4 lg:flex-col lg:h-auto lg:w-5/12 lg:mb-0 lg:py-0"
          >
            <!-- Logo -->
            <div class="flex items-center justify-center w-full">
              <img src="~assets/images/svg/logo.svg" alt="好室" />
            </div>

            <!-- Contact -->
            <div class="w-full text-center text-xs text-white">
              <div>
                <h1 class="mb-4 mt-8 font-normal">好室旅店。HOUSE HOTEL</h1>

                <div class="font-thin leading-5">
                  <p>花蓮縣花蓮市國聯一路1號</p>
                  <p>03-8321155</p>
                  <p>HOUSE@HOTEL.COM</p>
                </div>
              </div>
            </div>

            <div class="w-full text-white text-center self-end lg:hidden" @click="scroll">
              <fa-icon
                icon="angle-double-down"
                size="lg"
                class="animate__animated animate__bounce animate__infinite"
              ></fa-icon>
            </div>
          </div>

          <room-menu id="scrollTo" class="w-full lg:w-7/12 mb-4 lg:mb-0"></room-menu>
        </div>

        <!-- Swiper 分頁導航 -->
        <div class="justify-center w-5/12 mt-12 hidden lg:flex">
          <div slot="pagination" class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pages',

  data: () => ({
    backgrounds: ['bg-bg1', 'bg-bg2', 'bg-bg3', 'bg-bg4'],
    swiperOptions: {
      pagination: { el: '.swiper-pagination', clickable: true }
    }
  }),

  methods: {
    scroll() {
      document.querySelector('#scrollTo').scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<style lang="postcss" scoped>
.center {
  @apply top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4;
}

.swiper-pagination >>> .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border: 1px solid #fff;
  background: unset;
  margin: 0 6px;
  opacity: 1;
}

.swiper-pagination >>> .swiper-pagination-bullet-active {
  background: #fff;
}
</style>
