console.log('client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => { 
//     response.json().then((data) => {
//         console.log(data.puzzle)
//     })

// })


fetch('http://localhost:3000/weather?address=!').then((response) => { 
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.location)
            console.log(data.forecastData)
        }
    })

})
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'Form javascript'
weatherForm.addEventListener('submit',(e) => {
    e.preventDefault() //prevent default browser behaviour like refreshing the browser
    const location = search.value
    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''
    const url = '/weather?address='+location
    fetch(url).then((response) => { 
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecastData
        }
    })

})
    console.log(location)
})