const Stories = require("../models/storiesMod")
const bcrypt = require("bcrypt")
const validator = require("validator")

const getStories = async (req, res) => {
    try {
        const stories = await Stories.find()

        return res.status(200).json(stories)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const deleteStories = async (req, res) => {
    const { id } = req.params
    const { password } = req.body

    try {
        const curStory = await Stories.findById(id)

        const match = await bcrypt.compare(password, curStory.password)
        if (!match) {
            throw Error('Incorrect password, you cannot delete this story')
        }

        const newStory = await Stories.findByIdAndDelete(id)
        return res.status(200).json({ message: "story deleted" })
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const postStories = async (req, res) => {
    const { title, story, firstName, lastName, dateNaiss, password } = req.body

    try {
        if (!title || !story || !password) {
            return res.status(404).json({ error: "you have to fill all required fields" })
        }

        const isStrongPassword = validator.isStrongPassword(password)
        if (!isStrongPassword) {
            return res.status(404).json({ error: "Password not Strong" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        if (!hashedPassword) {
            return res.status(404).json({ error: "error occured" })
        }

        const newStory = await Stories.create({
            title,
            story,
            firstName,
            lastName,
            dateNaiss,
            password: hashedPassword
        })
        return res.status(200).json({ message: "story added", newStory })
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }

}

const getStoriesByName = async (req, res) => {
    const { name } = req.body

    try {
        const searchPattern = new RegExp(name, 'i')

        const curStories = await Stories.find({
            $or: [
                { firstName: { $regex: searchPattern } },
                { lastName: { $regex: searchPattern } }
            ]
        })

        if (!curStories) {
            return res.status(404).json({ message: "no stories created by this person" })
        }

        return res.status(200).json(curStories)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

const getStoriesBytitle = async (req, res) => {
    const { title } = req.body

    try {
        const searchPattern = new RegExp(title, 'i')

        const curStories = await Stories.find({ title: { $regex: searchPattern } })

        if (!curStories) {
            return res.status(404).json({ message: "no stories found with this title" })
        }

        return res.status(200).json(curStories)
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

module.exports = {
    getStories,
    postStories,
    deleteStories,
    getStoriesByName,
    getStoriesBytitle
}