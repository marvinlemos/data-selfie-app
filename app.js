const { response } = require('express')
const express = require('express')
const Datastore = require('nedb')
var axios = require("axios").default;

const app = express()

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }))

const database = new Datastore('database.db')
database.loadDatabase()


app.post('/api', (req, res) => {
    const data = req.body
    const timestamp = Date.now()
    data.timestamp = timestamp
    database.insert(data)
    res.json(data)

})

app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err) {
            res.end()
            return
        }
        res.json(data)
    })
})

app.get('/weather/:latlong', (req, res) => {
    const latlong = req.params.latlong.split(',')
    const lat = latlong[0]
    const lon = latlong[1]

    var options = {
        method: 'GET',
        url: 'https://weatherbit-v1-mashape.p.rapidapi.com/current',
        params: { lat: lat, lon: lon },
        headers: {
            'x-rapidapi-key': '---',
            'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (axios_res) {
        weather = axios_res.data

        res.json(weather.data[0])
    }).catch(function (error) {
        console.error(error);
    });

})