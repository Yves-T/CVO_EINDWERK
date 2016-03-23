(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('BlogPostFormController', BlogPostFormController);

    function BlogPostFormController($state, Auth, Data, $stateParams) {

        // if the user is not logged in, throw them back to the login page
        if (!Auth.isAuthenticated()) {
            Auth.clearAuthenticated();
            console.log('redirect');
            $state.go('home', {});
        }

        var vm = this;
        vm.postIsUpdating = ($stateParams.post) ? true : false;
        if ($stateParams.post) {
            var post = $stateParams.post;
            vm.formData = {
                "postTitle": post.title,
                "postcontent": post.content
            };
        }

        vm.processForm = function () {
            if (vm.postIsUpdating) {
                handleUpdatePost();
            } else {
                handleAddNewPost();
            }
        };

        function handleUpdatePost() {
            Data.updatePost($stateParams.post.id, vm.formData, function (postTitle) {
                $state.go('studentManageBlogPosts', {
                    message: {
                        "message": 'Post "' + postTitle + '" met success aangepast.',
                        "error": null
                    }
                });
            }, function (error) {
                console.log(error);
                $state.go('studentManageBlogPosts', {
                    message: {
                        "message": null,
                        "error": 'Er ging iets mis tijdens het updaten van de blog post'
                    }
                })
            });
        }

        function handleAddNewPost() {
            Data.addPostForStudent(Auth.currentUser().id, vm.formData, function (success) {
                $state.go('studentManageBlogPosts', {
                    message: {
                        "message": 'Post met success aangemaakt',
                        "error": null
                    }
                });
            }, function (error) {
                console.log(error);
                $state.go('studentManageBlogPosts', {
                    message: {
                        "message": null,
                        "error": 'Er ging iets mis tijdens het aanmaken van de blog post'
                    }
                })
            });
        }

        vm.goBack = function () {
            $state.go('studentManageBlogPosts', {});
        };
    }
})();
