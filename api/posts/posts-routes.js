// the router imports the associated model file 
// a router variable is created from the express.Router() method
// the router includes all of the http methods with the logic that uses the model
// methods 
// next, you need to import the routes file into the server file by declaring it as a 
// unique variable with includes its path
// in the server file, you also need to register the router

const express = require('express');
const router = express.Router();

const Posts = require('../db-helpers.js');

router.get('/', (req, res) => {
    Posts.find(req.query)
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

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(posts => {
            if(posts) {
                res.status(200).json(posts);
            } else {
                res.status(400).json({
                    message: "Post id not found."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the post."
            })
        })
})

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(comments => {
            if(comments.length > 0) {
                res.status(200).json(comments);
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

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the posts"
            })
        })
})

router.post('/:id/comments', (req, res) => {
    const id = req.params.id;
    const { text } = req.body;
    const comment = {...req.body, post_id: id };

    if(!text) {
        res.status(400).json({ errorMessage: 'Please provide text for the comment.'})
    } else {
        Posts.findById(id)
            .then((post) => {
                if(!post.length) {
                    res.status(404).json({
                        message: 'The post with the specified ID does not exist.'
                    })
                } else {
                    Posts.insertComment(comment)
                        .then((comment) => {
                            Posts.findCommentById(comment.id)
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

router.put('/:id', (req, res) => {
    const changes = req.body;
    console.log(req)
    Posts.update(req.params.id, changes)
        .then(post => {
            if(post) {
                res.status(200).json(post);
            } else {
                res.status(400).json({
                    message: "Post id not found."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving the post."
            })
        })
})

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(post => {
            if(post > 0) {
                res.status(200).json({
                    message: "The post has been deleted."
                })
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: "The post could not be removed"
            })
        })
})

module.exports = router;