<template>
  <div class="flex flex-wrap bg-gray-400">
    <div
      v-for="room in rooms"
      :key="room.title"
      class="w-4/12 h-275 bg-cover bg-center cursor-pointer"
      :class="room.class"
    >
      <div
        class="flex justify-center items-center w-full h-full transition-all group hover:bg-primary hover:bg-opacity-60"
      >
        <span class="text-white text-lg opacity-0 group-hover:opacity-100">
          {{ room.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheRoomMenu',

  data: () => ({
    rooms: [
      {
        class: 'bg-room1',
        title: 'Single Room'
      },
      {
        class: 'bg-room2',
        title: 'Double Room'
      },
      {
        class: 'bg-room3',
        title: 'Twin Room'
      },
      {
        class: 'bg-room4',
        title: 'Deluxe Single Room'
      },
      {
        class: 'bg-room5',
        title: 'Deluxe Double Room'
      },
      {
        class: 'bg-room6',
        title: 'Deluxe Twin Room'
      }
    ]
  })
}
</script>
