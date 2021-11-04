require('dotenv').config()
const express = require('express')
const request = require('request')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// variable
const configKey = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};
const pushMsgUrl = 'https://api.line.me/v2/bot/message/push'

app.get('/sendMessage', (req, res) => {
    // const targetId = req.body.targetId

    // send message function
    pushMessage('U51f8ec6105489185ed5ceb883f4d5fbc')
    res.send('success').status(200)
})

function pushMessage() {
    let headers = {
        'Conten-Type': 'application/json',
        'Authorization': `Bearer ${configKey.channelAccessToken}`
    }
    let body = JSON.stringify({
        message: [{
            type: 'text',
            text: 'Test Elder Eat line Notify'
        }]
    })

    request.post({
        url: pushMsgUrl,
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    })
}

app.post('/', (req, res) => {
    res.send('404')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is running at " + PORT)
})