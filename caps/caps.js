
  
const io = require('socket.io')(6000); //1

const caps = io.of('/caps');
let currentRoom = '';
caps.on('connection', (socket) => {
  
  console.log('Welcome to the caps chat Server!', socket.id);
  socket.on('join', (room) => {
    console.log('Joined a new Room', room)
    socket.leave(currentRoom); 
    socket.join(room);
    currentRoom = room;
  });

 
      socket.on('pickup', (payload) => {
        log('pickup', payload)
        caps.emit('pickup', payload);
        
      });
      socket.on('in-transit', (payload) => {
        
        log('in-transit', payload)
        // caps.emit('pickup', payload);
      });
      socket.on('delivered', (payload) => {
        console.log("ggg")
        log('delivered', payload)
        caps.to(currentRoom).emit('delivered', payload);
        
       });
  
      //  socket.on('delivered', (payload) => {
      //   console.log("ggg")
      //   log('delivered', payload)
      //    caps.to(currentRoom).emit('delivered', payload);
        
      //  });
});






// const net = require('net');

// const uuidv4 = require('uuid').v4;
// require('dotenv').config()
// const PORT = process.env.PORT || 4000;

// const server = net.createServer();
// server.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// const socketPool = {};
// server.on('connection', (socket) => {
//   console.log('Socket Connected!');
//   const id = `socket-${uuidv4()}`;
//   socketPool[id] = socket;
//   socket.on('data', (buffer) => dispatchEvent(buffer));
//   socket.on('error', (e) => console.log('SOCKET ERROR', e.message));
//   socket.on('end', (id) => delete socketPool[id]);
// });
// server.on('error', (e) => console.log('SERVER ERROR', e.message));


// function dispatchEvent(buffer) {
//   for (let socket in socketPool) {
//     socketPool[socket].write(buffer); //6
//   }

//   let dtobj = JSON.parse(buffer.toString().trim());
//   if (dtobj.event == 'pickup') {
//     log('pickup', dtobj);
//   }
//   if (dtobj.event == 'in-transit') {
//     log('in-transit', dtobj);
//   }
//   if (dtobj.event == 'delivered') {
//     log('delivered', dtobj);
//   }

// }


function log(event, payload) {
  
  console.log({ event, time: new Date(), payload });
}
