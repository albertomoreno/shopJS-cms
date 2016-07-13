'use strict';


var PageModalCtrl = function($http, $uibModalInstance, ReloadShop) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._ReloadShop = ReloadShop;

  this.data = {};
};


PageModalCtrl.prototype.submit = function() {
  var that = this;
  this._$http.post('/pages/create', this.data).then(function(res) {
    that._$uibModalInstance.close();

    that._ReloadShop.run();
  });
};


angular.module('shopApp').component('addPage', {
  templateUrl: '/static/scripts/pages/add-page.html',
  controller: function($uibModal) {
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/pages/add-page-modal.html',
        controller: PageModalCtrl,
        controllerAs: '$ctrl',
      });
    }
  },
});