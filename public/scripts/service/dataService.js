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

        var updateStudent = function (id, formData, success, error) {
            $http.put('api/student/' + id, formData).success(success).error(error);
        };

        var getActiveProjects = function (success, error) {
            $http.get('api/project/').success(success).error(error);
        };

        var connectStudentToProject = function (studentId, projectId, success, error) {
            $http.put('api/student/' + studentId + '/connecProject/' + projectId).success(success).error(error);
        };

        var disconnectStudentToProject = function (studentId, success, error) {
            $http.put('api/student/' + studentId + '/disconnectProject').success(success).error(error);
        };

        var getPostsForStudent = function (studentId, success, error) {
            $http.get('api/student/' + studentId + '/posts').success(success).error(error);
        };

        var addPostForStudent = function (userId, formData, success, error) {
            $http.post('api/student/' + userId + '/post', formData).success(success).error(error);
        };

        return {
            getAuthenticatedUser: getAuthenticatedUser,
            refreshToken: refreshToken,
            getStudents: getStudents,
            toggleActiveStudent: toggleActiveStudent,
            addStudent: addStudent,
            updateStudent: updateStudent,
            getActiveProjects: getActiveProjects,
            connectStudentToProject: connectStudentToProject,
            disconnectStudentToProject: disconnectStudentToProject,
            getPostsForStudent: getPostsForStudent,
            addPostForStudent: addPostForStudent
        };
    }]);
