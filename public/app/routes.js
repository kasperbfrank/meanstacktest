(function() {
    'use strict';

    angular
        .module('app')
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/main/main',
                    controller: 'Main',
                    controllerAs: 'vm'
                })
                .when('/admin/users', {
                    templateUrl: 'partials/admin/user-list',
                    controller: 'UserList',
                    controllerAs: 'vm',
                    resolve: {
                        authenticate: function(identity, $location) {
                            if (identity.isAdmin()) {
                                return true;
                            } else {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/profile', {
                    templateUrl: 'partials/account/profile',
                    controller: 'Profile',
                    controllerAs: 'vm',
                    resolve: {
                        authenticate: function(identity, $location) {
                            if (identity.isAuthenticated()) {
                                if (identity.isAdmin()) {
                                    $location.path('/');
                                }
                                return true;
                            } else {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/courses', {
                    templateUrl: 'partials/courses/course-list',
                    controller: 'CourseList',
                    controllerAs: 'vm'
                })
                .when('/courses/:id', {
                    templateUrl: 'partials/courses/course-details',
                    controller: 'CourseDetails',
                    controllerAs: 'vm'
                })
                .when('/signup', {
                    templateUrl: 'partials/account/signup',
                    controller: 'Signup',
                    controllerAs: 'vm'
                });
        });

})();
