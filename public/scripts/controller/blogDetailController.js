(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('BlogPostDetailController', BlogPostDetailController);

    function BlogPostDetailController($state, $stateParams, Data, vcRecaptchaService, $http) {

        var vm = this;
        vm.post = $stateParams.post;
        vm.comments = [];
        vm.messageError = 1;
        vm.messageSuccess = 1;
        vm.showComments = false;
        vm.showCommentForm = false;
        vm.message = {};
        if (document.domain.localeCompare('super.app') === 0) {
            // local dev
            vm.publicKey = "6Lf5lhsTAAAAAHg_9BqStCdUyGX3miHBSEkfMJGr";
        } else {
            // probably running on the production server
            vm.publicKey = "6LcElRsTAAAAAAbqNjvSNQbzhdblPkgRzREE2IoX";
        }

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
                vm.comments = sortComments(comments);
                vm.showComments = comments.length > 0;
            }, function (error) {
                console.log(error);
            });
        }

        vm.goBack = function () {
            sessionStorage.removeItem('postDetail');
            $state.go('projectDetail', {});
        };

        vm.showComment = function () {
            vm.showCommentForm = true;
        };

        vm.cancelCommentForm = function () {
            vm.showCommentForm = false;
        };

        vm.processForm = function () {
            if (vcRecaptchaService.getResponse() === "") { //if string is empty
                vm.message.error = "De captcha was fout. Probeer deze op te lossen alvorens verder te gaan";
                vm.messageError = 0;
            } else {
                var post_data = {  //prepare payload for request
                    'g-recaptcha-response': vcRecaptchaService.getResponse()  //send g-captcah-reponse to our server
                };
                console.log('google ok');
            }

            Data.checkCaptcha(post_data, function (response) {
                if (response) {
                    alert("Successfully verified and signed up the user");
                    Data.addCommentForPost(vm.post.id, vm.formData, function (comment) {
                        console.log(comment);
                        vm.comments.push(comment);
                        vm.comments = sortComments(vm.comments);
                        vm.messageSuccess = 0;

                        vm.message.message = "De comment was met succes toegevoegd.";
                        vm.showCommentForm = false;
                    }, function (error) {
                        console.log(error);
                        vm.message.error = "Er ging iets mis met het plaatsen van de comment. Probeer het later nog " +
                            "eens opnieuw";
                        vm.messageError = 0;
                    })
                } else {
                    vm.message.error = "Foute captcha. Probeer opnieuw.";
                    vm.messageError = 0;
                }
            }, function (error) {
                console.log(error);
            });
        };

        vm.getDateAsString = function (date) {
            moment.locale('nl', null);
            var createdAt = moment(date);
            return createdAt.locale('nl').format("LLL");
        };

        function sortComments(comments) {
            // order comments, recent first
            return vm.comments = comments.sort(function (comment, anotherComment) {
                return moment(comment.created_at).unix() < moment(anotherComment.created_at).unix();
            });
        }
    }
})();
