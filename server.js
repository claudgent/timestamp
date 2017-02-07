'use strict'

var express = require('express')
var moment = require('moment')
var app = express()

//  Routes
app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd() + '/public/index.html')
    })

// Get date from query string
app.get('/:query', function (req, res) {
  var date = req.params.query
  var dateValidityCheck = moment(date)

  if (!dateValidityCheck.isValid()) {
    res.json({
      natural: null,
      unix: null
    })
  } else if (!date.match(/[a-z]/i)) {
    res.json({
      supplied: 'unix',
      natural: moment(date, 'X').format('LL'),
      unix: date
    })
  } else {
    res.json({
      supplied: 'natural',
      natural: date,
      unix: moment(date, 'LL').format('X')
    })
  }
})

// Start server
app.listen(process.env.port, function () {
  console.log('Node.js listening...')
})
