/**
 * Imports
 */
const supertest = require('supertest');
const should = require('chai').should();
const expect = require('chai').expect;

const userTestModel = require('../../models/DeleteUserTestModel');

/**
 * Initializations
 */
const server = supertest.agent('localhost:8080');

/**
 * Delete user unit test operations group 
 */
describe('Delete user, test group', () => {
  // User model
  let user;
  
  /**
   * Create user
   */
  describe('Create user', () => {
    it('/user 200', done => {

      // supertest request
      server.post('/user')

        // body
        .send(userTestModel)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected response content
        .expect('Content-type', /json/)

        // expected http response code
        .expect(200)

        // async process 
        .then(res => {

          // body response
          const body = res.body;

          // result response
          const result = body.result;

          // user model declaration
          user = result;

          // assertions
          body.success.should.equal(true);
          body.message.should.equal('User created.');
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.property('_id').with.lengthOf(24);

          // end async process
          done();
        })
        .catch(err => done(err));
    });

    /**
     * Delete user wrong operation
     */
    describe('Delete user | id wrong format', () => {
      it('/user 400', done => {

        // parameters
        const userId = user._id + '_';
        
        // supertest request
        server.delete(`/user/${userId}`)
  
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
            const result = body.result;

            // assertions
            body.success.should.equal(false);
            body.message.should.equal('Bad request.');
            body.correlation.should.to.have.lengthOf(36);
            result.should.have.property('errors');
  
            // end async process
            done();
          })
          .catch(err => done(err)); 
      });
    });

    /**
     * Delete user wrong operation beacause this does not exist.
     */
    describe('Delete user | wrong operation, this does not exist.', () => {
      it('/user 400', done => {

        // parameters
        const userId = '7' + user._id.substring(1);
        
        // supertest request
        server.delete(`/user/${userId}`)
  
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
            const result = body.result;
  
            // assertions
            body.success.should.equal(false);
            body.message.should.equal('User does not exist.');
            body.correlation.should.to.have.lengthOf(36);
            expect(result).to.be.null;
  
            // end async process
            done();
          })
          .catch(err => done(err)); 
      });
    });

    /**
     * Delete user
     */
    describe('Delete user', () => {
      it('/user 200', done => {
        
        // supertest request
        server.delete(`/user/${user._id}`)
  
          // headers
          .set('Accept-language', 'en')
          .set('Accept', 'application/json')
  
          // expected response content
          .expect('Content-type', /json/)
  
          // expected http response code
          .expect(200)
  
          // async process
          .then(res => {

            // body response
            const body = res.body;
  
            // result response
            const result = body.result;
  
            // assertions
            body.success.should.equal(true);
            body.message.should.equal('User deleted.');
            body.correlation.should.to.have.lengthOf(36);
            result.should.have.property('_id').with.lengthOf(24);
  
            // end async process
            done();
          })
          .catch(err => done(err)); 
      });
    });
  });
});
