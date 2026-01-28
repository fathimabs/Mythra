let express = require('express')
let { getImage } = require('../controller/imageController')


let imageRoute = express.Router()


imageRoute.get("/:imgName", getImage)


module.exports = imageRoute
