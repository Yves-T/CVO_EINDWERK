(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('BlogPostDetailController', BlogPostDetailController);

    function BlogPostDetailController($state, $stateParams, Data, vcRecaptchaService, $http, $rootScope, $scope) {

        $rootScope.title = 'Humasol - Blog post in detail weergeven';
        $rootScope.metaDescription = 'Humasol is een Belgische vierdepijler organisatie die ingenieursstudenten de kans' +
            ' biedt hernieuwbare energieprojecten uit te voeren in minder begoede delen van de wereld';

        var vm = this;
        vm.post = $stateParams.post;
        vm.fromHomePage = $stateParams.homePage;
        if (vm.fromHomePage) {
            vm.goBackBtn = 'Ga terug naar de home pagina';
        } else {
            vm.goBackBtn = 'Ga terug naar het project detail';
        }
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
            if (vm.fromHomePage) {
                $state.go('home', {});
            } else {
                $state.go('projectDetail', {});
            }
        };

        vm.showComment = function () {
            grecaptcha.reset();
            vm.showCommentForm = true;
        };

        vm.cancelCommentForm = function (event) {
            event.preventDefault();
            vm.showCommentForm = false;
        };

        vm.widgetId = null;

        vm.setWidgetId = function (widgetId) {
            // store the `widgetId` for future usage.
            vm.widgetId = widgetId;
        };

        vm.processForm = function () {
            if (vcRecaptchaService.getResponse(vm.widgetId) === "") { //if string is empty
                vm.message.error = "De captcha was fout. Probeer deze op te lossen alvorens verder te gaan";
                vm.messageError = 0;
            } else {
                var post_data = {  //prepare payload for request
                    'g-recaptcha-response': vcRecaptchaService.getResponse(vm.widgetId)  //send g-captcah-reponse to our server
                };
            }

            Data.checkCaptcha(post_data, function (response) {
                if (response) {
                    Data.addCommentForPost(vm.post.id, vm.formData, function (comment) {
                        vm.comments.push(comment);
                        vm.showComments = vm.comments.length > 0;
                        vm.comments = sortComments(vm.comments);
                        vm.messageSuccess = 0;

                        vm.message.message = "De comment was met succes toegevoegd.";
                        vm.showCommentForm = false;
                        // reset the captcha
                        grecaptcha.reset();
                        clearCommentForm();
                    }, function (error) {
                        console.log(error);
                        vm.message.error = "Er ging iets mis met het plaatsen van de comment. Probeer het later nog " +
                            "eens opnieuw";
                        vm.messageError = 0;
                        grecaptcha.reset();
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

        function clearCommentForm() {
            $scope.commentForm.$setPristine();
            $scope.commentForm.$setUntouched();
            vm.formData.commentNickname = "";
            vm.formData.commentEmail = "";
            vm.formData.commentContent = "";
        }
    }
})();
