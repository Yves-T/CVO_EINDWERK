(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('HeaderController', HeaderController);


    function HeaderController($state, $location) {

        var vm = this;

        vm.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        
        vm.goto = function (state) {
            $state.go(state, {});
        };

    }
})();
