const express = require('express');
const projectRouter = require('./routers/projectRouter');
const actionRouter = require('./routers/actionRouter');
const server = express();
const PORT = 5000;

server.use(express.json());

//Routes
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.listen(PORT, err => {
    console.log(`Server lisening on PORT ${PORT}`);
});