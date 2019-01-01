const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 8080;

app.use('/bounce',express.static(path.join('public/Bounce'))) 
app.get('/', (req,res) => {
    res.writeHead(200, {'content-Type':'Text/html'});
    res.write(fs.readFileSync('./sample.html'));
    res.end();
})
app.listen(port, () => { console.log("Port is listening") })