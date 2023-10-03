import {Server} from 'socket.io';
import {createServer} from 'http';
import dotenv from 'dotenv';

dotenv.config()

const {PORT = 5000} = process.env;

const httpServer = createServer();

const wsServer = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

wsServer.on('connection', (socket)=> {
    console.log('I am here!!!')
    socket.on('chat-message', data => {
        socket.broadcast.emit('chat-message', data)
    })
});

httpServer.listen(PORT)