(function () {

    'use strict';

    angular
        .module('humasol', [
            'ui.router',
            'satellizer',
            'angularUtils.directives.dirPagination',
            'textAngular',
            'ngAnimate',
            'ui.bootstrap',
            'ui.bootstrap.dropdown',
            'mega-menu'

        ])
        .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide) {

            function redirectWhenLoggedOut($q, $injector) {

                return {

                    responseError: function (rejection) {

                        var $state = $injector.get('$state');

                        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                        angular.forEach(rejectionReasons, function (value, key) {

                            if (rejection.data.error === value) {

                                localStorage.removeItem('user');

                                $state.go('auth');
                            }
                        });

                        return $q.reject(rejection);
                    }
                }
            }

            function persistNewToken($q, $injector) {
                return {
                    response: function (response) {
                        var auth = $injector.get('$auth');
                        if (response.headers('Authorization')) {
                            var token = response.headers('Authorization').split(' ')[1];
                            auth.setToken(token);
                        }

                        return response;
                    }
                }
            }

            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
            $provide.factory('persistNewToken', persistNewToken);

            $httpProvider.interceptors.push('redirectWhenLoggedOut');
            $httpProvider.interceptors.push('persistNewToken');

            $authProvider.loginUrl = '/api/authenticate';

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '../views/homeView.html',
                    controller: 'HomeController as home'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: '../views/authView.html',
                    controller: 'AuthController as auth'
                })
                .state('adminManageUsers', {
                    url: '/admin_beheren_van_gebruikers',
                    templateUrl: '../views/admin/manageUsersView.html',
                    controller: 'ManageUsersController as muc'
                })
                .state('adminManageUsersDetail', {
                    url: '/admin_gebruiker_detail',
                    templateUrl: '../views/admin/StudentDetail.html',
                    controller: 'StudentDetailController as sdc',
                    params: {student: null}
                });

        })
        .run(function ($rootScope, $state, $auth, $http, Auth) {


            $rootScope.$on('$stateChangeStart', function (event, toState) {
                var user = JSON.parse(localStorage.getItem('user'));

                if (user) {

                    $rootScope.authenticated = true;

                    $rootScope.currentUser = user;

                    if (toState.name === "auth") {

                        event.preventDefault();

                        Auth.startRefreshToken();

                        $state.go('home');
                    }
                }

            });
        });
})();
