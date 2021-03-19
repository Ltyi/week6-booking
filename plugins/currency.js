import Vue from 'vue'

const numberFormat = number => {
  return new Intl.NumberFormat().format(number * 1)
}

Vue.directive('currency', {
  bind(el, binding) {
    el.textContent = numberFormat(binding.value)
  },

  update(el, binding) {
    el.textContent = numberFormat(binding.value)
  }
})
