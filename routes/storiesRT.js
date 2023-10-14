const express = require("express")

const {
    getStories, postStories, deleteStories, getStoriesByName, getStoriesBytitle
} = require("../controllers/stories")

const router = express.Router()

router.route("/").get(getStories).post(postStories)
router.route("/byName").post(getStoriesByName)
router.route("/byTitle").post(getStoriesBytitle)
router.route("/:id/delete").delete(deleteStories)

module.exports = router

