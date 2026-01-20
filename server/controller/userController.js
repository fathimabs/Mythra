const User = require("../models/userModel");
let bcrypt = require('bcrypt')

let CreateUser = async (req, res) => {
    // console.log(req.body);

    let { username, email, password } = req.body
    try {
        let isUserEmail = await User.findOne({ email })
        if (isUserEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        let hash = await bcrypt.hash(password, 10)

        let newUser = await new User({
            username,
            email,
            password: hash
        })
        newUser.save()
        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}

let getUserById = async (req, res) => {
    let userId = req.params.id
    try {

        let userData = await User.findOne({ _id: userId })
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.send(userData)

    } catch (error) {
        res.status(500).json({
            message: "Server error or no result found"
        });
    }
}


let updateUser = async (req, res) => {
    // console.log(req.params.id);

    let userId = req.params.id
    if (req.body.password) {
        return res.status(400).json({ message: "Password Update is not allowed" })
    }
    try {
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }
        let { username, email } = req.body
        updateData = await User.findByIdAndUpdate(userId,
            { username, email },
            { new: true, runValidators: true }
        ).select("-password")

        if (!updateData) {
            return res.status(404).json({ message: "The User Doesn't exist" });
        }

        res.status(200).json({
            message: "User updated successfully", data: updateData
        });

    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
}

let deleteUser = async (req, res) => {
    let deleteId = req.params.id
    try {
        let deleteData = await User.findByIdAndDelete({ _id: deleteId });
        if (!deleteData) {
            return res.status(404).json({ message: "User Not found" });
        }
        res.json({ message: "User deleted successfully" })

    } catch (error) {
        res.status(400).json({ error: "Invalid ID" });
    }
}
let loginUser = async (req, res) => {
    let { email, password } = req.body
    try {
        let userExist = await User.findOne({ email })
        if (!userExist) return res.status(404).json({ message: "User not found" });
        let isMatch = await bcrypt.compare(password, userExist.password)
        if (!isMatch) return res.status(404).json({ message: "Password Does not Match" });
        res.status(200).json({ message: "Welcome to Mythra" })
    } catch (error) {
        res.status(400).json({ error: "Invalid Email and Password" });
    }


}


module.exports = { CreateUser, getUserById, updateUser, deleteUser, loginUser }