const inquirer = require('inquirer'); 
const net = require('net'); 
const client = new net.Socket();
require('dotenv').config()
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
let name = '';
const messages = [];

client.connect(PORT, HOST, () => {
  console.log("driver")
  client.on('data', (data) => {
    const dataObj = JSON.parse(data);
    if (dataObj.event == 'pickup') {
      setTimeout(() => {
   
        let idorder=dataObj.payload.orderID
        console.log(`DRIVER: picked up ${idorder}`);
        const massege = JSON.stringify({ event:'in-transit' , payload: dataObj.payload });
        client.write(massege);
        setTimeout(() => {
          console.log(`delivered up ${idorder}`);
          let massege = JSON.stringify({ event:'delivered' , payload:  dataObj.payload });
          client.write(massege);
        }, 3000);
        
      }, 1000);
    }
  });

});
// const events = require('./events.js');
// // let obj=require('./vendor.js')
// require('./caps.js');
// require('./vendor.js');
// setTimeout(() => {
//   events.on('pickup', (payload) => {
//     console.log(`DRIVER: picked up${payload.orderID}`);
//     events.emit('in-transit', payload);
//   });
// }, 1000);
// setTimeout(() => {
//   events.on('pickup', (payload) => {
//     console.log(`delivered up ${payload.orderID}`);
//     events.emit('delivered', payload);
//     console.log(` Thank you for delivering ${payload.orderID}`);
//   });
// }, 3000);
