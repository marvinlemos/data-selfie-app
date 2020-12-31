//p5.js
function setup() {
    var canvas = createCanvas(320, 240)
    canvas.parent('cameraCanvas')
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
                    'temp': $('#weather').text(),
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

if ('geolocation' in navigator) {
    console.log('geolocation available')
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude.toFixed(3)
        const lon = position.coords.longitude.toFixed(3)

        document.getElementById("latitude").textContent = lat
        document.getElementById("longitude").textContent = lon

        const weather_api = `/weather/${lat},${lon}`
        const response = await fetch(weather_api)
        const json = await response.json()
        document.getElementById("weather").textContent = json.app_temp
        console.log(json)
    })
} else {
    console.log('geolocation not available')
}