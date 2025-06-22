const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const tasksRouter = require('./routes/tasks');
const path = require('path');

require('dotenv').config();

// Middlewares
app.use(express.json());

// ✅ جعل ملفات public متاحة للجميع
app.use(express.static('./public'));

// Routes
app.use('/api/v1/tasks', tasksRouter);

app.get('/', (req, res) => {
  res.send('Task Manager API');
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`✅ Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log('❌ MongoDB connection failed:', error);
  }
};

start();
