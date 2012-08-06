process.env.NODE_ENV = 'test';
process.env.PORT = 3001;

require('coffee-script');
// Needs libxmljs, not available on Windows :(
//require(__dirname + '/assert-extra');