const supertest = require("supertest");
const should = require("chai").should();

const userTestModel = require('../../models/UserTestModel');

const server = supertest.agent("localhost:8080");

describe("Get admin permissions", () => {
  var signed_user = { user: { _id : null }};

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

  describe("Get permissions for administrator.", () => {
    it("/auth/permission/{role}", done => {
      
      server.get("/auth/permission/administrator")

      // header
      .set("Authorization", signed_user.token)
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
        result.should.be.an('array');

        console.log(result);

        result.forEach((role) => {
          console.log(role.description);
          role.access.forEach((access) => {
            console.log("\t" + access.description);
            access.actions.forEach((action) => {
              console.log("\t\t" + action.description);
            })
          })
        });

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });

  describe("Get permissions for all roles.", () => {
    it("/auth/permissions", done => {
      
      server.get("/auth/permission")

      // header
      .set("Authorization", signed_user.token)
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
        result.should.be.an('array');

        result.forEach((role) => {
          console.log(role.description);
          role.access.forEach((access) => {
            console.log("\t" + access.description);
            access.actions.forEach((action) => {
              console.log("\t\t" + action.description);
            })
          })
        });

        // end async process
        done();
      })
      .catch(err => done(err));
    });
  });
});
