// console.log('Hello from client side app.js!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const locationInput = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const windyAPIkey = 'SZsZn7qVAMtzb1H0IrkeESFx6FaIgGik'
const mapboxAPIkey = 'pk.eyJ1IjoiZGlydHlzb2MiLCJhIjoiY2p1MW1rbXp2MDM3djQzbG8wZDMweWJrcyJ9.Ci4FbZRJdLzZ1hZ96meH-w'

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()

    messageOne.textContent = `Loading...`
    const location = locationInput.value

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ``
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }

            // Initialize Windy API
            windyInit({
                key: windyAPIkey,
                lat: data.latitude,
                lon: data.longitude,
                zoom: 7,
                overlay: 'rain'
            }, windyAPI => {
                const { map } = windyAPI

                map.setView([
                    data.longitude,
                    data.latitude
                ])

                L.popup()
                    .setLatLng([data.longitude, data.latitude])
                    .setContent(data.location)
                    .openOn(map);

            })
        })
    })
})

