const express = require('express');

const server = express();

const PostsRouter = require('./posts/posts-routes.js');

server.use(express.json());

server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
    res.json({ message: "Hello world!" });
})

module.exports = server;