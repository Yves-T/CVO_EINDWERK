(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ManageUsersController', ManageUsersController);

    function ManageUsersController($state, Data, Auth, $stateParams) {

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
        vm.students = [];
        vm.message = $stateParams.message;

        Data.getStudents(function (students) {
            vm.students = students;
        }, function (error) {
            console.log(error);
        });

        vm.loginError = false;
        vm.reverse = false;
        vm.sortKey = 'user.id';

        vm.sort = function (keyname) {
            vm.sortKey = keyname;
            vm.reverse = !vm.reverse;
        };

        vm.showTable = function () {
            return vm.students.length !== 0;
        };

        vm.updateStudent = function (id) {
            var student = _.find(vm.students, ['id', id]);
            $state.go('adminManageUserAddStudent', {'student': student});
        };

        vm.addStudent = function () {
            $state.go('adminManageUserAddStudent', {'student': null});
        };

        vm.toggleActive = function (id) {
            var student = _.find(vm.students, ['id', id]);
            Data.toggleActiveStudent(id, function (id) {
                student.isActive = !student.isActive;
            }, function (error) {
                console.log(error);
            });
        };

        vm.showUserDetail = function (id) {
            var student = _.find(vm.students, ['id', id]);
            $state.go('adminManageUsersDetail', {'student': student});
        };
    }
})();
