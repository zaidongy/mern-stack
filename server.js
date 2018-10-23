const express = require('express');
const mongoose = require('mongoose');

// Setup Server
const app = express();
app.use(express.json());

const items = require('./routes/api/items');

// Database Connection
const config = require('./config/config');
mongoose
	.connect(config.mongoURI, { useNewUrlParser: true })
	.then(() => console.log("MongoDB connected..."))
	.catch(console.error);

//use Routes
app.use('/api/items', items);

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));