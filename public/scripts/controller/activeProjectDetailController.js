(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ActiveProjectDetailController', ActiveProjectDetailController);

    function ActiveProjectDetailController($rootScope, $state, Data, $stateParams) {

        $rootScope.title = 'Humasol - Detail weergave actieve projecten';
        $rootScope.metaDescription = 'Humasol is een Belgische vierdepijler organisatie die ingenieursstudenten de kans' +
            ' biedt hernieuwbare energieprojecten uit te voeren in minder begoede delen van de wereld';

        var vm = this;

        vm.project = $stateParams.project;
        vm.posts = [];

        // it is possible that user has used the browser reload button
        // if a project exists in session storage, fetch it
        if (!vm.project) {
            var project = JSON.parse(sessionStorage.getItem('activeProject'));
            if (project) {
                vm.project = project;
            }
        }

        if (vm.project) {
            var projectAsString = JSON.stringify(vm.project);

            sessionStorage.setItem('activeProject', projectAsString);
            moment.locale('nl', null);
            var createdAt = moment(vm.project.created_at);
            vm.createdAt = createdAt.locale('nl').format("LLL");
            var updatedAt = moment(vm.project.updated_at);
            vm.updatedAt = updatedAt.locale('nl').format("LLL");
            vm.image = 'api/project/viewFile/' + vm.project.id;

            fetchPostTeasersForProject();
        }

        function fetchPostTeasersForProject() {
            Data.getBlogPostsForProject(vm.project.id, function (posts) {
                _.forEach(posts, function (postTeaser) {
                    postTeaser.read_more += ' ...';
                });
                vm.posts = posts;
            }, function (error) {
                console.log(error);
            });
        }

        vm.showProjectDetail = function (post) {
            $state.go('blogPostDetail', {"post": post});
        };

        vm.goBack = function () {
            sessionStorage.removeItem('activeProject');
            $state.go('activeProjects', {});
        };

    }
})();
