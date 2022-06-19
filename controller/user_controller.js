const UserModel = require('../model/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const Encode_Key = `${process.env.SECRET_KEY}`;
dotenv.config()

const UserCTRL = {
    signup: async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const oldUser = await UserModel.findOne({ "email": req.body.email });
            if (oldUser) {
                return res.status(200).json(
                    { message: 'Email already in Exist' }
                );
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            console.log(hashedPassword)
            const result = await UserModel.create(
                {
                    name: name,
                    email: email,
                    password: hashedPassword,
                }
            )
            const token = jwt.sign(
                {
                    email: result.email,
                    id: result._id,
                },
                Encode_Key,
                { expiresIn: '1h' }
            )
            res.status(201).json(
                {
                    message: 'Sucessfully Register',
                    result: result,
                    token: token
                }
            )

        }
        catch (error) {
            res.status(500).json({
                message: 'Something Went Wrong'

            })
        }
    },

    signin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const oldUser = await UserModel.findOne({ email });
            if (!oldUser) {
                return res.status(200).json(
                    { message: 'User dose not Exist' }
                );
            }
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

            if (!isPasswordCorrect) {
                return res.status(200).json(
                    { message: 'invalid Password' }
                );
            }
            const token = jwt.sign(
                {
                    email: oldUser.email,
                    id: oldUser._id,
                },
                Encode_Key,
                { expiresIn: 3600 }
            )
            res.status(201).json(
                {
                    message: 'Sucessfully login',
                    userdata: oldUser,
                    token: token,
                    expiresIn: 3600,
                }
            )
        }
        catch (error) {
            res.status(500).json({
                message: 'Something Went Wrong'

            })
        }
    }
}
module.exports = UserCTRL;