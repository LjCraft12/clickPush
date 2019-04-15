const express = require('express'),
    app = express(),
    webpush = require('web-push'),
    bodyParser = require('body-parser'),
    path = require('path'),
    log = console.log,
    port = process.env.PORT || 3000;


// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());

const publicVapidKey =
    "BLvjJXbZW-HeA1gTzljcqnHM5VsPWcqUlMLJYS8riGIdeo-2l41v0McNdWAjSHFor5zl4jPj3QXcWqJ_oeNgQjM";
const privateVapidKey = "LLprZ3UiARJW7jz9StaQO14Yot3Ts3fOEBUXEdZKaMw";

webpush.setVapidDetails(
    'mailto:test@test.com',
    publicVapidKey,
    privateVapidKey
);

// Route to send the notification to the service worker
app.post('subscribe', (req, res, next) => {
    // Get push subscription object
    const subscription = req.body;

    // Send 201 status representing the resource was created succesfully
    res.status(201).json({});

    //Create Payload
    const payload = JSON.stringify({title: 'Push test'});

    // Send payload boject into send notifications
    webpush.sendNotification(subscription, payload)
        .catch(err => err ? log(`Error something went wrong ${err}`) : log(`Notification sent`));
});

app.listen(port, err => {
    err ? log(`Error connecting to port: ${port}`) : log(`Connection Started on port: ${port}`);
});
