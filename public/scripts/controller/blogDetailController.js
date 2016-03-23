(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('BlogPostDetailController', BlogPostDetailController);

    function BlogPostDetailController($state, $stateParams, Data) {

        var vm = this;
        vm.post = $stateParams.post;
        vm.comments = [];
        vm.showComments = false;

        // it is possible that user has used the browser reload button
        // if a project exists in session storage, fetch it
        if (!vm.post) {
            var post = JSON.parse(sessionStorage.getItem('postDetail'));
            if (post) {
                vm.post = post;
            }
        }

        if (vm.post) {
            var postAsString = JSON.stringify(vm.post);
            sessionStorage.setItem('postDetail', postAsString);

            moment.locale('nl', null);
            var createdAt = moment(vm.post.created_at);
            vm.createdAt = createdAt.locale('nl').format("LLL");
            var updatedAt = moment(vm.post.updated_at);
            vm.updatedAt = updatedAt.locale('nl').format("LLL");
            fetchCommentsForPost();
        }

        function fetchCommentsForPost() {
            Data.getCommentsForPost(vm.post.id, function (comments) {
                // order comments, recent first
                vm.comments = comments.sort(function (comment, anotherComment) {
                    return moment(comment.created_at).unix() < moment(anotherComment.created_at).unix();
                });
                vm.showComments = comments.length > 0;
            }, function (error) {
                console.log(error);
            });
        }

        vm.goBack = function () {
            sessionStorage.removeItem('postDetail');
            $state.go('projectDetail', {});
        };
    }
})();
