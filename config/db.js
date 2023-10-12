const mongoose = require("mongoose")

const connectDB = async() => {
    const conn = await mongoose.connect(process.env.MONGO)

    console.log(`database connected ${conn}`)
}

module.exports = connectDB