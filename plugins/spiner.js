export default ({ app, store }, inject) => {
  inject('spiner', payload => store.dispatch('spiner/setIsOpen', payload))
}
