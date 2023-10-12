const Stories = require("../models/storiesMod")
const bcrypt = require("bcrypt")
const validator = require("validator")

const getStories = async(req,res) => {
    try {
        const stories = await Stories.find().sort({"createdAt": 1})

    return res.status(200).json(stories)
    } catch(error) {
        return res.status(404).json({error: error.message})
    }
}

const postStories = async(req,res) => {
    const {title, story, firstName, lastName, dateNaiss, password} = req.body

    try {
        if(!title || !story || !password) {
            return res.status(404).json("you have to fill all required fields")
        }

        const isStrongPassword = validator.isStrongPassword(password)
        if (!isStrongPassword) {
            return res.status(404).json({ message: "Password not Strong" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (!hashedPassword) {
            return res.status(404).json({ message: "error occured" })
        }

        const newStory = await Stories.create({
            title,
            story,
            firstName,
            lastName,
            dateNaiss,
            password: hashedPassword
        })
        return res.status(200).json({message: "story added", newStory})
    }catch(error) {
        return res.status(404).json({error: error.message})
    }
}

module.exports = {
    getStories,
    postStories
}