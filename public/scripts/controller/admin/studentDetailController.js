(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('StudentDetailController', StudentDetailController);

    function StudentDetailController($state, Auth, $stateParams) {

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
        vm.student = $stateParams.student;
        if (vm.student) {
            moment.locale('nl', null);
            var createdAt = moment(vm.student.created_at);
            vm.createdAt = createdAt.locale('nl').format("LLL");
        }

        vm.goBack = function () {
            $state.go('adminManageUsers', {
                "message": null,
                "error": null
            });
        };
    }
})();
