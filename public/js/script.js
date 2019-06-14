const addComicForm = document.querySelector('#add-comic')
const comicList = document.querySelector('#comic-list')
const deleteComics = document.querySelectorAll('.comic-delete')

axios.get('/comics').then(data => {
    const comics = data.data

    comics.forEach((comic) => {
        let html = `<tr class="comic-info" id="${comic._id}">
            <td class="comic-issue">${comic.issue ? comic.issue : ''}</td>    
            <td class="comic-title">${comic.title ? comic.title : ''}</td>
            <td class="comic-publisher">${comic.publisher ? comic.publisher : ''}</td>
            <td class="comic-category">${comic.category ? comic.category : ''}</td>
            <td class="comic-read">${comic.read ? 'yes' : 'no'}</td>
            <td class="comic-delete"><a href="" data-id="${comic._id}" class="delete-comic">Delete</a></td>
            </tr>`

        comicList.innerHTML += html
    })
})

addComicForm.addEventListener('submit', e => {
    e.preventDefault()

    let formData = {}

    addComicForm.querySelectorAll('input').forEach(el => {
        if (el.value.length >= 1) {
            if (el.id === 'read') {
                formData[`${el.name}`] = el.checked
            } else {
                formData[`${el.name}`] = el.value
            }
        }
            
    })

    addComicForm.querySelectorAll('select').forEach(el => {
        if (el.selectedIndex)
            formData[`${el.name}`] = el.options[el.selectedIndex].value
    })

    axios.post('/comics', formData)
})

comicList.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.className === 'delete-comic') {
        axios.delete(`/comics/${e.target.dataset.id}`)
    }
})