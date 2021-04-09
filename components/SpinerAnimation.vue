<template>
  <div
    class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"
  ></div>
</template>

<script>
export default {
  name: 'SpinerAnimation'
}
</script>

<style>
.loader {
  border-top-color: #38470b;
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
