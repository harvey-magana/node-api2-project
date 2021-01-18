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
// findCommentById (GET)

// this method is not working
router.get('/:id/comments/:id', (req, res) => {
    const id = req.params.id;
    Comments.findCommentById(req.params.id)
        .then(id => {
            if(id) {
                res.status(200).json(id);
            } else {
                res.status(400).json({ message: "No comments for this post."})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the post."
            })
        })

})

module.exports = router;