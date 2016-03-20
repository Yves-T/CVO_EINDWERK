(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ManageUsersController', ManageUsersController);

    function ManageUsersController($state, $rootScope, Data, Auth) {

        // if the user is not logged in, throw them back to the login page
        if (!Auth.isAuthenticated()) {
            Auth.clearAuthenticated();
            console.log('redirect');
            $state.go('home', {});
        }

        var vm = this;
        vm.students = [];

        Data.getStudents(function (students) {
            vm.students = students;
        }, function (error) {
            console.log(error);
        });


        vm.loginError = false;
        vm.loginErrorText;
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

        };

        vm.toggleActive = function (id) {
            console.log('toggle active ' + id);
            var student = _.find(vm.students, ['id', id]);
            Data.toggleActiveStudent(id, function (id) {
                console.log(id);
                student.isActive = !student.isActive;
                console.log(student);
            }, function (error) {
                console.log(error);
            });

        };

        vm.showUserDetail = function (id) {

        };
    }
})();
