'use strict';

angular.module('egarsalApp', ['ui.router','ngResource','ngDialog', 'lbServices'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the sales page
            .state('app.sales', {
                url: 'items',
                views: {
                    'content@': {
                        templateUrl : 'views/sales.html',
                        controller  : 'SalesController'
                    }
                }
            })

            // route for the itemdetail page
            .state('app.itemdetails', {
                url: 'items/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/itemdetail.html',
                        controller  : 'ItemDetailController'
                   }
                }
            })
        
            // route for the itemdetail page
            .state('app.favorites', {
                url: 'favorites',
                views: {
                    'content@': {
                        templateUrl : 'views/favorites.html',
                        controller  : 'FavoriteController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
