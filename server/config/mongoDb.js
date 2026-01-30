let mongoose = require('mongoose')

async function mongoDb(url) {
    try {
              
        await mongoose.connect(url);
        console.log("mongoDb is Connected");
    } catch (err) {
        console.error("Connection Error", err);
        process.exit(1);
    }
}

module.exports = mongoDb

