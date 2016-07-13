'use strict';

angular.module('shopApp').service('ReloadShop', function($compile, $http, $rootScope) {

  return {
    run: function () {
      $http.get('/reload-navbar').then(function (res) {
        $('nav.navbar').empty().html(res.data);
      });

      $http.get(location.pathname + '?single=true').then(function (res) {
        // console.log('reload');

        var content = $('#content');
        
        content.empty().html(res.data);


        var link = $compile(content[0]);

        link($rootScope);

      });

    },


  };

});


/*window.reloadShop = function() {

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

}*/




