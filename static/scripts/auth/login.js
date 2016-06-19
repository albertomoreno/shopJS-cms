'use strict';


var LoginModalCtrl = function($http, $uibModalInstance) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;

  this.data = {error: false};
};

LoginModalCtrl.prototype.submit = function() {
  var that = this;
  this._$http.post('/login', this.data).then(function(res) {

    if(res.data.result) {
      window.location.reload();
    } else {
      that.data.error = true;
    }
  });
};


angular.module('shopApp').component('login', {
  templateUrl: '/static/scripts/auth/login.html',
  controller: function($uibModal, $q) {
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/auth/login-modal.html',
        controller: LoginModalCtrl,
        controllerAs: '$ctrl',
      });
    }
  },
});