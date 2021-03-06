var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function () {
    describe('hello_world', function () {
        describe('GET /', function () {
            it('should return a default string', function (done) {
                var port = process.env.PORT || 8080
                request(server)
                    .get('/')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res) {
                        should.not.exist(err);
                        res.body.should.eql('JWT demo API path http://localhost:' + port + '/api');
                        done();
                    });
            });
        });
    });
});