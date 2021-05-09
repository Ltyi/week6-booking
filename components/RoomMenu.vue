<template>
  <div class="flex flex-wrap relative">
    <nuxt-link
      v-for="room in rooms"
      :key="room.id"
      v-slot="{ navigate }"
      :to="`/rooms/${room.id}`"
      custom
    >
      <div
        :style="`background-image: url(${room.imageUrl})`"
        class="w-6/12 lg:w-4/12 h-275 bg-cover bg-center cursor-pointer"
        @click="navigate"
      >
        <div
          class="flex justify-center items-center w-full h-full transition-all group hover:bg-primary hover:bg-opacity-60"
        >
          <span class="text-white text-lg text-center opacity-0 group-hover:opacity-100">
            {{ room.name }}
          </span>
        </div>
      </div>
    </nuxt-link>

    <!-- 讀取 spiner -->
    <div
      v-if="$fetchState.pending"
      class="absolute inset-0 flex items-center justify-center"
    >
      <spiner-animation></spiner-animation>
    </div>

    <!-- 錯誤資訊 -->
    <div v-if="$fetchState.error" class="w-full flex justify-center items-center">
      {{ $fetchState.error.message }}
    </div>
  </div>
</template>

<script>
import { apiGetRooms } from '@/api'

export default {
  name: 'RoomMenu',

  data: () => ({
    rooms: []
  }),

  // [取得房間列表]
  async fetch() {
    try {
      const res = await apiGetRooms()
      this.rooms = [...res.data.items]

      if (!this.rooms.length) {
        throw new Error('目前無任何房間資訊')
      }
    } catch (error) {
      throw new Error('房間資訊載入失敗')
    }
  },

  methods: {
    showDetail(room) {
      this.$router.push({ path: `/rooms/${room.id}` })
    }
  }
}
</script>
