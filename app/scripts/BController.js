'use strict'

module.exports = [
  '$scope',
  'prihodi',
  'troskovi',
  'radnici',
  'anaService',
  '$window',
  function($scope, prihodi, troskovi, radnici, anaService, $window){
  	$scope.prihodi = prihodi.data;
  	$scope.troskovi = troskovi.data;
  	$scope.radnici = radnici.data;
  	$scope.final = 0;
  	$scope.plate = 0;
  	
  	var i;
  	for(i=0; i<$scope.prihodi.length; i++)
  	  $scope.final += $scope.prihodi[i].money;
  	for(i=0; i<$scope.troskovi.length; i++)
  	  $scope.final -= $scope.troskovi[i].money;
  	for(i=0; i<$scope.radnici.length; i++)
  	  if($scope.radnici[i].status == "Active")
  	    $scope.plate += $scope.radnici[i].pay;
  	$scope.final -= $scope.plate;
  }
];