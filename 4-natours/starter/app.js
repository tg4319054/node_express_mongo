const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()


console.log('app1');
// 1 middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  console.log('Hello from the middleware🤙');
  next()
})
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})




// 2 route handlers


// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id', getTour)
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.delete('/api/v1/tours/:id', deleteTour)

// 3 route

console.log('app');


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//old
/* app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

  
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)


app
  .route('/api/v1/users')
  .get(getAllUser)
  .post(createUser)

app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser) */

// 4 server
module.exports = app