require("dotenv").config()

const connectDB = require("./config/db")
const express = require("express")
const bodyParser = require("body-parser")

connectDB()

const stories = require("./routes/storiesRT")

const app = express()

app.use(bodyParser.json())

app.use("/api/stories", stories)

app.listen(5000, () => {
    console.log("server connected")
})