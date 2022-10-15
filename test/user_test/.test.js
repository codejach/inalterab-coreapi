const supertest = require('supertest');
const expect = require('chai').expect;
const should = require('chai').should();
const UserTestModel = require('../models/UserTestModel');
const CreateUserTestModel = require('../models/CreateUserTestModel');

const server = supertest.agent('localhost:8080');

// vars
let token = '';
let userAdded = '';

describe("POST Signup process successful.", function () {
  it("/auth/signup", function (done) {
    let testModel = new UserTestModel();
    server
      .post('/auth/signup')
      .send(testModel)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then(res => {
        const body = res.body;
        const result = res.body.result;

        body.success
          .should.equal(true);
        body.message.
          should.equal("User created.");
        body.correlation
          .should.to.have.lengthOf(36);
        result
          .should.have.property('token').not.be.empty;

        done();  
      })
      .catch(err => done(err));
  });
  describe("POST Signin process successful.", function () {
    it("/auth/signin", function (done) {
      let testModel = new UserTestModel();
      server
        .post('/auth/signin')
        .send(testModel)
        .set('Accept-language', 'en')
        .set('Accept', 'application/json')
        .expect('Content-type',/json/)
        .expect(200)
        .then(res => {
          const body = res.body;
          const result = res.body.result;
          
          body.correlation
            .should.to.have.lengthOf(36);
          body.success.should.equal(true);
          result
            .should.have.property('token').not.be.empty;
  
          token = result.token;

          done();
        })
        .catch(err => done(err));
    });
    describe("GET Unauthorized by invalid token.", function () {
      it("/user 401", function (done) {
        server
          .get('/user')
          .set('Authorization', 'Invalid token')
          .set('Accept-language', 'en')
          .set('Accept', 'application/json')
          .expect('Content-type',/json/)
          .expect(401)
          .then(res => {
            const body = res.body;
            const result = res.body.result;

            body.success
              .should.equal(false);
            body.message.
              should.equal("Unauthorized")
            body.correlation
              .should.to.have.lengthOf(36);

            done();
          })
          .catch(err => done(err));
      });
    });
    describe("GET Unauthorized by denied permissions.", function () {
      it("/user 401", function (done) {
        server
          .get('/user')
          .set('Authorization', token)
          .set('Accept-language', 'en')
          .set('Accept', 'application/json')
          .expect('Content-type',/json/)
          .expect(401)
          .then(res => {
            const body = res.body;
            const result = res.body.result;

            body.success
              .should.equal(false);
            body.message.
              should.equal("Unauthorized")
            body.correlation
              .should.to.have.lengthOf(36);

            done();
          })
          .catch(err => done(err));
      });
    });
    describe("GET user list", function () {
      it("/user 200", function (done) {
        server
          .get('/user')
          .set('Authorization', token)
          .set('Accept-language', 'en')
          .set('Accept', 'application/json')
          .expect('Content-type',/json/)
          .expect(200)
          .then(res => {
            const body = res.body;
            const result = res.body.result;
            
            body.success
              .should.equal(true);
            expect(body.message)
              .to.be.a('null');
            result
              .should.be.an('array');
            body.correlation
              .should.to.have.lengthOf(36);

            done();
          })
          .catch(err => done(err));
      });
    });
    describe("GET user", function () {
      it("/user/:id 200", function (done) {
        server
          .get('/user/623fee3531f797f4b4d8ac37')
          .set('Authorization', token)
          .set('Accept-language', 'en')
          .set('Accept', 'application/json')
          .expect('Content-type',/json/)
          .expect(200)
          .then(res => {
            const body = res.body;
            const result = res.body.result;

            body.success
              .should.equal(true);
            expect(body.message)
              .to.be.a('null');
            result
              .should.be.an('object');
            body.correlation
              .should.to.have.lengthOf(36);

            done();
          })
          .catch(err => done(err));
      });
    });
    describe("GET user | Does not exist.", function () {
      it("/user/:id 200", function (done) {
        server
          .get('/user/623be1bfd664533dfb969450')
          .set('Authorization', token)
          .set('Accept-language', 'en')
          .set('Accept', 'application/json')
          .expect('Content-type',/json/)
          .expect(200)
          .then(res => {
            const body = res.body;
            const result = res.body.result;
            
            body.success
              .should.equal(false);
            body.message
              .should.equal('User does not exist.');
            expect(result)
              .to.be.a('null');
            body.correlation
              .should.to.have.lengthOf(36);

            done();
          })
          .catch(err => done(err));
      });
    });
  });
});
    
