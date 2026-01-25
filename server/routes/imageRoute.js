let express = require('express')
const { getImage } = require('../controller/bookController')

let imageRoute = express.Router()


imageRoute.get("/:imgName", getImage)

module.exports = imageRoute
