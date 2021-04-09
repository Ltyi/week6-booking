<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
  >
    <spiner-animation></spiner-animation>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpiner',

  computed: {
    isOpen() {
      return this.$store.state.spiner.isOpen
    }
  }
}
</script>
