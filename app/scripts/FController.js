'use strict'

module.exports = [
  '$scope',
  'funds',
  'fundstickets',
  'anaService',
  '$window',
  function($scope, funds, fundstickets, anaService, $window){
  	$scope.funds = funds.data;
  	$scope.fundstickets = fundstickets.data;
  	$scope.curEditing = 0;
  	
  	$scope.showFL = function() {
  	  $("#showFLButton").addClass("hidden");
  	  $("#hideFLButton").removeClass("hidden");
  	  $("#fundsList").removeClass("hidden");
  	}
  	
  	$scope.hideFL = function() {
  	  $("#showFLButton").removeClass("hidden");
  	  $("#hideFLButton").addClass("hidden");
  	  $("#fundsList").addClass("hidden");
  	}
  	
  	$scope.addFT = function() {
  	  $scope.closeRest();
  	  $("#addFTButton").addClass("hidden");
  	  $("#FundTicketAddForm").removeClass("hidden");
  	}
  	
  	$scope.removeFT = function() {
  	  $("#addFTButton").removeClass("hidden");
  	  $("#FundTicketAddForm").addClass("hidden");
  	}
  	
  	$scope.addF = function() {
  	  $scope.closeRest();
  	  $("#addFButton").addClass("hidden");
  	  $("#FundAddForm").removeClass("hidden");
  	}
  	
  	$scope.removeF = function() {
  	  $("#addFButton").removeClass("hidden");
  	  $("#FundAddForm").addClass("hidden");
  	}
  	
  	$scope.createFundsTicket = function() {
  	  $scope.addFundsTicket.money = parseInt($scope.money);
  	 
  	  var i;
  	  for(i=0; i<$scope.funds.length; i++){
        console.log($scope.funds[i].id + "==" + $scope.addFundsTicket.funds)
        if($scope.funds[i].id == $scope.addFundsTicket.funds)
          break;
  	  }
          
      console.log($scope.funds[i].money);
  	  $scope.funds[i].money += $scope.addFundsTicket.money;
  	  
  	  anaService.createFundsTicket($scope.addFundsTicket);
  	  anaService.changeFund($scope.funds[i]).then(function(){
        $window.location.reload();
      })
  	}
  
  	$scope.createFund = function() {
  	  anaService.createFund($scope.addFund).then(function(){
        $window.location.reload();
      })
  	}

  	$scope.editFundsTicket = function(id) {
  	  $scope.closeRest();
    	if($scope.curEditing != 0){
    		$scope.removeEditCT();
    	}
    	$scope.curEditing = id;
    	var i = 0;
    	while($scope.fundstickets[i].id != id)
    		i++;
    	$scope.editedFT = JSON.parse(JSON.stringify($scope.fundstickets[i]));
    	$scope.editedFT.F = $scope.editedFT.funds;
    	$scope.editedFT.cena = $scope.editedFT.money;
	    $("#FundTicketChangeForm").removeClass("hidden");
	    $("#edited-sign-" + id).removeClass("hidden");
	    $("#edit-button-" + id).addClass("hidden");
	    $("#deleted-button-" + id).addClass("hidden");
  	}
  	/////////////////////////
  	$scope.removeEditFT = function(){	
    	$("#FundTicketChangeForm").addClass("hidden");
	    $("#edited-sign-" + $scope.curEditing).addClass("hidden");
	    $("#edit-button-" + $scope.curEditing).removeClass("hidden");
	    $("#deleted-button-" + $scope.curEditing).removeClass("hidden");
	    $scope.curEditing = 0;
    }
    $scope.changeFundsTicket = function(){
      $scope.editedFT.firstfund = $scope.editedFT.funds;
      $scope.editedFT.firstprice = $scope.editedFT.money;
      $scope.editedFT.money = parseInt($scope.editedFT.cena);
      $scope.editedFT.funds = parseInt($scope.editedFT.F);
      var i = 0, j = 0;
      while($scope.editedFT.firstfund != $scope.funds[i].id)
        i++;
      while($scope.editedFT.funds != $scope.funds[j].id)
        j++;
      $scope.funds[i].money -= $scope.editedFT.firstprice;
      $scope.funds[j].money += $scope.editedFT.money;
      anaService.changeFund($scope.funds[i]);
      anaService.changeFund($scope.funds[j]);
      anaService.changeFundsTicket($scope.editedFT).then(function(){
        $window.location.reload();
      })
    }
  	$scope.closeRest = function() {
    	$scope.removeF();
    	$scope.removeFT();
    	$scope.removeEditFT();
    }
    $scope.deleteFundsTicket = function(id) {
      var i = 0, j = 0;
      while($scope.fundstickets[i].id != id)
        i++;
      while($scope.funds[j].id != $scope.fundstickets[i].funds)
        j++;
      $scope.funds[j].money -= $scope.fundstickets[i].money;
      
      
      anaService.changeFund($scope.funds[j]);
      anaService.deleteFundsTicket(id).then(function(){
        $window.location.reload();
      })
    }
  }
];