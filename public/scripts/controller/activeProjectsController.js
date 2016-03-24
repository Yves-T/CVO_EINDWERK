(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ActiveProjectsController', ActiveProjectsController);

    function ActiveProjectsController($rootScope, $state, Data) {

        $rootScope.title = 'Humasol - Weergave actieve projecten';
        $rootScope.metaDescription = 'Humasol is een Belgische vierdepijler organisatie die ingenieursstudenten de kans' +
            ' biedt hernieuwbare energieprojecten uit te voeren in minder begoede delen van de wereld';

        var vm = this;

        vm.projects = [];

        Data.getActiveProjects(function (projects) {
            vm.projects = projects;
            _.forEach(vm.projects, function (project) {
                if (!project.image) {
                    project.picture = "img/humasol_tumbl.png";
                } else {
                    project.picture = 'api/project/viewFile/' + project.id;
                }

                if (project.title.length > 60) {
                    project.title = project.title.split(' ').slice(0, 2).join(' ') + ' ...';
                }
            });
        }, function (error) {
            console.log(error);
        });

        vm.showProjectDetail = function (project) {
            $state.go('projectDetail', {'project': project});
        };
    }
})();
