const express = require('express')

const app = express()

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))


app.post('/api', (req, res) => {
    console.log(req.body)
    const lat = req.body.lat
    const lon = req.body.lon
    res.json({
        'status': 'OK',
        'latitude': lat,
        'longitude': lon
    })

})