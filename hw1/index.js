const app = require('./app');
const source = require('./source');

source.init();
source.evt.on('app', (a,b) => app.sum(a,b).then(t=> console.log(t)));