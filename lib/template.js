
'use strict';

var nunjucks = require('nunjucks');

module.exports = {
  render: function(res, view, data) {
    res.send(nunjucks.render('views/' + view + '.nj', data));
  },
};

