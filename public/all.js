const myMap = L.map('myMap').setView([0, 0], 1)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
    }).addTo(myMap);

const getDate = async () => {
    const response = await fetch('/api')
    const data = await response.json()

    for (item of data) {
        const marker = L.marker([item.lat, item.lon]).addTo(myMap)
        const text = `Mood: ${item.mood} / Temp: ${item.temp}`
        marker.bindPopup(text)


        const root = document.createElement('div')

        const mood = document.createElement('div')
        mood.textContent = `mood: ${item.mood}`

        const geo = document.createElement('div')
        geo.textContent = `${item.lat}°, ${item.lon}°`

        const date = document.createElement('div')
        const dateString = new Date(item.timestamp).toLocaleString()
        date.textContent = dateString

        const image = document.createElement('img')
        image.src = item.image64

        root.append(mood, geo, date, image)
        document.body.append(root)
        document.body.append(document.createElement('br'))
    }
}

getDate()