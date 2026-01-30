const User = require("../models/userModel");
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')


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

        let userData = await User.findOne({ _id: userId }).select('-password')
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(400).json({
            message: "Server error or no result found"
        });
    }
}



let updateUser = async (req, res) => {
    // console.log(req.params.id);

    let userId = req.params.id
    let { username, email } = req.body
    if (req.body.password) {
        return res.status(400).json({ message: "Password Update is not allowed" })
    }
    try {
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }
        let updateFields = {};
        if (req.body.username) updateFields.username = username;
        if (req.body.email) updateFields.email = email;

        let updateData = await User.findByIdAndUpdate(userId,
            updateFields,
            { new: true, runValidators: true }
        ).select("-password")
        // console.log(updateData);

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
    let { email, password } = req.body;

    try {
        let userExist = await User.findOne({ email });

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        let isMatch = await bcrypt.compare(password, userExist.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        let token = jwt.sign({ id: userExist.id, email: userExist.email }, "123", { expiresIn: '1h' })

        res.status(200).json({
            message: "Welcome to Mythra",
            userId: userExist.id,
            username: userExist.username,
            email: userExist.email,
            token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



module.exports = { CreateUser, getUserById, updateUser, deleteUser, loginUser }