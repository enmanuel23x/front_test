const axios = require('axios')
const express = require('express');
var cors = require('cors')
const app = express();
app.use(cors())
app.get('/getJson', (_req, res) => {
    axios.get('https://pastebin.com/raw/Yt8YLDV1').then(response => {
        res.json(response.data)
    }).catch(error => {
        res.statusCode(500).send(error)
    })
})
app.listen(8080, () => {
    console.log('listening on port 8080')
})