'use strict';


var CategoryModalCtrl = function($http, $uibModalInstance, Categories) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._Categories = Categories;

  this.categories = Categories.get();

  this.data = {};
};


CategoryModalCtrl.prototype.submit = function() {
  /*var that = this;
  this._$http.post('/crear-categoria', this.data).then(function(res) {
    that._$uibModalInstance.close();

    reloadShop();
  });*/
};

CategoryModalCtrl.prototype.get = function($http, id) {
  var that = this;
  return $http.post('/category/get', {id: id}).then(function(res) {
    that.data = res.data.category;
  });
};


angular.module('shopApp').component('updateCategory', {
  templateUrl: '/static/scripts/categories/update-category.html',
  bindings: {
    category: '=',
  },
  controller: function($http, $uibModal) {
    this.show = function() {
      $http.post('/category/get', {id: this.category._id}).then(function(res) {
        CategoryModalCtrl.prototype.data = res.data.category;

        $uibModal.open({
          templateUrl: '/static/scripts/categories/update-category-modal.html',
          controller: CategoryModalCtrl,
          controllerAs: '$ctrl',
        });
      });

      /*CategoryModalCtrl.prototype.get($http, this.category._id).then(function() {
        $uibModal.open({
          templateUrl: '/static/scripts/categories/update-category-modal.html',
          controller: CategoryModalCtrl,
          controllerAs: '$ctrl',
        });
      });*/
    }
  },
});