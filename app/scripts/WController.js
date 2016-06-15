'use strict'

module.exports = [
  '$scope',
  'radnici',
  'workerlists',
  'anaService',
  '$window',
  function($scope, radnici, workerlists, anaService, $window){
  	$scope.workerlists = workerlists.data;
    $scope.radnici = radnici.data;
    $scope.curEditing = 0;
    
    $scope.showInactive = function(){
    	$("#showInactive").addClass("hidden");
    	$("#hideInactive").removeClass("hidden");
    	$("#inactive").removeClass("hidden");
  	}
  	$scope.hideInactive = function(){
    	$("#showInactive").removeClass("hidden");
    	$("#hideInactive").addClass("hidden");
    	$("#inactive").addClass("hidden");
  	}
    $scope.addW = function(){
    	$scope.closeRest();
    	$("#workerAddForm").removeClass("hidden");
    	$("#addWButton").addClass("hidden");
    }
    $scope.removeW = function(){
    	$("#workerAddForm").addClass("hidden");
    	$("#addWButton").removeClass("hidden");
    }
    $scope.addWL = function(){
    	$scope.closeRest();
    	$("#workerListAddForm").removeClass("hidden");
    	$("#addWLButton").addClass("hidden");
    }
    $scope.removeWL = function(){
    	$("#workerListAddForm").addClass("hidden");
    	$("#addWLButton").removeClass("hidden");
    }
    $scope.editW = function(id){
    	$scope.closeRest();
    	if($scope.curEditing != 0){
    		$scope.removeEditW();
    	}
    	$scope.curEditing = id;
    	var i = 0;
    	while($scope.radnici[i].id != id)
    		i++;
    	$scope.editedWorker = JSON.parse(JSON.stringify($scope.radnici[i]));
    	$scope.editedWorker.wl = $scope.editedWorker.workerlist;
    	$scope.editedWorker.plata = $scope.editedWorker.pay;
	    $("#workerEditForm").removeClass("hidden");
	    $("#edited-sign-" + id).removeClass("hidden");
	    $("#edit-button-" + id).addClass("hidden");
	    $("#suspend-button-" + id).addClass("hidden");
    }
    $scope.removeEditW = function(){	
    	$("#workerEditForm").addClass("hidden");
	    $("#edited-sign-" + $scope.curEditing).addClass("hidden");
	    $("#edit-button-" + $scope.curEditing).removeClass("hidden");
	    $("#suspend-button-" + $scope.curEditing).removeClass("hidden");
	    $scope.curEditing = 0;
    }
    $scope.createWorker = function(){
      $scope.addWorker.status = 'Active';
      $scope.addWorker.pay = parseInt($scope.addWorker.plata);
      anaService.createWorker($scope.addWorker).then(function(){
        $window.location.reload();
      })
    }
    $scope.changeWorker = function(){
      $scope.editedWorker.pay = parseInt($scope.editedWorker.plata);
      $scope.editedWorker.workerlist = parseInt($scope.editedWorker.wl);
      anaService.changeWorker($scope.editedWorker).then(function(){
        $window.location.reload();
      })
    }
    $scope.deleteWorker = function(id){
      anaService.deleteWorker(id).then(function(){
        $window.location.reload();
      })
    }
    $scope.createWorkerList = function(){
      anaService.createWorkerList($scope.addWorkerList).then(function(){
        $window.location.reload();
      })
    }
    $scope.createWorkerList = function(){
      anaService.createWorkerList($scope.addWorkerList).then(function(){
        $window.location.reload();
      })
    }
    $scope.closeRest = function() {
    	$scope.removeW();
    	$scope.removeWL();
    	$scope.removeEditW();
    }
  }
];