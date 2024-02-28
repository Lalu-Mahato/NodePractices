const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const apiRoutes = require('./routes');


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
    extended: true,
    limit: "50mb"
}));

const server = http.createServer(app);

app.use('/', apiRoutes);

app.get('/', (req, res) => {
    const data = require('./data2.json');
    console.log('data: ', data.length);

    return res.send({ message: 'app running...' });
});

server.listen(port, () => console.log(`Server listening on port:${port}`));
