const express = require('express'); 
const mongoose = require('mongoose');
const app = express(); 

// handling MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatmesssages', { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error);
});

database.once('connected', () => {
    console.log('Database Connected');
});

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

// Use express.json() to parse JSON bodies
app.use(express.json());

// handling CORS 
app.use((req, res, next) => { 
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); 
}); 

// route for handling requests from the Angular client 
app.get('/api/getmessage', async (req, res) => { 
    try{
        const data = await Data.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}); 

// Post a message
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

// Start the server
app.listen(3000, () => { 
    console.log('Server listening on port 3000'); 
});
