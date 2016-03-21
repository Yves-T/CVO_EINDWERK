(function () {

    'use strict';

    angular
        .module('humasol')
        .filter('connectDisconnect', connectDisconnectFilter);

    function connectDisconnectFilter() {

        return function (input) {
            return input ? 'Koppel los' : 'Koppel';
        };
    }
})();
