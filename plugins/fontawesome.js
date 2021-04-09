import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCheckCircle, faTimesCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(faCheckCircle, faTimesCircle, faTimes)

Vue.component('FaIcon', FontAwesomeIcon)
