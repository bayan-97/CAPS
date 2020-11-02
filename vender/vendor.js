
const inquirer = require('inquirer'); // library to get user input

const net = require('net'); // TCP library built into node
let faker = require('faker');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
let name = '';
const messages = [];
client.connect(PORT, HOST, () => {
  console.log('Client Connected');
  setInterval(()=>{
    let obj = {
        storeName:`${faker.commerce.product()}`,
        orderID: `${faker.random.uuid()}`,
        custome: `${faker.name.findName()}`,
        address:`${faker.address.streetName()}`
      }; 
      let massege = JSON.stringify({ event:'pickup' , payload: obj });

      client.write(massege);
     
    
    },5000)
    client.on('data', (data) => {

      const dataObj = JSON.parse(data);
      if(dataObj.event=='delivered'){
        console.log(` Thank you for delivering ${dataObj.payload}`)
      };
    });
  
    client.on('close', () => console.log('Connection closed!'));
    client.on('error', (err) => console.log('Logger Error', err.message));
  });







// const events = require('../events.js');
// let faker = require('faker');
// require('../caps/caps.js')
// require('../driver.js')
//       setInterval(()=>{
//         let obj = {
//             storeName:`${faker.commerce.product()}`,
//             orderID: `${faker.random.uuid()}`,
//             custome: `${faker.name.findName()}`,
//             address:`${faker.address.streetName()}`,
//           }; 
//           events.emit('pickup',obj);
         
        
//         },5000)
    

 

  