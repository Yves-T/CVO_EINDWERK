angular
    .module('humasol')
    .service('Data', ['$http', function ($http) {

        var getAuthenticatedUser = function (success, error) {
            $http.get('api/authenticate/user').success(success).error(error);
        };

        var refreshToken = function (success, error) {
            $http.get('api/authenticate/refresh').success(success).error(error);
        };

        var getStudents = function (success, error) {
            $http.get('api/student').success(success).error(error);
        };

        var toggleActiveStudent = function (studentId, success, error) {
            $http.put('api/student/active/' + studentId).success(success).error(error);
        };

        var addStudent = function (formData, success, error) {
            $http.post('api/user/', formData).success(success).error(error);
        };

        return {
            getAuthenticatedUser: getAuthenticatedUser,
            refreshToken: refreshToken,
            getStudents: getStudents,
            toggleActiveStudent: toggleActiveStudent,
            addStudent: addStudent
        };
    }]);
