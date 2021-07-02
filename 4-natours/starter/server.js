console.log('Server');
const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

//      .connect(process.env.DATABASE_LOCAL {
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => {
  console.log('DB connection successful!');
})



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
})