const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();

// handling MongoDB connection
mongoose.connect('mongodb://localhost:27017/chat_messages');

const database = mongoose.connection;
database.on('error', (error) => console.error('Database connection error:', error));
database.once('open', () => console.log('Database connected'));

// Define the schema and model
const dataSchema = new mongoose.Schema({
    alias: {
        required: true,
        type: String
    },
    message: {
        required: true,
        type: String
    }
});

const Data = mongoose.model('chat', dataSchema);

app.use(express.json());

// handling CORS 
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
}); 

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/simply-chat-frontend')));

// API routes
app.get('/api/getmessage', async (req, res) => { 
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}); 

app.post('/api/post', async (req, res) => {
    const data = new Data({
        alias: req.body.alias,
        message: req.body.message
    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Catch all other routes and return the index file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/simply-chat-frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
