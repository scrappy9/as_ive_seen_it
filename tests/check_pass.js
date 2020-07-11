var expect = require("chai").expect;
var checkPassMW = require("../middleware/checkPassMW");

describe("checkPassMW", function () {

  context('correct pass', function() {

    this.beforeEach(function () {
      this.req = {        
        body: { password: "correct horse battery staple"}
      };  
      this.res = {
        locals: {
            user: { password: "correct horse battery staple" }
        },
        redirect: () => {},
      };
    });

    it("given pass equals with saved pass.", function (done) {
        checkPassMW()(this.req, this.res, () => {});
        expect(this.res.locals.user.password).eq(this.req.body.password);
        done();
    });

    it("should call next", function (done) {
        checkPassMW()(this.req, this.res, () => {        
        done();
      });
    });
  });

  context('incorrect pass', function() {

    this.beforeEach(function () {
      this.req = {        
        body: { password: "Tr0ub4dor&3"}
      };  
      this.res = {
        locals: {
            user: { password: "correct horse battery staple" }
        },
        redirect: () => {},
      };
    });

    it("given pass not be the same as saved pass.", function (done) {
        checkPassMW()(this.req, this.res, () => {});
        expect(this.res.locals.user.password).not.eq(this.req.body.password);
        done();
    });

    it("should not call next", function (done) {
        checkPassMW()(this.req, this.res, () => {        
            done(new Error("should not call next"));
        });
        done();
    });
  });


});
