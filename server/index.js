const mongoose = require("mongoose")
const express = require("express")
const cors = require('cors')
require("dotenv").config({ path: "./.env" })

mongoose.connect(process.env.MONGO_URL)
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:19006",
    credentials: true
}))

app.use(express.static("uploads"))
app.use("/api/temp", require("./routes/tempRoute"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "No resource found" })
})

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).json({ message: err.message || "Something went wrong" })
})

mongoose.connection.once("open", () => {
    console.log("Mongoose connected")
    app.listen(process.env.PORT, console.log(`Server running ${process.env.PORT}`))
})