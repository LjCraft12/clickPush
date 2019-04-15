const publicVapidKey = "BLvjJXbZW-HeA1gTzljcqnHM5VsPWcqUlMLJYS8riGIdeo-2l41v0McNdWAjSHFor5zl4jPj3QXcWqJ_oeNgQjM";

// Check for service worker
if ('serviceworker' in navigator) {
    send()
        .catch(err => console.log(err))
}

// Register service worker and register browser push api and send the notification
async function send() {
    // Register service worker
    console.log('registering worker');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('Worker Registered');

    // Register push notification
    console.log('Registering push');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push registered');

    // Send push notification
    console.log('Sending push');

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('push sent');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
