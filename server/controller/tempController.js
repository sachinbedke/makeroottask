const asyncHnadler = require("express-async-handler")
const Temple = require("../model/Temple")
const upload = require("../utils/upload")

exports.getAllTemples = asyncHnadler(async (req, res) => {

    const result = await Temple.find()
    res.json({ message: "Information Fetch Success", result })
})
exports.addTempleInfo = asyncHnadler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "multer error" })
        }

        const templeName = req.body.templeName || null
        const address = req.body.address || null
        const contactPerson = req.body.contactPerson || null
        const phoneNumber = req.body.phoneNumber || null
        const altPhoneNumber = req.body.altPhoneNumber || null
        const templeDetails = req.body.templeDetails || null
        const tempImage = req.files.tempImage ? req.files.tempImage[0].filename : null
        const tempVideo = req.files.tempVideo ? req.files.tempVideo[0].filename : null
        console.log(req.body, req.files.filename);
        console.log(req.body);

        await Temple.create(req.body)
        res.json({ message: "Information Add  Success" })
    })

})
