(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ManageProjectController', ManageProjectsController);

    function ManageProjectsController($state, Data, Auth, $stateParams) {

        // if the user is not logged in, throw them back to the login page
        if (!Auth.isAuthenticated()) {
            Auth.clearAuthenticated();
            $state.go('home', {});
        }

        if (!Auth.isAdminUser()) {
            Auth.clearAuthenticated();
            $state.go('home', {});
        }

        var vm = this;
        vm.messageSuccess = 1;
        vm.messageError = 1;
        vm.projects = [];
        vm.showEmptyResultMessage = false;
        Data.getAllProjects(function (projects) {
            vm.projects = projects;
            vm.showEmptyResultMessage = !vm.projects.length;
        }, function (error) {
            console.log(error);
        });

        vm.reverse = false;

        vm.addProject = function () {

        };

        vm.toggleActive = function (id) {
            var project = _.find(vm.projects, ['id', id]);
            Data.toggleActiveProject(id, function (id) {
                project.isActive = !project.isActive;
            }, function (error) {
                console.log(error);
            });
        };

        vm.updateProject = function () {

        };


        vm.sort = function (keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };

        vm.showTable = function () {
            return vm.projects.length !== 0;
        };

    }
})();
