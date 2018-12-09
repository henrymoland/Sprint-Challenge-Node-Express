const express = require('express');

const actionRouter = require('./routers/actionRouter');
const server = express();
const PORT = 5000;

server.use(express.json());
server.use('/actions', actionRouter);

server.listen(PORT, err => {
    console.log(`Server lisening on PORT ${PORT}`);
});