(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('HomeController', HomeController);


    function HomeController($state, Data, $rootScope) {

        $rootScope.title = 'Humasol - Hoofdpagina';
        $rootScope.metaDescription = 'Humasol is een Belgische vierdepijler organisatie die ingenieursstudenten de kans' +
            ' biedt hernieuwbare energieprojecten uit te voeren in minder begoede delen van de wereld';

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

        vm.showPostDetail = function (post) {
            $state.go('blogPostDetail', {post: post, homePage: true});
        };

    }
})();
