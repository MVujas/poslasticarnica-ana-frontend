'use strict'

module.exports = [
  '$scope',
  'costs',
  'coststickets',
  'anaService',
  '$window',
  function($scope, costs, coststickets, anaService, $window){
  	$scope.costs = costs.data;
  	$scope.coststickets = coststickets.data;
  	$scope.curEditing = 0;
  	
  	$scope.showCL = function() {
  	  $("#showCLButton").addClass("hidden");
  	  $("#hideCLButton").removeClass("hidden");
  	  $("#costsList").removeClass("hidden");
  	}
  	
  	$scope.hideCL = function() {
  	  $("#showCLButton").removeClass("hidden");
  	  $("#hideCLButton").addClass("hidden");
  	  $("#costsList").addClass("hidden");
  	}
  	
  	$scope.addCT = function() {
  	  $scope.closeRest();
  	  $("#addCTButton").addClass("hidden");
  	  $("#CostTicketAddForm").removeClass("hidden");
  	}
  	
  	$scope.removeCT = function() {
  	  $("#addCTButton").removeClass("hidden");
  	  $("#CostTicketAddForm").addClass("hidden");
  	}
  	
  	$scope.addC = function() {
  	  $scope.closeRest();
  	  $("#addCButton").addClass("hidden");
  	  $("#CostAddForm").removeClass("hidden");
  	}
  	
  	$scope.removeC = function() {
  	  $("#addCButton").removeClass("hidden");
  	  $("#CostAddForm").addClass("hidden");
  	}
  	
  	$scope.createCostsTicket = function() {
  	  $scope.addCostsTicket.money = parseInt($scope.money);
  	 
  	  var i;
  	  for(i=0; i<$scope.costs.length; i++)
        if($scope.costs[i].id == $scope.addCostsTicket.costs)
          break;
  	  $scope.costs[i].money += $scope.addCostsTicket.money;
  	  
  	  anaService.createCostsTicket($scope.addCostsTicket);
  	  anaService.changeCost($scope.costs[i]).then(function(){
        $window.location.reload();
      })
  	}
  	
  	$scope.createCost = function() {
  	  anaService.createCost($scope.addCost).then(function(){
        $window.location.reload();
      })
  	}
  	$scope.editCostsTicket = function(id) {
  	  $scope.closeRest();
    	if($scope.curEditing != 0){
    		$scope.removeEditCT();
    	}
    	$scope.curEditing = id;
    	var i = 0;
    	while($scope.coststickets[i].id != id)
    		i++;
    	$scope.editedCT = JSON.parse(JSON.stringify($scope.coststickets[i]));
    	$scope.editedCT.C = $scope.editedCT.costs;
    	$scope.editedCT.cena = $scope.editedCT.money;
	    $("#CostTicketChangeForm").removeClass("hidden");
	    $("#edited-sign-" + id).removeClass("hidden");
	    $("#edit-button-" + id).addClass("hidden");
	    $("#deleted-button-" + id).addClass("hidden");
  	}
  	$scope.removeEditCT = function(){	
    	$("#CostTicketChangeForm").addClass("hidden");
	    $("#edited-sign-" + $scope.curEditing).addClass("hidden");
	    $("#edit-button-" + $scope.curEditing).removeClass("hidden");
	    $("#deleted-button-" + $scope.curEditing).removeClass("hidden");
	    $scope.curEditing = 0;
    }
    $scope.changeCostsTicket = function(){
      $scope.editedCT.firstcost = $scope.editedCT.costs;
      $scope.editedCT.firstprice = $scope.editedCT.money;
      $scope.editedCT.money = parseInt($scope.editedCT.cena);
      $scope.editedCT.costs = parseInt($scope.editedCT.C);
      var i = 0, j = 0;
      while($scope.editedCT.firstcost != $scope.costs[i].id)
        i++;
      while($scope.editedCT.costs != $scope.costs[j].id)
        j++;
      $scope.costs[i].money -= $scope.editedCT.firstprice;
      $scope.costs[j].money += $scope.editedCT.money;
      anaService.changeCost($scope.costs[i]);
      anaService.changeCost($scope.costs[j]);
      anaService.changeCostsTicket($scope.editedCT).then(function(){
        $window.location.reload();
      })
    }
  	$scope.closeRest = function() {
    	$scope.removeC();
    	$scope.removeCT();
    	$scope.removeEditCT();
    }
    $scope.deleteCostsTicket = function(id) {
      var i = 0, j = 0;
      while($scope.coststickets[i].id != id)
        i++;
      while($scope.costs[j].id != $scope.coststickets[i].costs)
        j++;
      $scope.costs[j].money -= $scope.coststickets[i].money;
      
      
      anaService.changeCost($scope.costs[j]);
      anaService.deleteCostsTicket(id).then(function(){
        $window.location.reload();
      })
    }
  }
];