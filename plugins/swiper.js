import Vue from 'vue'
import { Swiper as SwiperClass, Pagination, Navigation } from 'swiper/swiper.esm'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'

SwiperClass.use([Pagination, Navigation])
Vue.use(getAwesomeSwiper(SwiperClass))
