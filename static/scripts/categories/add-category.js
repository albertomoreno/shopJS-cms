'use strict';


var ModalCtrl = function($http, $uibModalInstance) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;

  this.data = {};
  // published: true
};


ModalCtrl.prototype.submit = function() {
  var that = this;
  this._$http.post('/crear-categoria', this.data).then(function(res) {
    that._$uibModalInstance.close();
    reloadShop();
  });
};


angular.module('shopApp').component('addCategory', {
  templateUrl: '/static/scripts/categories/add-category.html',
  bindings: {
    categories: '=',
  },
  controller: function($uibModal, $scope) {
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/categories/add-category-modal.html',
        controller: ModalCtrl,
        controllerAs: '$ctrl',
      });
    }
  },
});