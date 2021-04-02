<template>
  <transition leave-active-class="duration-200">
    <div v-show="value" class="fixed inset-0 overflow-y-auto w-full z-50">
      <div class="flex items-center justify-center min-h-screen">
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="ease-out duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          leave-active-class="ease-in duration-200"
        >
          <div v-show="value" class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-100 opacity-80"></div>
          </div>
        </transition>

        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-class="translate-y-0 opacity-100 sm:scale-100"
          leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        >
          <div v-show="value" class="flex flex-grow itesm-stretch transform max-w-6xl">
            <!-- 預訂資料 -->
            <div class="w-5/12 bg-primary px-16 pt-12 pb-6">
              <div class="fieldBox">
                <label for="name" class="fieldText">姓名</label>
                <input id="name" v-model="name" type="text" class="h-9 px-2" />
              </div>

              <div class="fieldBox">
                <label for="tel" class="fieldText">電話</label>
                <input id="tel" v-model="tel" type="text" class="h-9 px-2" />
              </div>

              <div class="fieldBox">
                <p class="fieldText">入住日期</p>
                <date-picker
                  v-model="checkIn"
                  value-type="format"
                  :disabled-date="disabledDate"
                ></date-picker>
              </div>

              <div class="fieldBox">
                <p class="fieldText">退房日期</p>
                <date-picker
                  v-model="checkOut"
                  value-type="format"
                  :disabled-date="disabledDate"
                ></date-picker>
              </div>

              <div v-if="total" class="text-secondary text-sm">
                <p>
                  <span>{{ total.nights + 1 }} 天，{{ total.normalDays }} 晚平日</span>

                  <span v-if="total.nights - total.normalDays > 0">
                    {{ total.nights - total.normalDays }} 晚假日
                  </span>
                </p>
              </div>

              <div class="h-0.5 bg-secondary bg-opacity-50 my-3"></div>

              <div v-if="total" class="text-right text-white">
                <p class="text-sm">總計</p>
                <p class="text-2xl leading-9 font-opensans">
                  <span>$</span>
                  <span v-currency="total.amount"></span>
                </p>
              </div>

              <button
                class="w-full bg-primary border border-white text-white text-lg py-2 my-4 cursor-pointer focus:outline-none hover:bg-secondary transition-all"
                @click="submit"
              >
                確認送出
              </button>

              <div class="text-white text-center text-xs font-light">
                此預約系統僅預約功能，並不會對您進行收費
              </div>
            </div>

            <!-- 房型資訊 -->
            <div class="w-7/12 border-primary border-2 bg-white px-8 pt-8 pb-6">
              <div class="text-right cursor-pointer" @click="close">
                <fa-icon icon="times" size="lg"></fa-icon>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { getAmount } from '@/utils/getAmount'
import { apiPostBooking } from '@/api'

export default {
  name: 'RoomBooking',

  props: {
    value: Boolean,
    dateRange: {
      type: Array,
      default: () => []
    },
    room: {
      type: Object,
      default: () => ({})
    },
    booking: {
      type: Array,
      default: () => []
    }
  },

  data: () => ({
    name: '',
    tel: '',
    checkIn: '',
    checkOut: ''
  }),

  computed: {
    total() {
      const date = [this.checkIn, this.checkOut]

      return !this.checkIn || !this.checkOut ? null : getAmount(date, this.room)
    },

    fieldIsEmpty() {
      return !this.name || !this.tel || !this.checkIn || !this.checkOut
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val) {
          document.documentElement.classList.add('overflow-y-hidden')

          const [checkIn, checkOut] = this.dateRange
          this.checkIn = checkIn
          this.checkOut = checkOut
        } else {
          document.documentElement.classList.remove('overflow-y-hidden')
        }
      }
    },

    checkIn(val) {
      this.validkDateOrder()
    },

    checkOut(val) {
      this.validkDateOrder()
    }
  },

  methods: {
    close() {
      this.$emit('input', false)

      setTimeout(() => {
        this.reset()
      }, 300)
    },

    reset() {
      this.checkIn = ''
      this.checkOut = ''
      this.name = ''
      this.tel = ''
    },

    disabledDate(date) {
      const dateFormat = this.$dayjs(date).format('YYYY-MM-DD')
      const isBooking = this.booking.map(ele => ele.date).some(ele => ele === dateFormat)

      return isBooking
    },

    validkDateOrder() {
      const arr = [this.checkIn, this.checkOut]

      if (this.$dayjs(this.checkIn).isAfter(this.checkOut)) {
        arr.reverse()
        this.checkIn = arr[0]
        this.checkOut = arr[1]
      }
    },

    validDateRange(range) {
      const [start] = range
      const days = [...Array(this.total.nights + 1).keys()].map(num =>
        this.$dayjs(start).add(num, 'day').format('YYYY-MM-DD')
      )

      const result = days.some(day => {
        return this.booking.some(ele => ele.date === day)
      })

      return result
    },

    async submit() {
      try {
        if (this.fieldIsEmpty) {
          this.$notify({
            type: 'error',
            title: '資料填寫不完全',
            text: '請填寫預訂資料'
          })

          return
        }

        const payload = {
          name: this.name,
          tel: this.tel,
          date: [this.checkIn, this.checkOut]
        }

        // 檢查預訂日期之間是否已有預訂資料
        const isInvalid = this.validDateRange(payload.date)

        if (isInvalid) {
          this.$notify({
            type: 'error',
            title: '預訂失敗',
            text: '選擇的日期區間已有預訂資料'
          })

          return
        }

        // 送出預訂
        await apiPostBooking(this.room.id, payload)

        // 預訂完成發送事件回頁面進行清除
        this.reset()
        this.$emit('afterSubmit')
      } catch (error) {
        this.$notify({
          type: 'error',
          title: '預訂失敗',
          text: error.response.data.message
        })
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.fieldBox {
  @apply flex flex-col mb-4;
}

.fieldText {
  @apply mb-2 text-sm text-white;
}
</style>

<style lang="scss" scoped>
::v-deep {
  .mx-datepicker {
    @apply w-full;
  }

  .mx-input {
    border-radius: unset;
    @apply h-9;
  }
}
</style>
