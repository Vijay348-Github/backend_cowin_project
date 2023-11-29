// app.js
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes')

const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://vijayramesh4321:wBgyCG0SkAVcq8fK@assignment.3zz4xbk.mongodb.net/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



// routes\adminRoutes.js