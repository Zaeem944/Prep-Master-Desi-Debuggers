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
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true, 
  })
);
app.use(express.json());

// MongoDB Connection (Uncomment and provide URI for use)
// connectMongoDB(process.env.MONGO_URI);

// Create HTTP server and initialize Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your frontend URL for development
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  },
});

// Socket.io Connection
io.on('connection', (socket) => {
  let id = Math.floor(Math.random() * 100000);
  console.log(`User with id ${id} connected`);

  socket.on('disconnect', () => {
    console.log(`User with id ${id} disconnected`);
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
