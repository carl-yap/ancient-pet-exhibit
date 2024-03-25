const mongoose = require('mongoose')


// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/ancient-pet-exhibit')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


