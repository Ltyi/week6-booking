<template>
  <div class="relative">
    <TheHouseSwiper></TheHouseSwiper>

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

        <TheRoomMenu class="w-7/12"></TheRoomMenu>
      </div>

      <div class="flex justify-center w-5/12 mt-12 bg-black">
        <TheHouseSwiperPagination></TheHouseSwiperPagination>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper, { Pagination } from 'swiper'

export default {
  name: 'Pages',

  data: () => ({
    swiper: null
  }),

  mounted() {
    Swiper.use([Pagination])

    this.swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    })
  }
}
</script>

<style lang="postcss" scoped>
.center {
  @apply top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4;
}
</style>
