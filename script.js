const postsListElements = document.querySelector('#posts')
const comentstsListElements = document.querySelector('#coments')

function fetchData(url, method, callback) {
  const xhr = new XMLHttpRequest()

  xhr.open(method, url)

  xhr.onload = function () {
    if (xhr.status == 200) {
      callback(xhr.response)
    }
  }

  xhr.send()
}

function handleClickPost(event) {
  event.preventDefault()

  comentstsListElements.innerHTML = ''

  const { target } = event
  const linkElement = target.closest('.post')

  if (linkElement) {
    const { id } = linkElement.dataset

    fetchData(
      `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      'GET',
      (response) => {
        console.log(response)
        const data = JSON.parse(response)

        const coments = data.map((item) => {
          return comentTemplame(item)
        })

        const result = coments.join('')
        console.log(result)
        comentstsListElements.innerHTML = result
      }
    )
  }
}

function postTemplame({ id, title, body }) {
  return `
<div data-id =${id} class="card text-white bg-secondary mb-3 post" style="max-width: 16rem;">
  <div  class="card-header">Post</div>
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${body}</p>
  </div>
  </div>
    `
}

function comentTemplame({ name, email, body }) {
  return `
    <div class="card coment" >
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${body}</p>
      <a href="#" class="btn btn-primary">${email}</a>
    </div>
  </div>`
}

fetchData('https://jsonplaceholder.typicode.com/posts', 'GET', (response) => {
  const data = JSON.parse(response)

  const posts = data.map((item) => {
    return postTemplame(item)
  })

  //беру только первые 30 постов
  const partPosts = posts.splice(0, 30)

  const result = partPosts.join('')

  postsListElements.innerHTML = result
})

postsListElements.addEventListener('click', handleClickPost)
