
'use strict';

var nunjucks = require('nunjucks');

module.exports = {
  render: function(res, view, data) {
    res.send(nunjucks.render('views/' + view + '.nj', data));
  },
  renderPartial: function(view, data) {
    return nunjucks.render('views/' + view + '.nj', data);
  },
};

