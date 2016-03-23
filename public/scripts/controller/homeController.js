(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('HomeController', HomeController);


    function HomeController($state, Data) {

        var vm = this;
        vm.postTeasers = [];

        Data.getRecententPostTeasers(function (postTeasers) {
            _.forEach(postTeasers, function (postTeaser) {
                postTeaser.read_more += ' ...';
            });
            vm.postTeasers = postTeasers;
        }, function (error) {
            console.log(error);
        });

        vm.goto = function (state) {
            $state.go(state, {});
        };

    }
})();
