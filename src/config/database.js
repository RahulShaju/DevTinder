const mongoose = require("mongoose")

const URI = "mongodb+srv://norda:ozCvlm0k1QkQwrbO@norda.2wt9rcv.mongodb.net/devtinder"

const connectDB = async ()=>{
    await mongoose.connect(URI)
}

module.exports = connectDB

