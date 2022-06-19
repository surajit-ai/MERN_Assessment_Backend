const mongoose = require ('mongoose');
const dotenv = require ('dotenv');
dotenv.config();


const DBUSER = process.env.DBUSER;
const DBPASSWORD = process.env.DBPASSWORD;
const DBNAME = process.env.DBNAME;

const MONGO_DB_URL = `mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.ynsbr.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(MONGO_DB_URL);

//connect
mongoose.connection.on('connected', () => {
  console.log('Mongoose connection ESTABLISH... '  );
});

//error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
  process.exit();
});

//disconnect
mongoose.connection.on('disconnected',  () => {
  console.log('Mongoose connection disconnected');
});



module.exports = mongoose