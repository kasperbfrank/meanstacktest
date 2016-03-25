// (function() {
//     'use strict';
//
//     angular
//         .module('app', [
//             'ngResource',
//             // 'ngRoute'
//         ]);
//
//     angular
//         .module('app')
//         .config(function($routeProvider, $locationProvider) {
//             $locationProvider.html5mode(true);
//             $routeProvider
//                 .when('/', {
//                     templateUrl: '/partials/main.html',
//                     controller: 'Main'
//                 });
//         });
//
//     angular
//         .module('app')
//         .controller('Main', function($scope) {
//             $scope.myVar = 'Hello Angular';
//         });
// })();

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'Main'
            });
    });

angular.module('app')
    .controller('Main', function($scope) {
        $scope.myVar = 'Hello Angular';
    });
