<template>
  <div class="relative">
    <div class="w-full h-screen">
      <!-- Swiper 背景輪播 -->
      <swiper ref="swipe" :options="swiperOptions" class="h-full">
        <swiper-slide v-for="image in backgrounds" :key="image">
          <div :class="image" class="swiper-slide bg-cover">
            <div class="w-full h-full bg-black bg-opacity-60"></div>
          </div>
        </swiper-slide>
      </swiper>

      <!-- Main -->
      <div class="w-10/12 absolute center z-50">
        <div class="flex align-stretch w-full h-full">
          <div class="w-5/12">
            <!-- Logo -->
            <div class="flex items-center justify-center w-full h-1/2">
              <img src="~assets/images/svg/logo.svg" alt="好室" />
            </div>

            <!-- Contact -->
            <div
              class="flex flex-col justify-end items-center w-full h-1/2 text-xs text-white"
            >
              <div>
                <h1 class="mb-4 font-normal">好室旅店。HOUSE HOTEL</h1>

                <div class="font-thin leading-5">
                  <p>花蓮縣花蓮市國聯一路1號</p>
                  <p>03-8321155</p>
                  <p>HOUSE@HOTEL.COM</p>
                </div>
              </div>
            </div>
          </div>

          <room-menu class="w-7/12"></room-menu>
        </div>

        <!-- Swiper 分頁導航 -->
        <div class="flex justify-center w-5/12 mt-12">
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
  })
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
