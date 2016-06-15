'use strict'

require('angular');

angular.module('ana', [
  require('angular-ui-router'),
])
  .config(require('./config.js'))
  .service('anaService', require('./service.js'))
  .controller('racunController', require('./BController.js'))
  .controller('radniciController', require('./WController.js'))
  .controller('troskoviController', require('./CController.js'))
  .controller('prihodiController', require('./FController.js'))
  .controller('navBarController', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    }
  }])
  .constant('API_URL', 'https://api-mvujas.c9users.io/api/v0/');

