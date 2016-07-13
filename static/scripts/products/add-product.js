'use strict';


var ProductModalCtrl = function($http, $uibModalInstance, Categories, $timeout, ReloadShop) {
  this._$http = $http;
  this._$uibModalInstance = $uibModalInstance;
  this._Categories = Categories;
  this._ReloadShop = ReloadShop;
  this._$timeout = $timeout;

  this.categories = Categories.getChildren();

  this.data = {
    published: true
  };
};


ProductModalCtrl.prototype.submit = function() {
  var that = this;

  this._$http.post('/productos/crear', this.data).then(function(res) {

    var product_id = res.data.product;

    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (this.status === 200) {
        that._$timeout(function () {
          that._$uibModalInstance.close();
          that._ReloadShop.run();     
        });
      }
    };
    xhr.open('POST', '/productos/subir-imagen/' + product_id);
    xhr.send(that.image);

  });
};

angular.module('shopApp').component('addProduct', {
  templateUrl: '/static/scripts/products/add-product.html',
  controller: function($uibModal) {
    this.show = function() {
      $uibModal.open({
        templateUrl: '/static/scripts/products/add-product-modal.html',
        controller: ProductModalCtrl,
        controllerAs: '$ctrl',
      });
    }
  },
});


angular.module('shopApp').component('uploadImg', {
  templateUrl: 'static/scripts/products/upload-img.html',
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