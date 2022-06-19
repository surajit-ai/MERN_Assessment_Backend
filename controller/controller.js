const express = require('express');
const router = express.Router();
// const UserModel = require('../model/user_model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const Encode_Key = `${process.env.SECRET_KEY}`;
dotenv.config()

router.post('/register', (req, res) => {
  const {name, email, password } = req.body;
  UserModel.find({ $or: [{ "email": req.body.email }] })
    .then(response => {
      if (response.length > 0) {
        return res.send({ message: "Email Id or Mobile No Already exits in our Database Please Register with Other Credentials" })
      }
      else {
        const hashedPassword = bcrypt.hash(password, 12);
        console.log(hashedPassword)
        const obj = new UserModel({
          name,
          email,
          password:hashedPassword,
        });

        obj.save()
          .then(inserteddocument => {
              if (error) {
                res.send({ message: error })
              } else {
                res.status(200).send({ message: "Registration Successfull" });
              }
            })

          .catch(err => {
            res.status(500).send({ message: err.message || 'Error in Employee Save ' })
          });
      }
    })
}
);
module.exports = router;