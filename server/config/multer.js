let multer = require("multer");
let path = require("path");

// Configure storage
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // folder must exist
//     },
//     filename: (req, file, cb) => {
//         const uniqueName =
//             Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueName + path.extname(file.originalname));
//     },
// });

const upload = multer({ storage: multer.memoryStorage() });

module.exports = upload
