'use strict';

var superstatic = require('superstatic/lib/server');

var spec = {
  port: (process.env.PORT || 8000),
  config: {
    public: './app'
  },
  cwd: __dirname,
  gzip: true,
  debug: true
};

var app = superstatic(spec);
app.listen(function(err) {
  if (err) { console.log(err); }
  console.log('Superstatic now serving on ' + spec.port.toString());
});
