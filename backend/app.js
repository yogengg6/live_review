require('dotenv').config();
const express = require('express');
const db = require('./db/connection');
const Review = require('./models/review');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express()
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: process.env.REACT_APP_URI, // Allow requests from this origin
    methods: ["GET", "POST","PUT","DELETE"],
  },
});

app.use(express.json());

db.connectDB();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use(cors({
  origin: process.env.REACT_APP_URI, // Allow requests from this origin
}));

app.get('/', async (req, res) => {
  const reviews = await Review.find().sort({ dateTime: -1 });
  res.json(reviews);
});

app.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  io.emit('reviewUpdated', review);
  res.json(review);
});

app.post('/new', async function (req, res) {
    const review = new Review(req.body);
    await review.save();
    io.emit('reviewUpdated', review);
    res.status(201).json(review);
})

app.put('/:id', async (req, res) => {
  const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
  io.emit('reviewUpdated', review);
  res.json(review);
});

app.delete('/:id', async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  io.emit('reviewUpdated', { id: req.params.id });
  res.status(204).end();
});

server.listen(2000)