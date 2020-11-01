const events = require('./events.js');
let faker = require('faker');
require('./caps.js')
require('./driver.js')
      setInterval(()=>{
        let obj = {
            storeName:`${faker.commerce.product()}`,
            orderID: `${faker.random.uuid()}`,
            custome: `${faker.name.findName()}`,
            address:`${faker.address.streetName()}`,
          }; 
          events.emit('pickup',obj);
         
        
        },5000)
    

 

  