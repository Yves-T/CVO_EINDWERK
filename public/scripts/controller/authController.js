(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('AuthController', AuthController);

    function AuthController($auth, $state, $rootScope, Data, Auth) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function () {

            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function () {

                Data.getAuthenticatedUser(function (response) {

                    var user = JSON.stringify(response.user);

                    localStorage.setItem('user', user);

                    $rootScope.authenticated = true;

                    $rootScope.currentUser = response.user;

                    // refresh with 30 min interval
                    Auth.startRefreshToken();

                    $state.go('home');
                }, function (err) {
                    console.log("Error when trying to get authenticated user: " + err);
                });

            }, function (error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;
            });
        }
    }
})();
