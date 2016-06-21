'use strict';


var CategoryModalCtrl = function($http, $uibModalInstance, Categories, category) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._Categories = Categories;

  this.categories = Categories.get();
  this._category = category;

  this.data = angular.copy(category);
};


CategoryModalCtrl.prototype.submit = function() {
  var that = this;
  this._$http.post('/actualizar-categoria', this.data).then(function(res) {
    that._$uibModalInstance.close();

    that._Categories.replace(that._category, res.data);

    reloadShop();
  });
};

angular.module('shopApp').component('updateCategory', {
  templateUrl: '/static/scripts/categories/update-category.html',
  bindings: {
    category: '=',
  },
  controller: function($uibModal, $q) {
    var that = this;
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/categories/update-category-modal.html',
        controller: CategoryModalCtrl,
        controllerAs: '$ctrl',
        resolve: {
          'category': $q.resolve(that.category),
        },
      });
    }
  },
});