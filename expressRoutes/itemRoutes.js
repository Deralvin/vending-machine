
var express = require('express');
var app = express();
var itemRoutes = express.Router();
const multer = require("multer");

// Require Item model in our routes module
var Item = require('../models/Item');

// Defined store route
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage }).single('imageItem')

itemRoutes.post('/upload/image', function (req, res) {

  upload(req, res, function (err) {
    if (err) {
      
    }
    res.json({
      success:true,
      message:'image upload'
    }); 
  })
});

itemRoutes.route('/add').post(function (req, res) {
  var item = new Item(req.body);
  console.log(item)
  console.log("Image")
  console.log(item.file)
  item.save()
    .then(item => {
      res.status(200).json({ 'item': 'Item added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
itemRoutes.route('/').get(function (req, res) {
  Item.find(function (err, items) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

// Defined edit route
itemRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Item.findById(id, function (err, item) {
    res.json(item);
  });
});

//  Defined update route
itemRoutes.route('/update/:id').post(function (req, res) {
  Item.findById(req.params.id, function (err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.name = req.body.name;
      item.price = req.body.price;

      item.save().then(item => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
itemRoutes.route('/delete/:id').get(function (req, res) {
  Item.findByIdAndRemove({ _id: req.params.id }, function (err, item) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = itemRoutes;