const addComicForm = document.querySelector('#add-comic')

addComicForm.addEventListener('submit', e => {
    e.preventDefault()

    let formData = {}

    addComicForm.querySelectorAll('input').forEach(el => {
        if (el.value.length >= 1)
            formData[`${el.name}`] = el.value
    })

    addComicForm.querySelectorAll('select').forEach(el => {
        var indexCheck = el.selectedIndex
        if (el.selectedIndex)
            formData[`${el.name}`] = el.options[el.selectedIndex].value
    })

    console.log(formData)

    axios.post('/comics', formData)

    /**
     * TODO: use axios to submit formData to /add-comic
     */
})