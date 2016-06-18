'use strict';


angular.module('shopApp').component('adminCategories', {
  templateUrl: '/static/scripts/categories/admin-categories.html',
  bindings: {
    categories: '=',
  },
});