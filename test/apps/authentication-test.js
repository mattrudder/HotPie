
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

		it('has user field', function () {
			assert.ok(/user/.test(body));
		});
	});
});