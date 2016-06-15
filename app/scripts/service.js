'use strict'

module.exports = [
  'API_URL',
  '$http',
  function(API_URL, $http) {
    function getWorker(id) {
      return $http.get(API_URL + 'Worker/' + id);
    }

    function getCosts() {
      return $http.get(API_URL + 'Costs/');
    }
    function getFunds() {
      return $http.get(API_URL + 'Funds/');
    }
    function getCostsTicket() {
      return $http.get(API_URL + 'CostsTicket/');
    }
    function getFundsTicket() {
      return $http.get(API_URL + 'FundsTicket/');
    }
    
    function getWorkers() {
      return $http.get(API_URL + 'Worker/');
    }

     function getWorkerLists() {
      return $http.get(API_URL + 'WorkerList/');
    }

    function getWorkerList(id) {
      return $http.get(API_URL + 'WorkerList/' + id);
    }

    function deleteWorker(workerId){
      return $http.delete(API_URL + 'Worker/' + workerId + '/');
    }

    function createWorker(worker){
      return $http.post(
        API_URL + 'Worker/',
        {
          name: worker.name,
          surname: worker.surname,
          status: worker.status,
          pay: worker.pay,
          workerlist: worker.workerList,
        });
    }

    function createCostsTicket(CT){
      return $http.post(
        API_URL + 'CostsTicket/',
        {
          name: CT.name,
          money: CT.money,
          costs: CT.costs,
        });
    }
    
    function createCost(C){
      return $http.post(
        API_URL + 'Costs/',
        {
          name: C.name,
        });
    }
    
    function changeCost(C){
      return $http.put(
        API_URL + 'Costs/' + C.id + '/',
        {
          name: C.name,
          money: C.money,
        });
    }
    
    function createFundsTicket(FT){
      return $http.post(
        API_URL + 'FundsTicket/',
        {
          name: FT.name,
          money: FT.money,
          funds: FT.funds,
        });
    }
    
    function createFund(F){
      return $http.post(
        API_URL + 'Funds/',
        {
          name: F.name,
        });
    }
    
    function changeFund(F){
      return $http.put(
        API_URL + 'Funds/' + F.id + '/',
        {
          name: F.name,
          money: F.money,
        });
    }
    
    function changeWorker(worker){
      return $http.put(
        API_URL + 'Worker/' + worker.id + '/',
        {
          name: worker.name,
          surname: worker.surname,
          status: worker.status,
          pay: worker.pay,
          workerlist: worker.workerlist,
        });
    }
    
    function changeCostsTicket(CT){
      return $http.put(
        API_URL + 'CostsTicket/' + CT.id + '/',
        {
          name: CT.name,
          money: CT.money,
          costs: CT.costs,
        });
    }
    
    function changeFundsTicket(FT){
      return $http.put(
        API_URL + 'FundsTicket/' + FT.id + '/',
        {
          name: FT.name,
          money: FT.money,
          funds: FT.funds,
        });
    }

    function createWorkerList(workerList){
      return $http.post(
        API_URL + 'WorkerList/',
        {
          name: workerList.name,
        });
    }
    
    function deleteCostsTicket(CostsTicketid) {
      return $http.delete(API_URL + 'CostsTicket/' + CostsTicketid + '/');
    }
    
    function deleteFundsTicket(FundsTicketid) {
      return $http.delete(API_URL + 'FundsTicket/' + FundsTicketid + '/');
    }

    return {
      changeFundsTicket: changeFundsTicket,
      createFund: createFund,
      changeFund: changeFund,
      createFundsTicket: createFundsTicket,
      changeCostsTicket: changeCostsTicket,
      createCost: createCost,
      changeCost: changeCost,
      createCostsTicket: createCostsTicket,
      getFunds: getFunds,
      getCosts: getCosts,
      getCostsTicket: getCostsTicket,
      getFundsTicket: getFundsTicket,
      changeWorker: changeWorker,
      getWorker: getWorker,
      getWorkers: getWorkers,
      getWorkerLists: getWorkerLists,
      getWorkerList: getWorkerList,
      createWorker: createWorker,
      createWorkerList: createWorkerList,
      deleteWorker: deleteWorker,
      deleteCostsTicket: deleteCostsTicket,
      deleteFundsTicket: deleteFundsTicket,
    }
  }
];