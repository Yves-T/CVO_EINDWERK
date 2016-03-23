(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ActiveProjectsController', ActiveProjectsController);

    function ActiveProjectsController(Data) {

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
    }
})();