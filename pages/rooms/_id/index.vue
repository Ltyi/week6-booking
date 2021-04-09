<template>
  <div class="relative flex items-stretch min-h-screen text-primary">
    <!-- Swiper Lightbox -->
    <client-only>
      <room-lightbox v-model="lightbox" :images="room.imageUrl"></room-lightbox>
    </client-only>

    <!-- 左側 -->
    <div class="w-4/12 h-full fixed top-0 left-0">
      <!-- Swiper 背景輪播 -->
      <swiper
        ref="swipe"
        class="h-full"
        :options="swiperOptions"
        @click-slide="lightbox = true"
      >
        <swiper-slide v-for="image in room.imageUrl" :key="image">
          <div
            :style="`background-image: url(${image})`"
            class="swiper-slide bg-cover cursor-pointer"
          >
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
            <span v-currency="total.amount" class="text-4xl font-opensans"></span>
            <span class="text-xl mx-4">/</span>
            <span class="text-xl">{{ total.nights }}晚</span>
          </div>

          <button
            class="w-64 bg-primary text-white text-xl font-opensans py-2 mb-12 cursor-pointer pointer-events-auto focus:outline-none"
            @click="goBooking"
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

    <div class="w-8/12 ml-4/12 pt-28 pl-14 pr-64 text-primary">
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

      <!-- 空房狀態查詢 -->
      <div>
        <p class="text-sm font-medium mb-2 mt-12">空房狀態查詢</p>

        <date-picker
          v-model="dateRange"
          v-bind="pickerOptions"
          :disabled-date="disabledDate"
          class="date-picker mb-14"
          @input="dateChange"
        ></date-picker>
      </div>

      <!-- 下訂視窗 -->
      <client-only>
        <room-booking
          v-model="bookingModal"
          v-bind="bookingProps"
          @afterSubmit="afterSubmit"
        ></room-booking>
      </client-only>
    </div>
  </div>
</template>

<script>
import { apiGetRoomDetails } from '@/api'
import { getFacilities } from '@/utils/getFacilities'
import { getRoomSpec } from '@/utils/getRoomSpec'
import { getAmount } from '@/utils/getAmount'

export default {
  // [取得房間資訊]
  async asyncData({ app, route, error }) {
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
    },

    pickerOptions: {
      inline: true,
      range: true,
      valueType: 'format'
    },

    dateRange: [],
    lightbox: false,
    bookingModal: false
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
    },

    // [根據選擇日期區間計算天數及價格]
    total() {
      return this.dateRange.length !== 2
        ? { nights: 1, amount: this.room.normalDayPrice }
        : getAmount(this.dateRange, this.room)
    },

    bookingProps() {
      return {
        dateRange: this.dateRange,
        room: this.room,
        roomSpec: this.roomSpec,
        booking: this.booking,
        facilities: this.facilities,
        description: this.description
      }
    }
  },

  methods: {
    dateChange(val) {
      // 防止選擇錯誤區間
      if (val[0] === val[1]) {
        this.showDateError()
        this.dateRange = []
      }
    },

    disabledDate(date) {
      const dateFormat = this.$dayjs(date).format('YYYY-MM-DD')
      const isBooking = this.booking.map(ele => ele.date).some(ele => ele === dateFormat)

      return isBooking
    },

    goBooking() {
      if (this.dateRange.length !== 2) {
        this.showDateError()
        return
      }

      this.bookingModal = true
    },

    showDateError() {
      this.$notify({
        type: 'error',
        title: '日期選擇錯誤',
        text: '請選擇正確的日期區間擇'
      })
    },

    afterSubmit() {
      this.dateRange = []
      this.$nuxt.refresh()
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

.date-picker >>> .mx-calendar {
  width: 50%;
}

.date-picker >>> .mx-datepicker-main {
  @apply border-2 border-primary;
}
</style>
