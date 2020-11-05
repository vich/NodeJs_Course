const events = require('events');

const evt = new events.EventEmitter();
const NOTIFY_INTERVAL = 1000;

const getRandomIntFrom0To100 = (max) => Math.floor(Math.random() * 100);

function init(){
    setInterval(()=> {
        evt.emit('app', getRandomIntFrom0To100(), getRandomIntFrom0To100());
    }, NOTIFY_INTERVAL);
}

module.exports = {
    init,
    evt
};