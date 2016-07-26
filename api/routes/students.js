var router = require('express').Router();
var db = require('../config/database');

var studentsCollection = db.get('students');

router.get('/', function (req, res) {
  studentsCollection.find({}, function (err, docs) {
    if (err) throw err;
    res.json(docs);
  });
});

router.post('/', function (req, res) {
  studentsCollection.insert(req.body, function (err, persistedStudent) {
    res.json(persistedStudent);
  });
});

router.get('/:id', function (req, res) {
  studentsCollection.findOne({_id: req.params.id}, function (err, doc) {
    if (err) throw err;
    res.json(doc);
  });
});

router.put('/:id', function (req, res) {
  studentsCollection.update({_id: req.params.id}, req.body, function (err, doc) {
    if (err) throw err;
    res.json(doc);
  });
});

router.delete('/:id', function(req, res) {
  studentsCollection.remove({_id: req.params.id}, function (err, doc) {
    if (err) throw err;
    res.json(doc);
  });
});

module.exports = router;
