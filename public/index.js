const myMap = L.map('myMap').setView([0, 0], 1)
const marker = L.marker([0, 0]).addTo(myMap)

//p5.js
function setup() {
    noCanvas()
    const video = createCapture(VIDEO);
    video.size(320, 240)

    $(function () {
        $('#btnSendInfo').click(async () => {
            if ($('#latitude').text() && $('#longitude').text() && $('#moodText').val()) {
                video.loadPixels()
                const image64 = video.canvas.toDataURL()
                const data = {
                    'lat': $('#latitude').text(),
                    'lon': $('#longitude').text(),
                    'mood': $('#moodText').val(),
                    image64
                }

                const json = await sendInfo(data)
                console.log(json)
            } else {
                alert('Please, fill all the information.')
            }
        })
    })
}

const sendInfo = async (data) => {
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/api', options)
    const json = await response.json()
    return json
}

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(myMap);

if ('geolocation' in navigator) {
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude.toFixed(3)
        const lon = position.coords.longitude.toFixed(3)

        document.getElementById("latitude").textContent = lat
        document.getElementById("longitude").textContent = lon

        //const weather_api = `/weather`
        const weather_api = `/weather/${lat},${lon}`
        const response = await fetch(weather_api)
        const json = await response.json()
        console.log(json)

        marker.setLatLng([lat, lon])
        myMap.setView([lat, lon], 2)
    })
} else {
    console.log('geolocation not available')
}