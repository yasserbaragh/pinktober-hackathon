const express = require("express")

const {
    getStories, postStories
} = require("../controllers/stories")

const router = express.Router()

router.route("/").get(getStories).post(postStories)

module.exports = router

