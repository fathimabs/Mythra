let express = require('express')
let  { CreateUser, getUserById, updateUser, deleteUser,  loginUser } = require('../controller/userController')

let userRoute = express.Router()

userRoute.post('/', CreateUser)
userRoute.get('/profile/:id', getUserById); 
userRoute.patch('/update/:id', updateUser);
userRoute.delete('/delete/:id', deleteUser);
userRoute.post('/login', loginUser)

module.exports = userRoute
