'use strict';


angular.module('shopApp').component('adminCategories', {
  templateUrl: '/static/scripts/categories/admin-categories.html',
  controller: function(Categories) {
    this.categories = Categories.get();
  }
});