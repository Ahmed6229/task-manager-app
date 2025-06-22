const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

// 1️⃣ تحميل بيانات المهمة
const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)

    const { _id, completed, title } = task
    taskIDDOM.textContent = _id
    taskNameDOM.value = title
    taskCompletedDOM.checked = completed
    tempName = title
  } catch (error) {
    console.error(error)
  }
}
showTask()

// 2️⃣ تعديل بيانات المهمة
editFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  editBtnDOM.textContent = 'Loading...'

  try {
    const updatedTitle = taskNameDOM.value
    const updatedCompleted = taskCompletedDOM.checked

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      title: updatedTitle,
      completed: updatedCompleted,
    })

    taskIDDOM.textContent = task._id
    taskNameDOM.value = task.title
    taskCompletedDOM.checked = task.completed

    formAlertDOM.textContent = '✅ Task updated successfully!'
    formAlertDOM.style.display = 'block'
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error('❌ Update error:', error)
    taskNameDOM.value = tempName
    formAlertDOM.textContent = '❌ Error, try again'
    formAlertDOM.style.display = 'block'
    formAlertDOM.classList.add('text-danger')
  }

  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success', 'text-danger')
  }, 3000)
})