describe("POST user.", function () {
  const body = new CreateUserTestModel();

  it("/user 200", function (done) {
    server
      .post('/user')
      .send(body)
      .set('Authorization', token)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then(res => {
        const body = res.body;
        const result = res.body.result;

        userAdded = body.result;

        body.success
          .should.equal(true);
        body.message
          .should.equal('User created.'); 
        body.result
          .should.to.have.lengthOf(24);
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
});

describe("POST user. Validation failed by login.", function () {
  const body = new CreateUserTestModel();
  body.info.firstname = '';
  body.roles[0] = '623bdced469bc3f52883c960'

  it("/user 400", function (done) {
    server
      .post('/user')
      .send(body)
      .set('Authorization', token)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(400)
      .then(res => {
        const body = res.body;
        const result = res.body.result;
        
        body.success
          .should.equal(false);
        body.message
          .should.equal('Bad request.'); 
        expect(result)
          .to.be.a('null');
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
});

describe("POST user. Bad request by role.", function () {
  const body = new CreateUserTestModel();
  body.info.firstname = 'First';
  body.roles[0] = '623bdced469bc3f52883c960'

  it("/user 400", function (done) {
    server
      .post('/user')
      .send(body)
      .set('Authorization', token)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(400)
      .then(res => {
        const body = res.body;
        const result = res.body.result;
        
        body.success
          .should.equal(false);
        body.message
          .should.equal('Bad request.'); 
        expect(result)
          .to.be.a('null');
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
});

describe("POST user. Bad request by status", function () {
  const body = new CreateUserTestModel();
  body.info.firstname = 'Second';
  body.status = '623bdced469bc3f52883c968';

  it("/user 400", function (done) {
    server
      .post('/user')
      .send(body)
      .set('Authorization', token)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(400)
      .then(res => {
        const body = res.body;
        const result = res.body.result;
        
        body.success
          .should.equal(false);
        body.message
          .should.equal('Bad request.'); 
        expect(result)
          .to.be.a('null');
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
});
describe("PUT user.", function () {
  const body = new CreateUserTestModel();
  body.info.firstname = 'ModifiedUser';
  body.login.account = 'modifieduser@test.com';

  it("/user 200", function (done) {
    server
      .put(`/user/${userAdded}`)
      .send(body)
      .set('Authorization', token)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(200)
      .then(res => {
        const body = res.body;
        const result = res.body.result;
        
        body.success
          .should.equal(true);
        body.message
          .should.equal('User updated.'); 
        result
          .should.to.have.lengthOf(24);
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
});
describe("PUT user. Bad request by login.password", function () {
  const body = new CreateUserTestModel();
  body.login.password = '';

  it("/user 400", function (done) {
    server
      .put(`/user/${userAdded}`)
      .send(body)
      .set('Authorization', token)
      .set('Accept-language', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type',/json/)
      .expect(400)
      .then(res => {
        const body = res.body;
        const result = res.body.result;
        
        body.success
          .should.equal(false);
        body.message
          .should.equal('Bad request.');
        result
          .should.have.property('errors');
        result.errors
          .should.have.property('login.password');
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
});

describe("DELETE user. 400 User does not exists.", function () {
  it('/user 400', function (done) {
    server
      .delete(`/user/${userAdded.replace('0', '1').replace('a', 'b')}`)
      .set('Authorization', token)
      .set('Accept-languague', 'en')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(400)
      .then(res => {
        const body = res.body;
        const result = res.body.result;

        body.success
          .should.equal(false);
        body.message
          .should.equal('User does not exist.')
        body.correlation
          .should.to.have.lengthOf(36);

        done();
      })
      .catch(err => done(err));
  });
  describe("DELETE user.", function () {
    it('/user 200', function (done) {
      server
        .delete(`/user/${userAdded}`)
        .set('Authorization', token)
        .set('Accept-languague', 'en')
        .set('Accept', 'application/json')
        .expect('Content-type', /json/)
        .expect(200)
        .then(res => {
          const body = res.body;
          const result = res.body.result;
  
          body.success
            .should.equal(true);
          body.message
            .should.equal('User deleted.')
          result
            .should.have.property('user_id');
          result.user_id
            .should.to.have.lengthOf(24);
          body.correlation
            .should.to.have.lengthOf(36);
  
          done();
        })
        .catch(err => done(err));
    });
  });
});
