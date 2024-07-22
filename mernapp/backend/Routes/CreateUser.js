const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const jwtSecret = "MynameisEndtoEndYouTubeChannel&#"
//for creating new user
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //creating salt for password
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt);
        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: "Qwerty edrfef"
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }
    })
//for user validation
router.post("/loginuser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            //storing the email in the database into useremail
            let userData = await User.findOne({ email })
            //if user data is empty means no user with that email
            if (!userData) {
                return res.status(400).json({ errors: "try logging with correct credentials" })
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            //checking the entered password with already stored password in database with key password
            if (!pwdCompare) {
                return res.status(400).json({ errors: "try logging with correct credentials" })
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret)
            return res.json({ success: true , authToken})
        } catch (error) {
            console.log(error)
            res.json({ success: false })

        }
    })


module.exports = router;

