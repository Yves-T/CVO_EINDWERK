(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ManageBlogPostController', ManageBlogPostController);

    function ManageBlogPostController($state, Auth, Data) {

        // if the user is not logged in, throw them back to the login page
        if (!Auth.isAuthenticated()) {
            Auth.clearAuthenticated();
            console.log('redirect');
            $state.go('home', {});
        }

        var vm = this;
        vm.blogPosts = [];
        vm.showEmptyResultMessage = false;
        Data.getPostsForStudent(Auth.currentUser().id, function (posts) {
            vm.blogPosts = posts;
            vm.showEmptyResultMessage = !posts.length;
        }, function (error) {
            console.log(error);
        });
        vm.reverse = false;
        vm.okMessage = false;
        vm.errorMessage = false;
        vm.sortKey = 'post.id';

        vm.addPost = function () {

        };

        vm.deletePost = function () {

        };

        vm.updatePost = function () {

        };

        vm.showTable = function () {
            return vm.blogPosts.length !== 0;
        };

    }
})();
