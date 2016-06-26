'use strict';


angular.module('shopApp').service('Shop', function(shop) {
  return {
    get: function() {
      return shop;
    },

    update: function(data) {
      shop = data;
    },
  };
});