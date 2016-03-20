(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('RegisterStudentController', RegisterStudentController);

    function RegisterStudentController($state, Data) {
        var vm = this;

        vm.yearChanged = function () {
            var year = parseInt(vm.formData.studentYear);
            if(year) {
                vm.yearError = year > 2016 || year < 1970;
            }
        };
        
        vm.processForm = function() {
            
        };
    }
})();
