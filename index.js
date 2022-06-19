const express = require ('express');
const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
const cors = require ('cors');
const UserRoute = require('./routes/user_route');
const dbconnect = require('./DB/dbconnect');
// const userAPI = require('./controller/controller');



const app = express();
app.use(cors());
app.use(express.json())
dotenv.config();

//route
app.use('/user',UserRoute);

const PORT = process.env.PORT || 7000;


app.listen(PORT, () => console.log('EXPRESS Server Started at Port No: '+`${PORT}`));