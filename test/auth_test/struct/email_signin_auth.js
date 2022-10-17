/**
 * Imports
 */
const supertest = require('supertest');
const should = require('chai').should();

const createUserModel = require('../../models/CreateUserTestModel');
const updateUserTestModel = require('../../models/UpdateUserTestModel');
const userTestModel = require('../../models/UserTestModel');

/**
 * Inititalizations
 */
const server = supertest.agent('localhost:8080');

/**
 * Signin user email, tests operations group
 */
describe("Email signin user, tests.", () => {
  // User created
  var userCreated = null;

  /**
   * Create user | successfully
   */
  describe("Create user | Process successful", () => {
    it("/user 200", done => {
      // update user models
      const userModelUpdated = {
        ...createUserModel,
        login: {
          ...createUserModel.login,
          account: 'signin_test_user@testuser.com'
        }
      };
      
      // supertest request
      server.post('/user')

        // body
        .send(userModelUpdated)

        // headers
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
          body.success.should.equal(true);
          body.message.should.equal("User created.");
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.property('_id').with.lengthOf(24);

          // Declarations
          userCreated = result;

          // end async process
          done();  
        })
        .catch(err => done(err));
    });
  });

  /**
   * Update user | successfully
   */
  describe("Update user password | Process successful", () => {
    it("/user 200", done => {
      // update user models
      const userModelUpdated = {
        ...updateUserTestModel,
        login: {
          ...updateUserTestModel.login,
          account: 'signin_test_user@testuser.com'
        }
      };
      
      // supertest request
      server.put(`/user/${userCreated._id}`)

      // body
      .send(userModelUpdated)

      // headers
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

        // assertions
        body.success.should.equal(true);
        body.message.should.equal('User updated.');
        body.correlation.should.to.have.lengthOf(36);

        // end process
        done();
      })
      .catch(err => done(err));
    });
  });

  /**
   * Signin by email user | successfully
   */
  describe("Signin by email user | Process successful", () => {
    it("/auth/signin 200", done => {
      // update user models
      const updatedUserTestModel = {
        ...userTestModel,
        account: 'signin_test_user@testuser.com'
      };

      // supertest request
      server.post('/auth/signin')

      // body
      .send(updatedUserTestModel)

      // headers
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
        const result = body.result;

        // assertions
        body.success.should.equal(true);
        body.correlation.should.to.have.lengthOf(36);
        result.should.have.property('token').not.be.empty;

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });

  /**
   * Signin by email user | Process failed by invalid email
   */
  describe("Signin by email user | Process failed by invalid email", () => {
    it("/auth/signin 401", done => {
      // update user models
      const updatedUserTestModel = {
        ...userTestModel,
        account: 'wrong_user@testuser.com'
      };

      // supertest request
      server.post('/auth/signin')

      // body
      .send(updatedUserTestModel)

      // headers
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')

      // expected http response content
      .expect('Content-type', /json/)

      // expected http response code
      .expect(401)

      // async process
      .then(res => {

        // body response
        const body = res.body;

        // result response
        const result = body.result;

        // assertions
        body.success.should.equal(false);
        body.correlation.should.to.have.lengthOf(36);
        result.should.have.property('token', null);
        result.should.have.property('user', null);

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });

  /**
   * Signin by email user | Process failed by invalid password
   */
  describe("Signin by email user | Process failed by invalid password", () => {
    it("/auth/signin 401", done => {
      // update user models
      const updatedUserTestModel = {
        ...userTestModel,
        password: 'invalid_password'
      };

      // supertest request
      server.post('/auth/signin')

      // body
      .send(updatedUserTestModel)

      // headers
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')

      // expected http response content
      .expect('Content-type', /json/)

      // expected http response code
      .expect(401)

      // async process
      .then(res => {

        // body response
        const body = res.body;

        // result response
        const result = body.result;

        // assertions
        body.success.should.equal(false);
        body.correlation.should.to.have.lengthOf(36);
        result.should.have.property('token', null);
        result.should.have.property('user', null);

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });

  /**
   * Signin by email user | Process failed by email null
   */
  describe("Signin by email user | Process failed by email param not supplied",
    () => {
    it("/auth/signin 401", done => {
      // update user models
      const updatedUserTestModel = {
        ...userTestModel,
        account: null
      };

      // supertest request
      server.post('/auth/signin')

      // body
      .send(updatedUserTestModel)

      // headers
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')

      // expected http response content
      .expect('Content-type', /json/)

      // expected http response code
      .expect(401)

      // async process
      .then(res => {

        // body response
        const body = res.body;

        // result response
        const result = body.result;

        // assertions
        body.success.should.equal(false);
        body.correlation.should.to.have.lengthOf(36);
        result.should.have.nested.property('errors.account');

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });

  /**
   * Signin by email user | Process failed by pasword null
   */
  describe("Signin by email user | Process failed by password param not supplied", 
    () => {
    it("/auth/signin 401", done => {
      // update user models
      const updatedUserTestModel = {
        ...userTestModel,
        password: null
      };

      // supertest request
      server.post('/auth/signin')

      // body
      .send(updatedUserTestModel)

      // headers
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')

      // expected http response content
      .expect('Content-type', /json/)

      // expected http response code
      .expect(401)

      // async process
      .then(res => {

        // body response
        const body = res.body;

        // result response
        const result = body.result;

        // assertions
        body.success.should.equal(false);
        body.correlation.should.to.have.lengthOf(36);
        result.should.have.nested.property('errors.password');

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });
})
