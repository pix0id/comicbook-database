/* eslint-disable no-undef */
;(() => {
    class Comics {
        constructor() {
            this.addComicForm = document.querySelector('#add-comic')
            this.comicList = document.querySelector('#comic-list')
            this.deleteComics = document.querySelectorAll('.comic-delete')
            this.formData = {}
            this.comics = {}

            this.bindEvents()
        }

        bindEvents() {
            document.addEventListener('DOMContentLoaded', () => {
                const sideNavEls = document.querySelectorAll('.sidenav')
                const modalEls = document.querySelectorAll('.modal')
                const FABEls = document.querySelectorAll('.fixed-action-btn')

                // eslint-disable-next-line no-unused-vars
                const instances = M.Sidenav.init(sideNavEls)
                // eslint-disable-next-line no-unused-vars
                const modalInstances = M.Modal.init(modalEls)
                // eslint-disable-next-line no-unused-vars
                const FABInstances = M.Modal.init(FABEls)
            })

            if (this.addComicForm) {
                this.addComicForm.addEventListener('submit', e => {
                    e.preventDefault()

                    this.formData = {}

                    this.addComicForm.querySelectorAll('input').forEach(el => {
                        if (el.value.length >= 1) {
                            if (el.id === 'read') {
                                this.formData[`${el.name}`] = el.checked
                            } else {
                                this.formData[`${el.name}`] = el.value
                            }
                        }
                    })

                    this.addComicForm.querySelectorAll('select').forEach(el => {
                        if (el.selectedIndex)
                            this.formData[`${el.name}`] = el.options[el.selectedIndex].value
                    })

                    axios
                        .post('/comics', this.formData)
                        .then(res => {
                            console.log(res)
                            this.getComics()
                        })
                        .catch(err => {
                            // TODO: Replace conlog with modal or small alert.
                            console.log(err)
                        })
                })
            }

            if (this.comicList) {
                this.getComics()

                this.comicList.addEventListener(
                    'click',
                    e => {
                        e.preventDefault()
                        if (e.target.className === 'delete-comic')
                            this.deleteComic(e.target.dataset.id)
                    },
                    false,
                )
            }
        }

        getComics() {
            this.comics = {}
            axios
                .get('/comics')
                .then(res => {
                    // TODO: Change all of this to use handlebars (once I get a better understanding of it..)
                    this.comics = res.data

                    // TODO: Possibly move this to a different function, in case just fetching the data alone is needed.
                    this.comicList.innerHTML = ''

                    this.comics.forEach(comic => {
                        const html = `<tr class="comic-info" id="${comic._id}">
                        <td class="comic-issue">${comic.issue ? comic.issue : ''}</td>    
                        <td class="comic-title">${comic.title ? comic.title : ''}</td>
                        <td class="comic-publisher">${comic.publisher ? comic.publisher : ''}</td>
                        <td class="comic-category">${comic.category ? comic.category : ''}</td>
                        <td class="comic-read">${comic.read ? 'yes' : 'no'}</td>
                        <td class="comic-delete"><a href="" data-id="${
                            comic._id
                        }" class="delete-comic">Delete</a></td>
                        </tr>`

                        this.comicList.innerHTML += html
                    })
                })
                .catch(err => {
                    // TODO: Replace conlog with modal or small alert.
                    console.log('Error', err)
                })
        }

        deleteComic(id) {
            axios.delete(`/comics/${id}`)
            this.getComics()
        }
    }

    // eslint-disable-next-line no-unused-vars
    const comics = new Comics()
})()
