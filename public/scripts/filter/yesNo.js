(function () {

    'use strict';

    angular
        .module('humasol')
        .filter('yesNo', yesNoFilter);

    function yesNoFilter() {

        return function (input) {
            return input ? 'ja' : 'nee';
        };
    }
})();
