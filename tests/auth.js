var expect = require("chai").expect;
var authMW = require("../middleware/authMW");

describe("authMW", function () {

  context('grant permission', function() {

    this.beforeEach(function () {
      this.req = {
        session: {
          logged_in: true,
          user: "user_xyz",
        },
      };  
      this.res = {
        locals: {},
      };
    });

    it("res.loclals.user expected to be set", function (done) {
      authMW()(this.req, this.res, () => {
        expect(this.res.locals.user).eq("user_xyz");
        done();
      });
    });

    it("req.session.logged_in expected to be true", function (done) {
      authMW()(this.req, this.res, () => {
        expect(this.req.session.logged_in).eq(true)
        done();
      });
    });

  });

  context('deny permission', function() {
    
    this.beforeEach(function () {    
      this.req = {
        session: {logged_in: false},
      };
      
      this.res = {
          locals: {},
          redirect: function(){}
      };  
    });
  
    it("should call redirect(\"/login\") ", function (done) {
  
      this.res.redirect = function(path) {
        expect(path).eq("/login");
        done();
      };
  
      authMW()(this.req, this.res, () => {
        done(new Error("should not call next"));
      });
    });

    it("should not call next", function (done) {
      authMW()(this.req, this.res, () => {        
        done(new Error("should not call next"));
      });
      done();
    });
  
    it("res.locals.user excepted to be undefined", function (done) {
  
      authMW()(this.req, this.res, () => {
        expect(this.res.locals.user).eq(undefined);
      });
  
      done();
      
    });
  });


});
