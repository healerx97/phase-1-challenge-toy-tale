let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
let toyCollection = document.querySelector('#toy-collection')
function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp=>resp.json())
  .then(function(data) {
    data.forEach(toy => {
      let div = document.createElement('div')
      div.className = "card"
      div.innerHTML = `<h2>${toy.name}</h2>
      <img src='${toy.image}' class = 'toy-avatar'>`
      let p = document.createElement('p')
      p.textContent = `${toy.likes} Likes`
      div.append(p)
      let btn = document.createElement('button')
      btn.className = 'like-btn'
      btn.id = `${toy.id}`
      btn.textContent = 'Like'
      btn.addEventListener('click', () => {
        fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          "likes": toy.likes + 1
        })
        })
        .then(p.textContent = `${toy.likes + 1} Likes`)
        })
      div.append(btn)
      toyCollection.append(div)
    })
  })
}

document.addEventListener("DOMContentLoaded", getToys)

let form = document.querySelector('.add-toy-form')
function postToys(e) {
  e.preventDefault()
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name' : `${form.children[1].value}`,
      'image': `${form.children[3].value}`,
      "likes": 0
    })
  })
  .then(()=>{
    form.children[1].value = ""
    form.children[3].value = ""
  })
}
form.addEventListener('submit', postToys)
