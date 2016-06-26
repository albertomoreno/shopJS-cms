'use strict';


var ShopModalCtrl = function($http, $uibModalInstance, Shop) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._Shop = Shop;

  this.shop = Shop.get();

  this.data = angular.copy(this.shop);
};


ShopModalCtrl.prototype.submit = function() {
  var that = this;
  this._$http.post('/tienda/actualizar', this.data).then(function(res) {
    that._$uibModalInstance.close();

    that._Shop.update(res.data);

    reloadShop();
  });
};

angular.module('shopApp').component('updateShop', {
  templateUrl: '/static/scripts/shop/update-shop.html',
  controller: function($uibModal) {
    var that = this;
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/shop/update-shop-modal.html',
        controller: ShopModalCtrl,
        controllerAs: '$ctrl',
      });
    }
  },
});