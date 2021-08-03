const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')


draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    console.log('dragStart')
    draggable.classList.add('dragging')
  })
  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault()
    console.log('dragover')
    const {closestElement, position} = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')

    if (closestElement === undefined) {
      container.append(draggable)
    } else {

      if (position === 'up') {
        closestElement.parentNode.insertBefore(draggable, closestElement);
      }
      if (position === 'down') {

        closestElement.parentNode.insertBefore(draggable, closestElement.nextSibling)
      }
    }
  })
})

const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  let distance = Number.POSITIVE_INFINITY
  let distanceAbsolute = Number.POSITIVE_INFINITY
  let closestElement;
  draggableElements.forEach((draggableElement) => {
    const rectange = draggableElement.getBoundingClientRect();
    const draggableElementCenter = (rectange.top + rectange.bottom) / 2

    if (Math.abs(draggableElementCenter - y) < distanceAbsolute) {
      distanceAbsolute = Math.abs(draggableElementCenter - y)
      closestElement = draggableElement

      distance = (draggableElementCenter - y)
    }
  })

  return {closestElement: closestElement, position: (Math.sign(distance) === -1) ? 'down' : 'up'}

}
