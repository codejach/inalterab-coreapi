/**
 * Imports
 */
const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;

const createUserTestModel = require('../../models/CreateUserTestModel');
const updateUserTestModel = require('../../models/UpdateUserTestModel');

/**
 * Initializations
 */
const server = supertest.agent('localhost:8080');

/**
 * Creater user | successfuly
 */
describe("Create user, tests.", function () {
  var user = null;

  describe("POST user.", function () {
    it("/user 200", function (done) {
      server.post('/user')
        .send(createUserTestModel)
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .then(res => {
          const body = res.body;
          const result = res.body.result;

          user = result;
      
          body.success.should.equal(true);
          body.message.should.equal('User created.'); 
          body.result.should.have.property('_id').with.lengthOf(24);
          body.correlation.should.to.have.lengthOf(36);

          done();
        })
        .catch(err => done(err));
    });
  });

  /*
   * Create user | wrong operation beacause user already exists.
   */
  describe('Create user.', () => {
    it('/user 400', done => {
      
      // supertest reques
      server.post('/user')

        // body
        .send(createUserTestModel)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected response content
        .expect('Content-type', /json/)

        // expected http response code
        .expect(400)

        // async process
        .then(res => {
          
          // body response
          const body = res.body;

          // result response
          const result = res.body.result;

          // assertions
          body.success.should.equal(false);
          body.message.should.equal('User already exists.');
          body.correlation.should.to.have.lengthOf(36);
          expect(result).to.be.null;

          // end async process
          done();
        })
        .catch(err => done(err));;
    });
  });

  /**
   * Update user | success operation
   */
  describe("PUT user.", function () {
    it("/user 200", function (done) {
      server.put(`/user/${user._id}`)
        .send(updateUserTestModel)
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .then(res => {
          const body = res.body;
          const result = res.body.result;
  
          body.success.should.equal(true);
          body.message.should.equal('User updated.'); 
          body.result.should.to.have.lengthOf(24);
          body.correlation.should.to.have.lengthOf(36);
  
          done();
        })
        .catch(err => done(err));
    });
  });
});
