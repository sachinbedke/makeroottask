const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")
const fs = require("fs")
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname))
    },
    destination: (req, file, cb) => {
        const url = "uploads"
        if (!fs.existsSync(url)) {
            fs.mkdirSync(url)
        }
        cb(null, url)
    },
})

module.exports = multer({ storage }).fields([
    { name: "tempImage", maxCount: 1 },
    { name: "tempVideo", maxCount: 1 },
])