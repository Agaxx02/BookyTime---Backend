const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.listen(process.env.PORT || PORT)
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})