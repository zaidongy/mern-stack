const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));