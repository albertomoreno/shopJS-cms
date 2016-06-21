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

    replace: function(categorySearch, categoryReplace) {
      for (var i = 0; i < serverCategories.length; i++) {
        var cat = serverCategories[i];
        if(cat == categorySearch) {
          serverCategories[i] = categoryReplace;
          serverCategories[i].children = cat.children;
          return;
        }

        for (var j = 0; j < cat.children.length; j++) {
          var child = cat.children[j];
          if(child == categorySearch) {
            serverCategories[i].children[j] = categoryReplace;
            return;
          }
        }
      };
    }

  };
});