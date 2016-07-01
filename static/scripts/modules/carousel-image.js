'use strict';


var CarouselModalCtrl = function($http, $uibModalInstance, $timeout, position) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._$timeout = $timeout;
  this._position = position;

  this.data = {};
};


CarouselModalCtrl.prototype.submit = function() {
  var that = this;

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      that._$timeout(function () {
        that._$uibModalInstance.close();
        location.reload();
      });
    }
  };
  xhr.open('POST', '/carousel/subir-imagen/' + that._position);
  xhr.send(that.image);
};

angular.module('shopApp').component('carouselImage', {
  templateUrl: '/static/scripts/modules/carousel-image.html',
  bindings: {
    position: '=',
  },
  controller: function($uibModal, $q) {
    var that = this;
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/modules/carousel-image-modal.html',
        controller: CarouselModalCtrl,
        controllerAs: '$ctrl',
        resolve: {
          'position': $q.resolve(that.position),
        }, 
      });
    }
  },
});

angular.module('shopApp').component('carouselUpload', {
  templateUrl: 'static/scripts/modules/carousel-upload.html',
  require: {
    ngModelCtrl: 'ngModel',
  },
  controller: function($element, $timeout) {
    var that = this;
    $element.find('input[type="file"]').on('change', function(e) {
      $timeout(function () {
        that.ngModelCtrl.$setViewValue(e.target.files[0]);
      });
    });

    this.$onInit = function() {
      that.ngModelCtrl.$validators.required = function(modelValue, viewValue) {
        return !!(modelValue || viewValue);
      };
    };
  },
});