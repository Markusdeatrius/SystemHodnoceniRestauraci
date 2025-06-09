const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API cesty 
const apiRoutes = require('./api/api');
app.use('/api', apiRoutes); // /api/items

app.use((reg, res, next) => {
  res.status(404).sendFile(__dirname + '/public/404error.html');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});