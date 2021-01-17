const express = require('express');

const server = express();

const PostsRouter = require('./posts/posts-routes.js');
const CommentsRouter = require('./comments/comments-routes.js');

server.use(express.json());

server.use('/api/posts', PostsRouter);
server.use('/api/comments', CommentsRouter)

server.get('/', (req, res) => {
    res.json({ message: "Hello world!" });
})

module.exports = server;