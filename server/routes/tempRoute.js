const { getAllTemples, addTempleInfo } = require("../controller/tempController")

const router = require("express").Router()

router
    .get("/", getAllTemples)
    .post("/add", addTempleInfo)

module.exports = router