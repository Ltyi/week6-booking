<template>
  <div class="flex items-stretch h-screen text-primary">
    <!-- 左側 -->
    <div class="w-4/12 h-full fixed top-0 left-0">
      <!-- Swiper 背景輪播 -->
      <swiper ref="swipe" :options="swiperOptions" class="h-full">
        <swiper-slide v-for="image in room.imageUrl" :key="image">
          <div :style="`background-image: url(${image})`" class="swiper-slide bg-cover">
            <div class="w-full h-full bg-gradient-room"></div>
          </div>
        </swiper-slide>
      </swiper>

      <div
        class="flex flex-col items-center absolute w-full h-full top-0 left-0 py-28 z-50 pointer-events-none"
      >
        <nuxt-link
          class="inline-flex justify-center items-center cursor-pointer select-none pointer-events-auto"
          to="/"
        >
          <img src="~assets/images/icons/left.svg" class="w-2 mr-2" />
          <span class="text-sm">查看其他房型</span>
        </nuxt-link>

        <div class="flex-grow"></div>

        <div>
          <div class="text-center mb-3">
            <span class="text-4xl font-opensans">$</span>
            <span v-currency="room.normalDayPrice" class="text-4xl font-opensans"></span>
            <span class="text-xl mx-4">/</span>
            <span class="text-xl">1晚</span>
          </div>

          <button
            class="w-64 bg-primary text-white text-xl font-opensans py-2 mb-12 cursor-pointer pointer-events-auto focus:outline-none"
          >
            Booking now
          </button>
        </div>

        <!-- Swiper 分頁導航 -->
        <div class="flex justify-center items-center">
          <div slot="pagination" class="swiper-pagination border-primary"></div>
        </div>
      </div>
    </div>

    <div class="w-8/12 ml-4/12 py-28 pl-14 pr-64 text-primary">
      <div class="flex items-center mb-12">
        <h1 class="text-4xl font-opensans font-bold">{{ room.name }}</h1>
        <h2 class="text-sm font-medium ml-auto">{{ roomSpec }}</h2>
      </div>

      <!-- 房間價格及入住時間 -->
      <div>
        <p>
          <span>平日（一～四）價格：{{ room.normalDayPrice }}</span>
          <span>/</span>
          <span>假日（五〜日）價格：{{ room.holidayPrice }}</span>
        </p>
        <p>
          <span>入住時間：{{ room.checkInAndOut.checkInEarly }} (最早)</span>
          <span>/</span>
          <span>{{ room.checkInAndOut.checkInLate }} (最晚)</span>
        </p>
        <p>退房時間：{{ room.checkInAndOut.checkOut }}</p>
      </div>

      <!-- 房間說明 -->
      <ul class="my-12">
        <li v-for="item in description" :key="item">
          <span>・</span>
          {{ item }}
        </li>
      </ul>

      <!-- 房間設施 -->
      <room-facilities :facilities="facilities"></room-facilities>
    </div>
  </div>
</template>

<script>
import { apiGetRoomDetails } from '@/api'
import { getFacilities } from '@/utils/getFacilities'
import { getRoomSpec } from '@/utils/getRoomSpec'

export default {
  // [取得房間資訊]
  async asyncData({ route, error }) {
    try {
      const res = await apiGetRoomDetails(route.params.id)
      const room = res.data.room[0]
      const booking = res.data.booking
      const facilities = getFacilities(room.amenities)

      return { room, facilities, booking }
    } catch (e) {
      error({ statusCode: 404, message: e.message })
    }
  },

  data: () => ({
    swiperOptions: {
      pagination: { el: '.swiper-pagination', clickable: true }
    }
  }),

  computed: {
    // [房間規格]
    roomSpec() {
      return getRoomSpec(this.room.amenities, this.room.descriptionShort)
    },

    // [房間說明文字]
    description() {
      const arr = this.room.description.split('.')
      const result = arr.filter(ele => ele !== '').map(ele => ele.trim())

      return result
    }
  }
}
</script>

<style lang="postcss" scoped>
.swiper-pagination >>> .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: unset;
  margin: 0 6px;
  opacity: 1;
  @apply border-primary border pointer-events-auto;
}

.swiper-pagination >>> .swiper-pagination-bullet-active {
  @apply bg-primary;
}
</style>
