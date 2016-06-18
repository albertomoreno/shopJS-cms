'use strict';


angular.module('shopApp').service('Categories', function(serverCategories) {
  return {
    get: function() {
      return serverCategories;
    },

    add: function(category) {
      if(!category.parent) {
        serverCategories.push(category);
        return;
      }

      serverCategories.forEach(function(cat) {
        if(cat._id === category.parent) {
          cat.children.push(category);
        }
      });
    },

  };
});