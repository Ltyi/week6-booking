<template>
  <div class="font-noto relative">
    <Nuxt />

    <!-- 全局通知插件 -->
    <client-only>
      <notifications width="400px" position="top center" />
    </client-only>

    <!-- 全局讀取樣式 -->
    <loading-spiner></loading-spiner>
  </div>
</template>
