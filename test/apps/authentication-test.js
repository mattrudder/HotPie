
var assert = require('assert'),
	request = require('request'),
	app = require('../../app');

describe('', function () {
	describe('GET /login', function () {
		var body = null;

		before(function (done) {
			var options = {
				uri: 'http://localhost:' + process.env.PORT + '/login'
			};

			request(options, function (err, response, _body) {
				body = _body;

				done();
			});
		});

		it('has title', function () {
			assert.hasTag(body, '//head/title', 'Hot Pie - Login');
		});
		it('has user field', function () {
			assert.hasTag(body, '//input[@name=user]', '');
		});
		it('has password field', function () {
			assert.hasTag(body, '//input[@name=password]', '');
		});
	});

	describe('POST /sessions', function () {
		describe('incorrect credentials', function () {
			var body = null,
				response = null;

			before(function (done) {
				var options = {
					uri: 'http://localhost:' + process.env.PORT + '/sessions',
					form: {
						user: 'incorrect user',
						password: 'incorrect password'
					},
					followAllRedirects: true
				};

				request.post(options, function(err, _response, _body) {
					body = _body;
					response = _response;

					done();
				});
			});

			it('shows flash message', function () {
				var errorText = 'Those credentials were incorrect. Please login again.';
				assert.hasTag(body, "//p[@class='flash error']", errorText);
			});
		});

		describe('correct credentials', function () {
			var body = null,
				response = null;

			before(function (done) {
				var options = {
					uri: 'http://localhost:' + process.env.PORT + '/sessions',
					form: {
						user: 'piechef',
						password: '12345'
					},
					followAllRedirects: true
				};

				request.post(options, function(err, _response, _body) {
					body = _body;
					response = _response;

					done();
				});
			});

			it('shows flash message', function () {
				var errorText = 'You are logged in as piechef.';
				assert.hasTag(body, "//p[@class='flash info']", errorText);
			});
		});
	});

	describe('DELETE /sessions', function () {
		var body = null,
			response = null;

		before(function (done) {
			var options = {
				uri: 'http://localhost:' + process.env.PORT + '/sessions',
				followAllRedirects: true
			};

			request.del(options, function(err, _response, _body) {
				body = _body;
				response = _response;

				done();
			});
		});

		it('shows flash message', function () {
			var errorText = 'You have been logged out.';
			assert.hasTag(body, "//p[@class='flash info']", errorText);
		});
	});
});