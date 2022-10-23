/**
 * Imports
 */
const supertest = require('supertest');
const should = require('chai').should();

const ethModel = require('../../models/EthereumTestModel');

/*
 * Initializations
 */
const server = supertest.agent('localhost:8080');

/**
 * Email signin user, tests
 */
describe("ETH signin user, tests.", () => {

  /**
   * Signin user by eth account | successful
   */
  describe("POST signin | Process successful", () => {
    it("/auth/signin/eth 200", done => {
      
      // supertest request
      server.post('/auth/signin/eth')

        // body
        .send(ethModel)

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
   * Signin user by eth account | Process failed by invalid account 
   */
  describe("Post signin | Process failed by invalid account", () => {
    it("/auth/signin/eth 412", done => {

      // updated model
      const ethModelUpdated = {
        ...ethModel,
        account: 'text_user@wrongstructure'
      };
      
      // supertest request
      server.post('/auth/signin/eth')

        // body
        .send(ethModelUpdated)

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
   * Signin user by email accoun | Process failed by account param not supplied
   */
  describe("Post signin | Process failed by account param not supplied", () => {
    it("/auth/signin/eth 421", done => {

      // update model
      const ethModelUpdated = {
        ...ethModel,
        account: null,
      };

      // supertest request
      server.post('/auth/signin/eth')

        // body
        .send(ethModelUpdated)

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
});
