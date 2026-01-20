let express = require('express')
let cors=require('cors')
const mongoDb = require('./config/mongoDb');
const userRoute = require('./routes/userRoute');
const bookRoute = require('./routes/bookRoute');
const movieRoute = require('./routes/movieRoute');


let app = express()
app.use(express.json())
app.use(cors())
mongoDb();

app.use('/api/user', userRoute)
app.use('/api/book', bookRoute)
app.use('/api/movie', movieRoute)


app.listen(3000, () => {
    console.log("Mithra-app server Connected");
})


 