require('dotenv').config()
const express = require('express')
const request = require('request')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const line = require('@line/bot-sdk');

// variable
const configKey = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};
const pushMsgUrl = 'https://api.line.me/v2/bot/message/push'

const client = new line.Client({
    channelAccessToken: '' + configKey.channelAccessToken + ''
});

const messageOver = [
    {
        type: 'text',
        text: '$ ปริมาณสารอาหารเกินกำหนดแล้วนะ อย่าลืมออกกำลังกายด้วยนะ',
        emojis: [
            {
                "index": 0,
                "productId": "5ac21a18040ab15980c9b43e",
                "emojiId": "048"
            },
        ],

    },
    {
        type: "sticker",
        packageId: "446",
        stickerId: "2000",
    }
];

const messageIncase = [
    {

        type: 'text',
        text: '$ สุดยอดไปเลย $ \n ปริมาณสารอาหารอยู่ในเกณฑ์ \n พยายามควยคุมอย่าให้เกินนะ',

        emojis: [
            {
                "index": 0,
                "productId": "5ac223c6040ab15980c9b44a",
                "emojiId": "038"
            },
            {
                "index": 14,
                "productId": "5ac223c6040ab15980c9b44a",
                "emojiId": "035"
            },
        ],

    },
    {
        type: "sticker",
        packageId: "11538",
        stickerId: "51626507",
    }
];


app.post('/sendMessage', (req, res) => {
    // const userId = req.body.userId;
    // const event = req.body.event;
    // const { userId, event } = req.body;
    const { userId, event } = req.body;

    console.log(req.body)
    // console.log(event)

    client.pushMessage(userId, event == 0 ? messageIncase : messageOver)
        .then(() => {
            console.log('success')
        })
        .catch((err) => {
            // error handling
            console.log(err)
        });

    res.send('success').status(200)
})


app.get('/', (req, res) => {
    res.send('404')
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log("Server is running at " + PORT)
})