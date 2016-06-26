'use strict';


angular.module('shopApp').component('contactForm', {
  templateUrl: '/static/scripts/shop/contact-form.html',
  controller: function($http, $uibModal) {
    var that = this;
    this.submit = function() {
      $http.post('/contacto', that.data).then(function (res) {
        $uibModal.open({
          templateUrl: '/static/scripts/shop/result-contact-modal.html',
        });
      });
    }
  },
});