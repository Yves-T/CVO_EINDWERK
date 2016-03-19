angular
    .module('humasol')
    .service('Data', ['$http', function ($http) {

        var getAuthenticatedUser = function (success, error) {
            $http.get('api/authenticate/user').success(success).error(error);
        };

        var refreshToken = function (success, error) {
            $http.get('api/authenticate/refresh').success(success).error(error);
        };

        return {
            getAuthenticatedUser: getAuthenticatedUser,
            refreshToken: refreshToken
        };
    }]);
