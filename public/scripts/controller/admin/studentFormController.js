(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('StudentFormController', StudentFormController);

    function StudentFormController($state, Data, Auth) {

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

        vm.yearChanged = function () {
            var year = parseInt(vm.formData.studentYear);
            if (year) {
                vm.yearError = year > 2016 || year < 1970;
            }
        };

        vm.processForm = function () {
            console.log(vm.formData);
            handleCreateStudent();
        };

        function handleCreateStudent() {
            Data.addStudent(vm.formData, function (result) {
                $state.go('adminManageUsers', {
                        message: {
                            "message": 'Student' + result + ' met success aangemaakt',
                            "error": null
                        }
                    }
                );
            }, function (error) {
                console.log('result NOK');
                console.log(error);

                $state.go('adminManageUsers', {
                        message: {
                            "message": null,
                            "error": 'Er ging iets mis tijdens het aanmaken van de student'
                        }
                    }
                );
            });
        }
    }
})();
