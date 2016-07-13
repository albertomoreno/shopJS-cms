'use strict';


var ServiceModalCtrl = function($http, $uibModalInstance, service, ReloadShop) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._service = service;
  this._ReloadShop = ReloadShop;

  this.icons = [
    'fa-instagram',
    'fa-car',
    'fa-bus',
    'fa-calendar',
    'fa-camera',
    'fa-check',
    'fa-child',
    'fa-clock-o',
    'fa-coffee',
    'fa-info',
    'fa-lock',
    'fa-mobile',
    'fa-recycle',
    'fa-shopping-bag',
    'fa-tablet',
    'fa-taxi',
    'fa-television',
    'fa-video-camera',
    'fa-wifi',
    'fa-wheelchair',
    'fa-credit-card',
    'fa-money',
    'fa-cc-paypal',
  ];

  this.data = angular.copy(service);

};


ServiceModalCtrl.prototype.submit = function() {
  var that = this;

  this._$http.post('/servicio/actualizar/' + this.data.position, this.data).then(function(res) {
    that._$uibModalInstance.close();

    that._ReloadShop.run();
  });

};

angular.module('shopApp').component('updateService', {
  templateUrl: '/static/scripts/modules/carousel-image.html',
  bindings: {
    service: '=',
  },
  controller: function($uibModal, $q) {
    var that = this;
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/modules/update-service-modal.html',
        controller: ServiceModalCtrl,
        controllerAs: '$ctrl',
        resolve: {
          'service': $q.resolve(that.service),
        }, 
      });
    }
  },
});