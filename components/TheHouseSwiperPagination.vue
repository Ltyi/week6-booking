<template>
  <div class="swiper-pagination"></div>
</template>

<script>
export default {
  name: 'TheHouseSwiperPagination'
}
</script>

<style lang="postcss" scoped>
.swiper-pagination >>> .swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border: 1px solid #fff;
  background: unset;
  margin: 0 6px;
  opacity: 1;
}

.swiper-pagination >>> .swiper-pagination-bullet-active {
  background: #fff;
}
</style>
