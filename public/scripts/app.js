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
            'mega-menu',
            'ngFileUpload',
            'ngSanitize'

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
                .state('activeProjects', {
                    url: '/lopende_projecten',
                    templateUrl: '../views/activeProjectsView.html',
                    controller: 'ActiveProjectsController as apc'
                })
                .state('projectDetail', {
                    url: '/project_detail',
                    templateUrl: '../views/activeProjectDetail.html',
                    controller: 'ActiveProjectDetailController as apd',
                    params: {project: null}
                })
                .state('registerStudent', {
                    url: '/hou_me_op_de_hoogte',
                    templateUrl: '../views/registerStudent.html',
                    controller: 'RegisterStudentController as rsc'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: '../views/authView.html',
                    controller: 'AuthController as auth'
                })
                .state('adminManageUsers', {
                    url: '/admin_beheren_van_gebruikers',
                    templateUrl: '../views/admin/manageUsersView.html',
                    controller: 'ManageUsersController as muc',
                    params: {message: null, error: null}
                })
                .state('adminManageUsersDetail', {
                    url: '/admin_gebruiker_detail',
                    templateUrl: '../views/admin/StudentDetail.html',
                    controller: 'StudentDetailController as sdc',
                    params: {student: null}
                })
                .state('adminManageUserAddStudent', {
                    url: '/admin_gebruiker_voeg_student_toe',
                    templateUrl: '../views/admin/addStudent.html',
                    controller: 'StudentFormController as sfc',
                    params: {student: null}
                })
                .state('adminManageUserConnectStudentToProject', {
                    url: '/admin_gebruiker_verbind_student_met_project',
                    templateUrl: '../views/admin/connectStudentToProject.html',
                    controller: 'StudentToProjectController as stpc'
                })
                .state('adminManageProjects', {
                    url: '/admin_beheer_projecten',
                    templateUrl: '../views/admin/manageProjects.html',
                    controller: 'ManageProjectController as mpc',
                    params: {message: null, error: null}
                })
                .state('adminCreateUpdateProject', {
                    url: '/admin_project_formulier',
                    templateUrl: '../views/admin/projectsForm.html',
                    controller: 'ProjectFormController as pfc',
                    params: {project: null}
                })
                .state('adminProjectDetail', {
                    url: '/admin_project_detail',
                    templateUrl: '../views/admin/projectsDetail.html',
                    controller: 'ProjectDetailController as pdc',
                    params: {project: null}
                })
                .state('studentManageBlogPosts', {
                    url: '/student_beheer_blog_posts',
                    templateUrl: '../views/student/manageBlogPosts.html',
                    controller: 'ManageBlogPostController as mbpc',
                    params: {message: null, error: null}
                })
                .state('studentBlogPost', {
                    url: '/student_blog_post_formulier',
                    templateUrl: '../views/student/blogPostForm.html',
                    controller: 'BlogPostFormController as bpfc',
                    params: {post: null}
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
