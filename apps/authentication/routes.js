
var routes = function (app) {
	var flashTypes = ['info', 'error'];
	app.get('/login', function (req, res) {
		var flash = {}, msg;

		for (var f in flashTypes) {
			msg = req.flash(flashTypes[f]);
			if (msg && msg.length > 0)
				flash[flashTypes[f]] = msg;
		}

		res.render(__dirname + '/views/login', {
			title: 'Login',
			stylesheet: 'login',
			flash: flash
		});
	});

	app.post('/sessions', function (req, res) {
		if ('piechef' === req.body.user && '12345' === req.body.password) {
			req.session.currentUser = req.body.user;
			req.flash('info', 'You are logged in as ' + req.session.currentUser);
		}
		else {
			req.flash('error', 'Those credentials were incorrect. Try again.');
		}

		res.redirect('/login');
	});

	app.del('/sessions', function (req, res) {
		req.session.regenerate(function (err) {
			req.flash('info', 'You have been logged out.');
			res.redirect('/login');
		});
	});
}

module.exports = routes;