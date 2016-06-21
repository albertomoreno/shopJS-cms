'use strict';


angular.module('shopApp').service('Categories', function(serverCategories) {
  return {
    get: function() {
      return serverCategories;
    },

    getChildren: function() {
      var children = [];
      serverCategories.forEach(function (category) {
        category.children.forEach(function (child) {
          children.push(child);
        })
      });

      return children;
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