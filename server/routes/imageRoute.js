let express = require('express')
const { getImage } = require('../controller/imageController')


let imageRoute = express.Router()


imageRoute.get("/:imgName", getImage)


module.exports = imageRoute
