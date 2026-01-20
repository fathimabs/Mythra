let express = require('express')
const { CreateUser, getUserById, updateUser, deleteUser, login, loginUser } = require('../controller/userController')

let userRoute = express.Router()

userRoute.post('/', CreateUser)
userRoute.get('/profile/:id', getUserById)
userRoute.patch('/update/:id',updateUser)
userRoute.delete('/delete/:id',deleteUser)
userRoute.get('/login',loginUser)
module.exports = userRoute
