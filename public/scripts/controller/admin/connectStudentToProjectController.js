(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('StudentToProjectController', StudentToProjectController);

    function StudentToProjectController($state, Data, Auth) {

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
        vm.reverse = false;
        vm.sortKey = 'user.id';
        vm.showConnectStudentToProject = false;

        vm.students = [];
        vm.showEmptyResultMessage = false;
        Data.getStudents(function (students) {
            vm.students = students;
            vm.showEmptyResultMessage = !students.length;
        }, function (error) {
            console.log(error);
        });

        vm.activeProjects = [];
        Data.getActiveProjects(function (activeProjects) {
            vm.activeProjects = activeProjects;
            if (vm.activeProjects.length > 0) {
                vm.selectedProject = vm.activeProjects[0].id;
            }
        }, function (error) {
            console.log(error);
        });

        vm.sort = function (keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };

        vm.handleConnect = function (studentId) {
            var student = _.find(vm.students, ['id', studentId]);
            if (student.project) {
                // disconnect
            } else {
                // connect
                handleOpenConnectSection(student);
            }
        };

        function handleOpenConnectSection(student) {
            vm.selectedStudent = student;
            vm.selectedStudentName = student.firstname + ' ' + student.lastname;
            vm.showConnectStudentToProject = true;
        }

        vm.connectStudent = function () {
            vm.studentToProjectConnectionError = false;
            var student = vm.selectedStudent;
            var projectId = vm.selectedProject;
            Data.connectStudentToProject(student.id, projectId, function (project) {
                vm.studentToProjectConnectionError = false;
                vm.selectedStudent = '';
                student.project = project;
                vm.showConnectStudentToProject = false;
            }, function (error) {
                vm.studentToProjectConnectionError = true;
                console.log(error);
            });
        };

        vm.showTable = function () {
            return vm.students.length !== 0;
        };

    }
})();
