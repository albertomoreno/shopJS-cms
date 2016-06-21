'use strict';


var ModalCtrl = function($http, $uibModalInstance, Categories) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._Categories = Categories;

  this.categories = Categories.get();

  this.data = {
    parent: '', 
    published: true
  };
};


ModalCtrl.prototype.submit = function() {
  var that = this;
  this._$http.post('/crear-categoria', this.data).then(function(res) {
    that._$uibModalInstance.close();

    that._Categories.add(res.data);

    reloadShop();
  });
};


angular.module('shopApp').component('addCategory', {
  templateUrl: '/static/scripts/categories/add-category.html',
  controller: function($uibModal, $q) {
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/categories/add-category-modal.html',
        controller: ModalCtrl,
        controllerAs: '$ctrl',
      });
    }
  },
});
