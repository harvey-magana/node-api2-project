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

//needed
//update (PUT)
//remove (DELETE)

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

module.exports = router;