const events = require('./events.js');
require('./driver.js')
events.on('pickup', (payload) => log('pickup', payload));
events.on('in-transit', (payload) => log('in-transit', payload));
events.on( 'delivered', (payload) => log( 'delivered', payload));
function log(event, payload) {
  console.log({ event, time: new Date(), payload });
  
}