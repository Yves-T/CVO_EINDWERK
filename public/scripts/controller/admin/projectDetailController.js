(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ProjectDetailController', ProjectDetailController);

    function ProjectDetailController($state, Auth, $stateParams, Data) {

        // if the user is not logged in, throw them back to the login page
        if (!Auth.isAuthenticated()) {
            Auth.clearAuthenticated();
            console.log('redirect');
            $state.go('home', {});
        }

        if (!Auth.isAdminUser()) {
            Auth.clearAuthenticated();
            $state.go('home', {});
        }

        var vm = this;
        vm.project = $stateParams.project;
        if (vm.project) {
            var createdAt = moment(vm.project.created_at);
            vm.createdAt = createdAt.format("DD/MM/YYYY, [om] h:mm:ss a");
            var updatedAt = moment(vm.project.updated_at);
            vm.updatedAt = updatedAt.format("DD/MM/YYYY, [om] h:mm:ss a");
            vm.image = 'api/project/viewFile/' + vm.project.id;
            Data.getStudentsForProject(vm.project.id, function (students) {
                vm.students = students;
            }, function (error) {
                console.log(error);
            });
        }

        vm.goBack = function () {
            $state.go('adminManageProjects', {
                "message": null,
                "error": null
            });
        };
    }
})();
