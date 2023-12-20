const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Parent = require("../models/Parent");

const authControllers = {
    login: async(req, res) => {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json("Please enter all fields");

        const doesEmailExist = await Parent.findOne({email});
        if(!doesEmailExist) return res.status(404).json("User not found");

        const doPasswordMatch = await bcrypt.compare(password, doesEmailExist.password);
        if(!doPasswordMatch) return res.status(400).json("Passwords do not match");

        const token = jwt.sign({userId: doesEmailExist._id}, "jf9248jf348f9qj4039fj3", {expiresIn: "2d"});

        return res.status(200).json({userId: doesEmailExist._id, token});
        
    },
    signup: async(req, res) => {
        const {email, password} = req.body;

        if(!email || !password) return res.status(400).json("please fill in the fields");

        const doesEmailExist = await Parent.findOne({email});
        if(doesEmailExist) return res.status(400).json("that email is taken");

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await Parent.create({
            email: email,
            password: hash
        });

        const token = jwt.sign({userId: newUser._id}, "jf9248jf348f9qj4039fj3", {expiresIn: "2d"});

        return res.status(201).json({userId: newUser._id, token});
    }

}

module.exports = authControllers;