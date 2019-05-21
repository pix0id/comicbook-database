const addComicForm = document.querySelector('#add-comic')

addComicForm.addEventListener('submit', e => {
    e.preventDefault()

    let formData = {}

    addComicForm.querySelectorAll('input').forEach(el => {
        if (el.value.length > 1) {
            formData[`${el.name}`] = el.value
        }
    })

    console.log(formData)

    axios.post('/comics', JSON.stringify(formData))

    /**
     * TODO: use axios to submit formData to /add-comic
     */
})