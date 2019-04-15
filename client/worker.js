console.log('Service worker loaded');

self.addEventListener('psuh', event => {
   const data = event.data.json();
   console.log('Push received...');
   self.registration.showNotification(data.title, {
       body: 'Notified by Perry Craft',
       icon: 'https://media.licdn.com/dms/image/C5103AQH-Ua52marQ_Q/profile-displayphoto-shrink_200_200/0?e=1560988800&v=beta&t=TMdHmxz2Syr7Ss4bnWn4NbdbrtrbUTYKV2ZEKz7cdiI'
   });
});
