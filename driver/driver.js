

// const inquirer = require('inquirer');
const io = require('socket.io-client');
const caps = io.connect('http://localhost:6000/caps'); 


caps.on('connect', () => {


  caps.on('pickup', (payload) => {
    
    setTimeout(() => {
              console.log(`DRIVER: picked up ${payload.orderID}`);
              caps.emit('in-transit', payload); 

       
              setTimeout(() => {
                console.log(`delivered up ${payload.orderID}`);
                caps.emit('delivered', payload);
                        
              }, 3000);
            }, 1000);
       
          });

        });











// const inquirer = require('inquirer'); 
// const net = require('net'); 
// const client = new net.Socket();
// require('dotenv').config()
// const HOST = process.env.HOST || 'localhost';
// const PORT = process.env.PORT || 4000;
// let name = '';
// const messages = [];

// client.connect(PORT, HOST, () => {
//   console.log("driver")
//   client.on('data', (data) => {
//     const dataObj = JSON.parse(data);
//     if (dataObj.event == 'pickup') {
//       setTimeout(() => {
   
//         let idorder=dataObj.payload.orderID
//         console.log(`DRIVER: picked up ${idorder}`);
//         const massege = JSON.stringify({ event:'in-transit' , payload: dataObj.payload });
//         client.write(massege);
//         setTimeout(() => {
//           console.log(`delivered up ${idorder}`);
//           let massege = JSON.stringify({ event:'delivered' , payload:  dataObj.payload });
//           client.write(massege);
//         }, 3000);
        
//       }, 1000);
//     }
//   });

// });
