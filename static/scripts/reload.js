'use strict';


window.reloadShop = function() {

  $.ajax({
    method: 'GET',
    url: location.path,
    data: {single: true},
    success: function(content) {
      $('#content').empty().html(content);
    }
  });

  $.ajax({
    method: 'GET',
    url: '/reload-navbar',
    success: function(content) {
      $('nav.navbar').empty().html(content);
    }
  });

}




