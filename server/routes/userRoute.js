let express = require('express')
let { CreateUser, getUserById, updateUser, deleteUser, loginUser } = require('../controller/userController')
const tokenValidation = require('../middlewares/tokenValidation')

let userRoute = express.Router()

userRoute.post('/', CreateUser)
userRoute.get('/profile/:id', tokenValidation, getUserById);
userRoute.patch('/update/:id', tokenValidation, updateUser);
// userRoute.delete('/delete/:id', deleteUser);
userRoute.post('/login', loginUser)

module.exports = userRoute
