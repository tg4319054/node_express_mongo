const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel')

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


// READ json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

//import data  into db
const importData = async () => {
  try {
    await Tour.create(tours)
    console.log('Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit()
}

//delete all date from db
const deleteData = async () => {
  try {
    await Tour.deleteMany()
    console.log('DB data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit()
}

if (process.argv[2] === '--import') {
  importData()
} else if (process.argv[2] === '--delete') {
  deleteData()
}

console.log('hoge',process.argv);