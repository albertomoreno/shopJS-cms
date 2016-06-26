'use strict';


var UpdateProductModalCtrl = function($http, $uibModalInstance, Categories, product, $timeout) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._Categories = Categories;
  this._$timeout = $timeout;

  this.categories = Categories.getChildren();
  
  this._product = product;

  this.data = angular.copy(product);
};


UpdateProductModalCtrl.prototype.submit = function() {
  var that = this;

  this._$http.post('/productos/actualizar', this.data).then(function(res) {

    that._$uibModalInstance.close();
    reloadShop();

  });
};

angular.module('shopApp').component('updateProduct', {
  templateUrl: '/static/scripts/products/update-product.html',
  bindings: {
    product: '=',
  },
  controller: function($uibModal, $q) {
    var that = this;
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/products/update-product-modal.html',
        controller: UpdateProductModalCtrl,
        controllerAs: '$ctrl',
        resolve: {
          'product': $q.resolve(that.product),
        }, 
      });
    }
  },
});
