// Detect Device
const ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("iphone") > -1) document.body.classList.add('ios-safari');
else if (ua.indexOf("android") > -1) document.body.classList.add('android-chrome');

// The Signal (Pusher.com)
const pusher = new Pusher('YOUR_FREE_KEY', { cluster: 'mt1' });
const channel = pusher.subscribe('magic-channel');

let startY = 0;
let currentScroll = 0;

document.getElementById('tracker').addEventListener('touchstart', e => {
    startY = e.touches[0].pageY;
});

document.getElementById('tracker').addEventListener('touchmove', e => {
    let diff = startY - e.touches[0].pageY;
    currentScroll += diff;
    startY = e.touches[0].pageY;
    
    // Calculate Page: (Total PDF length / Pages)
    // For Goblet of Fire, roughly 1200px per page
    let pageNum = Math.floor(currentScroll / 1200) + 1;
    
    // Send to your secret Peek URL
    channel.trigger('client-page-move', { page: pageNum });
});
