'use strict';


angular.module('shopApp').directive('unique', function($http, $q, $timeout) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      var pendingValidation;
      ngModel.$asyncValidators.unique = function(modelValue, viewValue) {
        if(pendingValidation)  {
          $timeout.cancel(pendingValidation);
        }

        pendingValidation = $timeout(function() {
          pendingValidation = null;

          return $http.post(attrs.unique, {value: viewValue})
            .then(function(response) {
              if(!response.data.unique) {
                return $q.reject(false);
              }
              return true;
            });
        }, 500);

        return pendingValidation;
      };
    },
  };
});