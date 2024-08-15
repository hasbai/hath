export default () => {
  // fix safari zooming
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}