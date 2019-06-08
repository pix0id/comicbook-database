const addComicForm = document.querySelector('#add-comic')
const comicList = document.querySelector('#comic-list')
const deleteComics = document.querySelectorAll('.comic-delete')

axios.get('/comics').then(data => {
    const comics = data.data

    comics.forEach((comic) => {
        let html = `<div class="comic-info" id="${comic._id}">
                <span class="comic-title">${comic.title ? comic.title : ''}</span>
                <span class="comic-read">${comic.read ? comic.read : 'no'}</span>
                <span class="comic-issue">${comic.issue ? comic.issue : ''}</span>
                <span class="comic-publisher">${comic.publisher ? comic.publisher : ''}</span>
                <span class="comic-category">${comic.category ? comic.category : ''}</span>
                <span class="comic-delete"><a href="" data-id="${comic._id}" class="delete-comic">Delete</a></span>
            </div>`
        comicList.innerHTML += html
    })
})

addComicForm.addEventListener('submit', e => {
    e.preventDefault()

    let formData = {}

    addComicForm.querySelectorAll('input').forEach(el => {
        if (el.value.length >= 1)
            formData[`${el.name}`] = el.value
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