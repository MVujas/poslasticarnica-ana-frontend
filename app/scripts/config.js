'use strict';

module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function anaConfig($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/racun/');
    $stateProvider
      .state('racun', {
        url: '/racun/',
        resolve: {
          prihodi: ['anaService',
            function(anaService){
              return anaService.getFunds();
            }
          ],
          troskovi: ['anaService',
            function(anaService){
              return anaService.getCosts();
            }
          ],
          radnici: ['anaService',
            function(anaService){
              return anaService.getWorkers();
            }
          ]
        },
        controller: 'racunController',
        templateUrl: 'views/racun.html',
      })
      .state('radnici', {
        url: '/radnici/',
        resolve: {
          radnici: ['anaService',
            function(anaService){
              return anaService.getWorkers();
            }
          ],
          workerlists: ['anaService',
            function(anaService){
              return anaService.getWorkerLists();
            }
          ]
        },
        controller: 'radniciController',
        templateUrl: 'views/radnici.html',
      })
      .state('troskovi', {
        url: '/troskovi/',
        resolve: {
          costs: ['anaService',
            function(anaService){
              return anaService.getCosts();
            }
          ],
          coststickets: ['anaService',
            function(anaService){
              return anaService.getCostsTicket();
            }
          ],
        },
        controller: 'troskoviController',
        templateUrl: 'views/troskovi.html',
      })
      .state('prihodi', {
        url: '/prihodi/',
        resolve: {
          funds: ['anaService',
            function(anaService){
              return anaService.getFunds();
            }
          ],
          fundstickets: ['anaService',
            function(anaService){
              return anaService.getFundsTicket();
            }
          ],
        },
        controller: 'prihodiController',
        templateUrl: 'views/prihodi.html',
      });
  }
]