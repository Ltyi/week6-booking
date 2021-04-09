<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
  >
    <div
      class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"
    ></div>
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

<style>
.loader {
  border-top-color: #3498db;
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
