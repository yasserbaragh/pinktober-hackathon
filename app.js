require("dotenv").config()

const connectDB = require("./config/db")
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

connectDB()

const stories = require("./routes/storiesRT")

const app = express()

app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())

app.use("/api/stories", stories)

module.exports = app