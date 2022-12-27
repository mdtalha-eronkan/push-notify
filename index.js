const express = require('express');
const webpush = require('web-push')
const bodyparser = require('body-parser')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyparser.json())

const publicVapidKey = 'BKeNdUdrWn7jwtCJKAJyiLfMAQbdO1d5wKO_qi0_0JT2KpuD8q_06xGztplzLbUEBgTY-AHduWPz5SL5df8BagM'

const privateVapidKey = 'BHxr-MFJMuVa6yC1_0zyZjlYX-X7OUIP2vC3UFgbzE0'

webpush.setVapidDetails('mailto:mdtalha1041@gmail.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res)=>{
    //get push subscription object from the request
    const subscription = req.body;

    //send status 201 for the request
    res.status(201).json({})

    //create paylod: specified the detals of the push notification
    const payload = JSON.stringify({title: 'Section.io Push Notification' });

    //pass the object into sendNotification fucntion and catch any error
    webpush.sendNotification(subscription, payload).catch(err=> console.error(err));
})

const port = 3000;
app.listen(port, ()=>{
    console.log(`server started on ${port}`)
});