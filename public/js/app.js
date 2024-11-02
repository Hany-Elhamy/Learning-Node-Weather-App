console.log("client side runninng")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = "Loading"
    messageTwo.textContent=""

    fetch("/weather?address=" + search.value).then((response) => {
        messageOne.textContent = ""
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.address
            messageTwo.textContent = data.forecast
        })
    })
})
