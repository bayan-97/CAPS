
const inquirer = require('inquirer'); // library to get user input

const net = require('net'); // TCP library built into node
let faker = require('faker');
const client = new net.Socket();
require('dotenv').config()
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
let STORENAME = process.env.STORENAME ||faker.commerce.product() ;

let name = '';
const messages = [];
client.connect(PORT, HOST, () => {
  console.log('Client Connected');
  setInterval(()=>{
    let obj = {
        storeName:`${STORENAME}`,
        orderID: `${faker.random.uuid()}`,
        custome: `${faker.name.findName()}`,
        address:`${faker.address.streetName()}`
      }; 
      let massege = JSON.stringify({ event:'pickup' , payload: obj });

      client.write(massege);
     
    
      
    },5000)
        client.on('data', (data) => {
            
          const dataObj = JSON.parse(data);
       
          let i=dataObj.payload.orderID
          if(dataObj.event=='delivered'){
            console.log(` Thank you for delivering ${i}`)
          };
        });
    client.on('close', () => console.log('Connection closed!'));
    client.on('error', (err) => console.log('Logger Error', err.message));
  });









 

  