'use strict';


angular.module('shopApp').component('pageContent', {
  templateUrl: '/static/scripts/pages/page-content.html',
  bindings: {
    page: '=',
  },
  transclude: true,
  controller: function($element, $timeout, $http, $uibModal) {
    var data;

    $timeout(function() {
      var editor = CKEDITOR.inline($element.find('div')[0], {
        on: {
          instanceReady: function(event) {
            var instance = event.editor;
            data = instance.getData();
            instance.on('change', function() {
              data = instance.getData();
            });
          },
        },
      });
    });

    this.submit = function() {
      var obj = {content: data};

      $http.post('/pages/update/'+this.page, obj).then(function (res) {
        $uibModal.open({
          templateUrl: '/static/scripts/pages/result-modal.html',
        });
      });
    };

  },
});
