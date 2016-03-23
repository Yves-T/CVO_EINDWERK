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
            $http.post('api/createUser', formData).success(success).error(error);
        };

        var updateStudent = function (id, formData, success, error) {
            $http.put('api/student/' + id, formData).success(success).error(error);
        };

        var getActiveProjects = function (success, error) {
            $http.get('api/project/').success(success).error(error);
        };

        var getAllProjects = function (success, error) {
            $http.get('api/project/all').success(success).error(error);
        };

        var toggleActiveProject = function (projectId, success, error) {
            $http.put('api/project/active/' + projectId).success(success).error(error);
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

        var updatePost = function (postId, formData, success, error) {
            $http.put('api/post/' + postId, formData).success(success).error(error);
        };

        var getRecententPostTeasers = function (success, error) {
            $http.get('api/post/recent').success(success).error(error);
        };

        var deletePost = function (postId, success, error) {
            $http.delete('api/post/' + postId).success(success).error(error);
        };

        var getTechnologies = function (success, error) {
            $http.get('api/technology/').success(success).error(error);
        };

        var getSponsors = function (success, error) {
            $http.get('api/sponsor/').success(success).error(error);
        };

        var updateProject = function (id, data, success, error) {
            $http.put('api/project/update/' + id, data).success(success).error(error);
        };

        var createProject = function (data, success, error) {
            $http.post('api/project/create', data).success(success).error(error);
        };

        var getStudentsForProject = function (id, success, error) {
            $http.get('api/project/' + id + '/student').success(success).error(error);
        };

        var getBlogPostsForProject = function (id, success, error) {
            $http.get('api/project/' + id + '/postTeasers').success(success).error(error);
        };

        var getCommentsForPost = function (id, success, error) {
            $http.get('api/post/' + id + '/comments').success(success).error(error);
        };

        return {
            getAuthenticatedUser: getAuthenticatedUser,
            refreshToken: refreshToken,
            getStudents: getStudents,
            toggleActiveStudent: toggleActiveStudent,
            addStudent: addStudent,
            updateStudent: updateStudent,
            getActiveProjects: getActiveProjects,
            getAllProjects: getAllProjects,
            toggleActiveProject: toggleActiveProject,
            connectStudentToProject: connectStudentToProject,
            disconnectStudentToProject: disconnectStudentToProject,
            getPostsForStudent: getPostsForStudent,
            addPostForStudent: addPostForStudent,
            updatePost: updatePost,
            getRecententPostTeasers: getRecententPostTeasers,
            deletePost: deletePost,
            getTechnologies: getTechnologies,
            getSponsors: getSponsors,
            updateProject: updateProject,
            createProject: createProject,
            getStudentsForProject: getStudentsForProject,
            getBlogPostsForProject: getBlogPostsForProject,
            getCommentsForPost: getCommentsForPost
        };
    }]);
