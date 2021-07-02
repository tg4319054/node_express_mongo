const express = require('express')
const tourController = require('./../controllers/tourController')
//const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('./../controllers/tourController')


const router = express.Router()


// Create a checkBody middleware
//Check if body contains the name and price property
// if not, send back 400 (bac request)
//add it to the post handler stack



console.log('Router');

//router.param('id', tourController.checkID)

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour)


router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)


module.exports = router
