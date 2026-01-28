let  path = require('path')
let  fs = require('fs')

exports.getImage = (req, res) => {
  let  { imgName } = req.params

  let  imagePath = path.join(__dirname, '../uploads', imgName)

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: 'Image not found' })
  }

  res.sendFile(imagePath)
}
