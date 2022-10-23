/**
 * Imports
 */
const supertest = require('supertest');
const should = require('chai').should();

const userTestModel = require('../../models/UserTestModel');

/**
 * Initializations
 */
const server = supertest.agent('localhost:8080');

/**
 * Get user unit test group of operations
 */
describe("Get user, test group.", () => {
  /**
   * Signed user model
   */
  var signed_user = { user: { _id : null }};

  /**
   * Get user
   */
  describe("Get user, test group.", () => {
    it("/auth/signup", done => {

      // super test request
      server.post('/auth/signup')
        
        // body
        .send(userTestModel)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected response content
        .expect('Content-type',/json/)

        // expected http response code
        .expect(200)

        // async process
        .then(res => {

          // body response
          const body = res.body;

          // result response
          const result = body.result;

          // signed user model declaration
          signed_user = result;

          // assertions
          body.correlation.should.to.have.lengthOf(36);
          body.success.should.equal(true);
          result.should.have.property('token').not.be.empty;
          result.should.have.nested.property('user._id');

          // end async process
          done();
        })
        .catch(err => done(err));
    });
  });

  /**
   * Get user list
   */
  describe("Get user list.", () => {
    it("/user", done => {

      // supertest request
      server.get('/user')

        // headers
        .set('Authorization', signed_user.token)
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content
        .expect('Content-type',/json/)

        // expected http response code
        .expect(200)

        // async process
        .then(res => {

          // body response
          const body = res.body;

          // result response
          const result = res.body.result;
          
          // assertions
          body.correlation .should.to.have.lengthOf(36);
          body.success .should.equal(true);
          result.should.be.an('array');

          // end async process
          done();
        })
        .catch(err => done(err));
    });
  });
    
  /**
   * Get user by id
   */
  describe("Get user by Id.", () => {
    it(`/user/${signed_user.user._id}`, done => {

      // supertest request
      server.get(`/user/${signed_user.user._id}`)
        
        // headers
        .set('Authorization', signed_user.token)
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content
        .expect('Content-type', /json/)

        // expected http response code
        .expect(200)

        // async process
        .then(res => {

          // body response
          const body = res.body;

          // result response
          const result = res.body.result;
    
          // assertiond
          body.correlation.should.to.have.lengthOf(36);
          body.success.should.equal(true);
          result.should.have.property('_id').to.include(signed_user.user._id);

          // end async process
          done(); 
        })
        .catch(err => done(err));
    });
  });
});
