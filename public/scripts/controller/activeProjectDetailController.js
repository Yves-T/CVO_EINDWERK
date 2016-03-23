(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ActiveProjectDetailController', ActiveProjectDetailController);

    function ActiveProjectDetailController($state, Data, $stateParams) {

        var vm = this;

        vm.project = $stateParams.project;

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
        }

        vm.goBack = function () {
            sessionStorage.removeItem('activeProject');
            $state.go('activeProjects', {});
        };

    }
})();
