(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('RegisterStudentController', RegisterStudentController);

    function RegisterStudentController($state, $rootScope, Data) {

        $rootScope.title = 'Humasol - Registratie formulier student';
        $rootScope.metaDescription = 'Humasol is een Belgische vierdepijler organisatie die ingenieursstudenten de kans' +
            ' biedt hernieuwbare energieprojecten uit te voeren in minder begoede delen van de wereld';

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
