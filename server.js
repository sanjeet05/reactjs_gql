const express = require('express');
const path = require('path');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname + '/build'));

// set the home page route
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './build', 'index.html') );
});

app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});