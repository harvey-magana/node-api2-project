const express = require('express');
const router = express.Router();

const Comments = require('../db-helpers.js');

router.get('/', (req, res) => {
    Comments.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the posts"
            })
        })
})

// needed
// findPostComments (GET)
// findCommentById (GET)
// insertComment (POST)

module.exports = router;