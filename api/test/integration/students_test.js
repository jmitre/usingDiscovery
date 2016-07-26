var request = require('supertest');
var db = require('../../config/database');
var app = require('../../app');

var studentsCollection = db.get('students');

var student1 = {
  firstName: 'First',
  lastName: 'Student',
  level: 6
};

describe('students', function () {
  beforeEach(function (done) {
    studentsCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  after(function (done) {
    studentsCollection.remove({}, function (err) {
      if (err) done(err);
      done();
    });
  });

  describe('GET /students', function () {
    it('responds with a 200 status code', function (done) {
      request(app).get('/students')
        .expect(200, done)
    });

    it('returns an array of JSON objects representing students in the database', function (done) {
      // ugly way to have test data, we could make a factory for this:
      var student2 = {
        firstName: 'Second',
        lastName: 'Pupil',
        level: 10
      }

      studentsCollection.insert([student1, student2], function (err, students) {
        if (err) done(err);

        request(app).get('/students')
          .expect(function (response) {
            expect(response.body).to.be.instanceOf(Array);

            expect(response.body[0].firstName).to.equal(student1.firstName);
            expect(response.body[0].lastName).to.equal(student1.lastName);
            expect(response.body[0].level).to.equal(student1.level);

            expect(response.body[1].firstName).to.equal(student2.firstName);
            expect(response.body[1].lastName).to.equal(student2.lastName);
            expect(response.body[1].level).to.equal(student2.level);
          })
          .end(done);
        });
    });
  });

  describe('POST /students', function () {
    it('responds with a 200', function (done) {
      request(app).post('/students')
          .expect(200, done);
    });

    it('responds with the object that was persisted', function (done) {
      request(app).post('/students')
        .send({
          firstName: 'Best',
          lastName: 'Student',
          level: 2
        })
        .expect(function (response) {
          expect(response.body._id).to.exist;
          expect(response.body.firstName).to.equal('Best');
          expect(response.body.lastName).to.equal('Student');
          expect(response.body.level).to.equal(2);
        })
        .end(done);
    });
  });

  describe('GET /students/:id', function () {
    it('responds with a 200 status code', function (done) {
      studentsCollection.insert(student1, function (err, student) {
        request(app).get('/students/' + student._id)
          .expect(200, done)
        });
    });

    it('returns a single JSON objects representing the student with the matching id from the request', function (done) {
      // ugly way to have test data, we could make a factory for this:

      studentsCollection.insert(student1, function (err, students) {
        if (err) done(err);
        var id = students._id
        request(app).get('/students/' + id)
          .expect(function (response) {

            expect(response.body.firstName).to.equal(student1.firstName);
            expect(response.body.lastName).to.equal(student1.lastName);
            expect(response.body.level).to.equal(student1.level);

          }).end(done);
        });
      });
    });

    describe('PUT /students/:id', function(){
      it('responds with a 200 status code', function (done) {

        studentsCollection.insert(student1, function (err, student) {
          request(app).put('/students/' + student._id)
            .expect(200, done)
          });
      });
      it('correctly modifies a student', function(done){
        studentsCollection.insert(student1, function (err, student) {
            if(err) done(err);
            request(app).put('/students/' + student._id).send({
              firstName: 'New First Name',
              lastName: 'New Last Name',
              level: 67
            }).expect(function (response) {
                expect(response.body).to.equal(1);

                studentsCollection.find({_id: student._id}, function(err, data){
                  expect(data.firstName).to.equal('New First Name');
                });

            }).end(done);
          });
      });
    });

    describe("DELETE /students/:id", function(){
      it('responds with a 200 status code', function(done){
        studentsCollection.insert(student1, function (err, student) {
          if(err) done(err);
          request(app).delete('/students/' + student._id)
            .expect(200, done)
          });
      });
      it('correctly deletes the desired student', function(done){
        studentsCollection.insert(student1, function (err, student) {
          if(err) done(err);
          request(app).delete('/students/' + student._id)
            .expect(function(response){
              expect(response.body).to.equal(1);

              studentsCollection.find({}, function(err, data){
                expect(data).to.deep.equal({});
              });

            }).end(done);
          });
      });
    });

});
