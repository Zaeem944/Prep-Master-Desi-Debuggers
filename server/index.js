const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectMongoDB = require('./DBConnection');
const { Server } = require('socket.io');
const http = require('http');

// Importing Routes:
const UserRouter = require('./routes/UserRoutes');
const TestSeriesRouter = require('./routes/TestSeriesRoutes');

// Load environment variables:
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(
  cors({
    origin: '*', 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());

// MongoDB Connection (Uncomment and provide URI for use)
connectMongoDB(process.env.MONGO_URI);

// Create HTTP server and initialize Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

//GlobalObject for storing emails and their respective socket ids

global.userSocketMap = {};

// Socket.io Connection
io.on('connection', (socket) => {
  console.log(`User with id ${socket.id} connected`);


  socket.on('login', (userData) => {
    console.log("Socket Email Received")
    global.userSocketMap[socket.id] = userData;
    console.log("global map is: ", global.userSocketMap);
  });

  socket.on('teacherVerified', (email) => {
    
    console.log("Teacher Verified: ", email);
    const socketId = Object.keys(global.userSocketMap).find(
      (key) => global.userSocketMap[key].email === email
    );
    console.log("Keys is: ", Object.keys(global.userSocketMap));
    console.log("Values is: ", Object.values(global.userSocketMap));
    console.log("Socket Id is: ", socketId);
    io.to(socketId).emit('teacherVerified', email);
  });

  socket.on('disconnect', () => {
    console.log(`User with id ${socket.id} disconnected`);
    global.userSocketMap = Object.fromEntries(
      Object.entries(global.userSocketMap).filter(
        ([key, value]) => key !== socket.id
      )
    );
  });
});

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from the Devathon Server :)');
});

app.use('/user', UserRouter);
app.use('/test', TestSeriesRouter);

// Start server with `server.listen`, not `app.listen`
server.listen(PORT, () => {
  console.log(`Devathon Server is Running on port ${PORT}`);
});
