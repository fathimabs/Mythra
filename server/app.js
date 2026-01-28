let express = require('express')
let cors = require('cors')
let mongoDb = require('./config/mongoDb');
let userRoute = require('./routes/userRoute');
let bookRoute = require('./routes/bookRoute');
let movieRoute = require('./routes/movieRoute');
let imageRoute = require('./routes/imageRoute');


let app = express()
app.use(express.json())
app.use(cors())
mongoDb();

app.use('/api/user', userRoute)
app.use('/api/book', bookRoute)
app.use('/api/movie', movieRoute)
app.use('/api/image', imageRoute)

app.listen(3000, () => {
    console.log("Mithra-app server Connected");
})


