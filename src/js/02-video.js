var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

//saving actual time to local storage
const actualTimeDuration = ({ seconds }) => {
  localStorage.setItem('videoplayer-current-time', seconds);
};

player.on('timeupdate', throttle(actualTimeDuration, 900));

//getting saved time from local storage and populating after user refreshed browser
let durationTime = localStorage.getItem('videoplayer-current-time') || 0;
player.setCurrentTime(durationTime);
