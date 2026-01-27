const path = require('path')
const fs = require('fs')

exports.getImage = (req, res) => {
  const { imgName } = req.params

  const imagePath = path.join(__dirname, '../uploads', imgName)

  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ message: 'Image not found' })
  }

  res.sendFile(imagePath)
}
