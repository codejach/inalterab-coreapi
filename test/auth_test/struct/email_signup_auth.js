/**
 * Imports
 */
const supertest = require('supertest');
const should = require('chai').should();

const userModel = require('../../models/UserTestModel');

/*
 * Initializations
 */
const server = supertest.agent('localhost:8080');

/**
 * Email signup user, tests
 */
describe("Email signup user, tests.", () => {

  /**
   * Signup user by email | successful
   */
  describe("POST signup | Process successful", () => {
    it("/auth/signup 200", done => {
      
      // supertest request
      server.post('/auth/signup')

        // body
        .send(userModel)

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
          result.should.have.property('token').not.be.empty;

          // end async process
          done();  
        })
        .catch(err => done(err));
    });
  });

  /**
   * Signup user by email | Process failed by invalid email
   */
  describe("Post signup | Process failed by invalid email", () => {
    it("/auth/signup 412", done => {

      // updated model
      const userModelUpdated = {
        ...userModel,
        account: 'text_user@wrongstructure'
      };
      
      // supertest request
      server.post('/auth/signup')

        // body
        .send(userModelUpdated)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content
        .expect('Content-type', /json/)

        // expected http response code
        .expect(412)

        // async process
        .then(res => {

          // body response
          const body = res.body;

          // result response
          const result = body.result;

          // assertions
          body.success.should.equal(false);
          body.message.should.equal("Invalid register, try again.");
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.nested.property("errors.account");

          // end async process
          done();
        })
        .catch(err => done(err));
    });
  });

  /**
   * Signup user by email | Process failed by invalid password
   */
  describe("Post signup | Process failed by invalid password", () => {
    it("/auth/signup 412", done => {
      
      // updated model
      const userModelUpdated = {
        ...userModel,
        password: ''
      };

      // supertest request
      server.post('/auth/signup')

        // body
        .send(userModelUpdated)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content
        .expect('Content-type', /json/)

        // expected http response code
        .expect(412)

        // async process
        .then(res => {
          
          // body response
          const body = res.body;

          // result response
          const result = body.result;

          // assertions
          body.success.should.equal(false);
          body.message.should.equal("Invalid register, try again.");
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.nested.property("errors.password");

          // end async process
          done();
        })
        .catch(err => done(err)); 
    });
  });

  /**
   * Signup user by email | Process failed by account param not supplied
   */
  describe("Post signup | Process failed by account param not supplied", () => {
    it("/auth/signup 421", done => {

      // update model
      const userModelUpdated = {
        ...userModel,
        account: null,
      };

      // supertest request
      server.post('/auth/signup')

        // body
        .send(userModelUpdated)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content type
        .expect('Content-type', /json/)

        // expected http response code
        .expect(412)

        // ansyc process
        .then(res => {
          
          // body response
          const body = res.body;
          
          // result response
          const result = body.result;

          // assertions
          body.success.should.equal(false);
          body.message.should.equal('Invalid register, try again.');
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.nested.property('errors.account');

          // end async process
          done();
        })
        .catch(err => done(err));
    });
  });

  /**
   * Signup user by email | Process failed by password param not supplied
   */
  describe("Post signup | Process failed by password param not supplied", () => {
    it("/auth/signup 421", done => {

      // update model
      const userModelUpdated = {
        ...userModel,
        password: null,
      };

      // supertest request
      server.post('/auth/signup')

        // body
        .send(userModelUpdated)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content type
        .expect('Content-type', /json/)

        // expected http response code
        .expect(412)

        // ansyc process
        .then(res => {
          
          // body response
          const body = res.body;
          
          // result response
          const result = body.result;

          // assertions
          body.success.should.equal(false);
          body.message.should.equal('Invalid register, try again.');
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.nested.property('errors.password');

          // end async process
          done();
        })
        .catch(err => done(err));
    });
  });

  /**
   * Signup user by email | Process failed by parameters not supplied
   */
  describe("Post signup | Process failed by parameters not supplied.", () => {
    it("/auth/signup 421", done => {

      // update model
      const userModelUpdated = {
        ...userModel,
        account: null,
        password: null 
      };

      // supertest request
      server.post('/auth/signup')

        // body
        .send(userModelUpdated)

        // headers
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')

        // expected http response content type
        .expect('Content-type', /json/)

        // expected http response code
        .expect(412)

        // ansyc process
        .then(res => {
          
          // body response
          const body = res.body;
          
          // result response
          const result = body.result;

          // assertions
          body.success.should.equal(false);
          body.message.should.equal('Invalid register, try again.');
          body.correlation.should.to.have.lengthOf(36);
          result.should.have.property('errors')
            .and.to.have.all.keys('account', 'password');

          // end async process
          done();
        })
        .catch(err => done(err));
    });
  });

});
