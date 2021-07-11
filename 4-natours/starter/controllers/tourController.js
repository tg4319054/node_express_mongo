const fs = require('fs')
const Tour = require('./../models/tourModel');
const mongoose = require('mongoose');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))
console.log('Controller');


// router.param very useful
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID'
//     })
//   }
//   next()
// }

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name r price'
//     })
//   }
//   next()
// }

exports.getAllTours = async (req, res) => {
  try {
    const queryObj = {...req.query}
    const excludedFields = ['page', 'sort', 'limit', 'field']
    excludedFields.forEach(el => delete queryObj[el])
    
    
    
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    let query = await Tour.find(JSON.parse(queryStr))

    console.log('queryStr', queryStr);

    if (req.query.sort) {
      console.log('aaaa');
      //query = Tour.sort('price')
    }

    // query = query.sort('price')
    // console.log('hoge');

    /* if (req.query.sort) {
      console.log(req.query.sort);
      
      const sortBy = req.query.sort.split(',').join(' ')
      console.log(sortBy)
      query = query.sort(sortBy)
    } else {
      console.log(query);
    } */
    
    const tours = await query 
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    })
    
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    console.log('req.params', req.params);
    const tour = await Tour.findById(req.params.id)
    // Tour.findOne({ _id: req.params.id })
    
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body)
    
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
  
}

exports.updateTour = async (req, res) => {

  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  try {
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
    
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTour = async (req, res ) => {
  console.log('delete req.body', req.params)

  try {
    await Tour.findByIdAndDelete(req.params.id)
    res.status(204).json({
      status: 'success',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}
