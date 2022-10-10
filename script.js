const postTitle = document.getElementById("post-title")
const postBody = document.getElementById("post-body")

let postsArr = []

function displayPosts() {
  let html = ""
  for (let post of postsArr) {
      html += `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <hr />
    `
  }
  document.getElementById("blog-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArr = data.slice(0, 5)
        displayPosts()
    })

document.getElementById("new-post").addEventListener("submit", function(e) {
  e.preventDefault()
  const data = {
      title: postTitle.value,
      body: postBody.value
  }
  
  const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json"
      }
  }
  
  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
      .then(res => res.json())
      .then(post => {
        postsArr.unshift(post)
        displayPosts()
        postTitle.value = ""
        postBody.value = ""
      })
})