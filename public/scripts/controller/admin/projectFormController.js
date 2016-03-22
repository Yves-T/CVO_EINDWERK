(function () {

    'use strict';

    angular
        .module('humasol')
        .controller('ProjectFormController', ProjectFormController);

    function ProjectFormController($state, Data, Auth, $stateParams, Upload, $timeout, $http) {

        // if the user is not logged in, throw them back to the login page
        if (!Auth.isAuthenticated()) {
            Auth.clearAuthenticated();
            $state.go('home', {});
        }

        if (!Auth.isAdminUser()) {
            Auth.clearAuthenticated();
            $state.go('home', {});
        }

        var vm = this;
        vm.project = $stateParams.project;
        vm.projectIsUpdating = ($stateParams.project) ? true : false;

        vm.selectedTechnologies = [];
        vm.disableTechnology = false;

        vm.technologies = [];
        Data.getTechnologies(function (technologies) {
            vm.technologies = technologies;
            updateTechnologyComboSelection();
            if (vm.projectIsUpdating) {
                filterCollection(vm.selectedTechnologies, vm.technologies);
                vm.disableTechnology = vm.technologies.length === 0;
            }
        }, function (error) {
            console.log(error);
        });

        vm.selectedSponsors = [];
        vm.disableSponsor = false;
        vm.sponsors = [];
        Data.getSponsors(function (sponsors) {
            vm.sponsors = sponsors;
            updateSponsorComboSelection();
            filterCollection(vm.selectedSponsors, vm.sponsors);
            vm.disableSponsor = vm.sponsors.length === 0;
        }, function (error) {
            console.log(error);
        });

        // if project is transer necessary data to form
        if ($stateParams.project) {
            var project = $stateParams.project;
            vm.formData = {
                "projectTitle": project.title,
                "projectYear": project.year,
                "projectLocation": project.location,
                "projectActive": project.isActive,
                "projectdescription": project.longdescription
            };
            vm.selectedTechnologies = project.technologies;
            vm.selectedSponsors = project.sponsors;
        }

        function filterCollection(projectCollection, comboCollection) {
            var itemsToRemove = [];
            _.forEach(comboCollection, function (comboItem) {
                _.forEach(projectCollection, function (projectItem) {
                    if (comboItem.id === projectItem.id) {
                        itemsToRemove.push(comboItem);
                    }
                });
            });

            _.forEach(itemsToRemove, function (someItem) {
                comboCollection.splice(comboCollection.indexOf((someItem)), 1);
            });
        }

        vm.addTechnology = function () {
            vm.selectedTechnologies.push(vm.selectedTechnology);
            var index = vm.technologies.indexOf(vm.selectedTechnology);
            vm.technologies.splice(index, 1);
            updateTechnologyComboSelection();
            vm.disableTechnology = vm.technologies.length === 0;
        };

        vm.deleteTechnology = function (index, event) {
            event.preventDefault();
            vm.technologies.push(vm.selectedTechnologies[index]);
            vm.selectedTechnologies.splice(index, 1);
            vm.disableTechnology = vm.technologies.length === 0;
            updateTechnologyComboSelection();
        };

        function updateTechnologyComboSelection() {
            if (vm.technologies.length > 0) {
                vm.selectedTechnology = vm.technologies[0];
            }
        }

        function updateSponsorComboSelection() {
            if (vm.sponsors.length > 0) {
                vm.selectedSponsor = vm.sponsors[0];
            }
        }

        vm.addSponsor = function () {
            vm.selectedSponsors.push(vm.selectedSponsor);
            var index = vm.sponsors.indexOf(vm.selectedSponsor);
            vm.sponsors.splice(index, 1);
            updateSponsorComboSelection();
            vm.disableSponsor = vm.sponsors.length === 0;
        };

        vm.deleteSponsor = function (index, event) {
            event.preventDefault();
            vm.sponsors.push(vm.selectedSponsors[index]);
            vm.selectedSponsors.splice(index, 1);
            vm.disableSponsor = vm.sponsors.length === 0;
            updateSponsorComboSelection();
        };

        vm.processForm = function () {
            // NOP
        };

        vm.yearChanged = function () {
            var year = parseInt(vm.formData.projectYear);
            if (year) {
                vm.yearError = year > 2016 || year < 1970;
            }
        };

        vm.goBack = function () {
            $state.go('adminManageUsers', {});
        };

        vm.uploadForm = function (file) {
            vm.formData.selectedSponsors = vm.selectedSponsors;
            vm.formData.selectedTechnologies = vm.selectedTechnologies;
            if (!vm.formData.projectActive) {
                vm.formData.projectActive = 0;
            } else {
                vm.formData.projectActive = 1;
            }

            if (file) {
                if (vm.projectIsUpdating) {
                    // handle update project with file
                    handleUpdateFile(file);
                } else {
                    // handle create project without file
                    handleFormUpload(file);
                }

            } else {
                if (vm.projectIsUpdating) {
                    // handle update project without file
                    handleUpdateWithoutFile();
                } else {
                    // handle create project without file
                    handleFormUploadWithoutFile();
                }
            }
        };

        function handleUpdateFile(file) {

        }

        function handleUpdateWithoutFile() {
            Data.updateProject(vm.project.id, {formData: vm.formData}, function (success) {
                handleUpdateRequestSuccess();
            }, function (error) {
                console.log(error);
                handleUpdateRequestFail();
            });
        }

        function handleFormUploadWithoutFile() {
            $http.post('api/project/create', {formData: vm.formData}).success(function (success) {
                handleRequestSuccess();
            }, function (error) {
                console.log(error);
                handleRequestFail();
            });
        }

        function handleFormUpload(file) {
            file.upload = Upload.upload({
                url: 'api/project/create',
                data: {formData: vm.formData, file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0) {
                    vm.errorMsg = response.status + ': ' + response.data;
                    handleRequestFail();
                }
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                if (evt.loaded / evt.total === 1) {
                    handleRequestSuccess();
                }
            });
        }

        function handleRequestSuccess() {
            $state.go('adminManageProjects', {
                message: {
                    "message": 'Het project is met success aangemaakt',
                    "error": null
                }
            });
        }

        function handleRequestFail() {
            $state.go('adminManageProjects', {
                message: {
                    "message": null,
                    "error": 'Er ging iets mis tijdens het aanmaken van het project'
                }
            });
        }

        function handleUpdateRequestSuccess() {
            $state.go('adminManageProjects', {
                message: {
                    "message": 'Het project is met success aangepast.',
                    "error": null
                }
            });
        }

        function handleUpdateRequestFail() {
            $state.go('adminManageProjects', {
                message: {
                    "message": null,
                    "error": 'Er ging iets mis tijdens het updaten van het project'
                }
            });
        }

    }
})();
