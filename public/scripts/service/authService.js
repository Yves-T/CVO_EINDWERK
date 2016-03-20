angular
    .module('humasol')
    .service('Auth', [
        '$auth',
        '$window',
        '$rootScope',
        'Data',
        '$state'
        , function ($auth, $window, $rootScope, Data, $state) {

        function refreshToken() {
            Data.refreshToken(function () {
                console.log('token refreshed');
            }, function (error) {
                console.log(error);
                clearAuthenticated();
                $rootScope.authenticated = false;
                $rootScope.currentUser = null;
                $state.go('auth', {});
            });
        }

        var startRefreshToken = function () {
            // refresh with 30 min interval
            $rootScope.refreshHandler = setInterval(refreshToken, 30 * 60 * 1000);
        };

        var isAuthenticated = function () {
            return $auth.isAuthenticated();
        };

        var clearAuthenticated = function () {
            $window.localStorage.removeItem('user');
        };

        var logOut = function (success) {
            $auth.logout().then((function () {
                clearAuthenticated();

                $rootScope.authenticated = false;

                $rootScope.currentUser = null;

                success();
            }));
        };

        var currentUser = function () {
            var user = JSON.parse(localStorage.getItem('user'));
            return user;
        };

        return {
            startRefreshToken: startRefreshToken,
            isAuthenticated: isAuthenticated,
            clearAuthenticated: clearAuthenticated,
            logout: logOut,
            currentUser: currentUser
        };

    }]);
