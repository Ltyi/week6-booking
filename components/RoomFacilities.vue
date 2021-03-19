<template>
  <div class="flex flex-wrap">
    <div
      v-for="icon in icons"
      :key="icon.text"
      class="flex justify-center items-end mr-10 my-4"
      :class="facilities[icon.image] ? '' : 'opacity-40'"
    >
      <img :src="require(`~/assets/images/icons/${icon.image}.svg`)" :alt="icon.text" />

      <fa-icon
        v-if="facilities[icon.image]"
        icon="check-circle"
        class="self-start ml-1"
      ></fa-icon>
      <fa-icon v-else icon="times-circle" class="self-start ml-1"></fa-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomFacilities',

  props: {
    facilities: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    icons: [
      { text: '早餐', image: 'breakfast' },
      { text: 'Mini Bar', image: 'minibar' },
      { text: 'Room Service', image: 'roomservice' },
      { text: 'Wifi', image: 'wifi' },
      { text: '適合兒童', image: 'childFriendly' },
      { text: '電話', image: 'tel' },
      { text: '漂亮的視野', image: 'view' },
      { text: '冰箱', image: 'freezer' },
      { text: '沙發', image: 'sofa' },
      { text: '攜帶寵物', image: 'pet' },
      { text: '全面禁菸', image: 'smoke' },
      { text: '空調', image: 'ac' }
    ]
  })
}
</script>
