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
// insertComment (POST)

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

// This method is not working
router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    const comment = {...req.body, post_id: id };

    if(!text) {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.'})
    } else {
        Comments.findById(id)
            .then((post) => {
                if(!post.length) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist.'
                    })
                } else {
                    Comments.insertComment(comment)
                        .then((comment) => {
                            Comments.findCommentById(comment.id)
                                .then(comment => {
                                    res.status(201).json({ comment })
                                })
                        })
                        .catch((error) => {
                            res.status(500).json({
                                error: 'There was an error while saving the comment to the database.'
                            })
                        })
                }
            })
            .catch((error) => {
                res.status(500).json(error)
            })
    }
})

module.exports = router;