(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('StudentFormController', StudentFormController);

    function StudentFormController($state, Data, Auth, $stateParams) {

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
        vm.student = null;
        vm.studentIsUpdating = ($stateParams.student) ? true : false;
        if ($stateParams.student) {
            var student = $stateParams.student;
            vm.formData = {
                "studentYear": student.year,
                "studentFirstName": student.firstname,
                "studentLastName": student.lastname,
                "studentEmail": "yves.talboom@gmail.com",
                "studentSchool": student.school,
                "studentStudy": student.study,
                "studentIntrest": student.intrest,
                "studentActive": (student.isActive == '1' )
            };
        }

        vm.yearChanged = function () {
            var year = parseInt(vm.formData.studentYear);
            if (year) {
                vm.yearError = year > 2016 || year < 1970;
            }
        };

        vm.processForm = function () {
            if (vm.studentIsUpdating) {
                handleStudentUpdate();
            } else {
                handleCreateStudent();
            }
        };

        function handleStudentUpdate() {
            handleActiveStateStudent();
            Data.updateStudent($stateParams.student.id, vm.formData, function (result) {
                $state.go('adminManageUsers', {
                        message: {
                            "message": 'Student' + result + ' met success aangepast',
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
                            "error": 'Er ging iets mis tijdens het aanpassen van de student'
                        }
                    }
                );
            });
        }

        function handleActiveStateStudent() {
            if (!vm.formData.studentActive) {
                vm.formData.studentActive = 0;
            } else {
                vm.formData.studentActive = 1;
            }
        }

        function handleCreateStudent() {
            handleActiveStateStudent();
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

        vm.goBack = function () {
            $state.go('adminManageUsers', {});
        };

    }
})();
