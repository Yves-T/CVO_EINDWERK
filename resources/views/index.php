<!doctype html lang="nl">
<html>
<head>
    <meta charset="utf-8">
    <title>Humasol</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="bower_components/Yamm3/yamm/yamm.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel='stylesheet' href='node_modules/textangular/dist/textAngular.css'>
</head>
<body ng-app="humasol">
<header role="banner" ng-cloak>
    <img id="logo-main" width="200" src="img/Humasol logo cmyk quadri_new.png" alt="humasol logo">
    <nav class="navbar navbar-default yamm" ng-controller="HeaderController as hc">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">Humasol</a>
            </div>

            <ul class="nav navbar-nav">
                <!-- Over ons -->
                <li class="dropdown open" dropdown>
                    <a href="#" class="dropdown-toggle" dropdown-toggle toggle-event="mouseover">
                        Over ons<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="yamm-content">
                                <ul class="media-list">
                                    <li class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">In het kort</h4>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">wie zijn wij</h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="nav navbar-nav">
                <!-- Projecten -->
                <li class="dropdown open" dropdown>
                    <a href="#" class="dropdown-toggle" dropdown-toggle toggle-event="mouseover">
                        Projecten<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="yamm-content">
                                <div class="row">
                                    <ul class="media-list col-sm-3">
                                        <li class="media">
                                            <div class="media-body">
                                                <h4 class="media-heading">Lopende projecten</h4>
                                            </div>
                                        </li>
                                        <li class="media">
                                            <div class="media-body">
                                                <h4 class="media-heading">Locaties</h4>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul class="media-list col-sm-3">
                                        <li class="media">
                                            <div class="media-body">
                                                <h4 class="media-heading">Projecten aanvragen</h4>
                                            </div>
                                        </li>

                                        <li class="media">
                                            <div class="media-body">
                                                <h4 class="media-heading">Project zoeken</h4>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <ul class="nav navbar-nav">
                <!-- Studenten -->
                <li class="dropdown open" dropdown>
                    <a href="#" class="dropdown-toggle" dropdown-toggle toggle-event="mouseover">
                        Studenten<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="yamm-content">
                                <ul class="media-list">
                                    <li class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">Algemene info</h4>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">Kandidaat stellen</h4>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading" ng-click="hc.goto('registerStudent')">
                                                Hou me op de hoogte
                                            </h4>
                                        </div>
                                    </li>
                                    <li class="media">
                                        <div class="media-body">
                                            <h4 class="media-heading">Vacatures</h4>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>

            <!--        private section-->
            <!--        user only section-->
            <ul ng-show="currentUser.isAStudent" class="nav navbar-nav">
                <!-- user profile section -->
                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="#">
                        Profiel<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li><a tabindex="-1" href="#"> Aanpassen </a></li>
                    </ul>
                </li>

                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="#">
                        Blog<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li><a tabindex="-1" href="#"> Blog posts beheren </a></li>
                    </ul>
                </li>
            </ul>

            <!-- admin only section-->
            <ul ng-show="currentUser.isAdmin" class="nav navbar-nav">
                <!-- admin user section -->
                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="#">
                        Studenten<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li>
                            <a tabindex="-1" href="javascript:;" ng-click="hc.goto('adminManageUsers')">
                                Updaten / aanpassen / verwijderen
                            </a>
                        </li>
                        <li class="divider"></li>
                        <li>
                            <a tabindex="-1" href="javascript:;"
                               ng-click="hc.goto('adminManageUserConnectStudentToProject')">
                                Koppelen met project
                            </a>
                        </li>
                        <li><a tabindex="-1" href="#"> Ontkoppelen met project </a></li>
                    </ul>
                </li>

                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="#">
                        Projecten<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li><a tabindex="-1" href="#"> Updaten / aanpassen / verwijderen </a></li>
                    </ul>
                </li>

                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="#">
                        Admin<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li><a tabindex="-1" href="#"> Updaten / aanpassen / verwijderen </a></li>
                    </ul>
                </li>
            </ul>

            <p ng-hide="currentUser" class="navbar-text pull-right" ng-class="{ active: hc.isActive('/auth')}">
                <a href="javascript:;" ng-click="hc.goto('auth')">
                    <i class="fa fa-sign-in"></i>&nbsp;Aanmelden
                </a>
            </p>
            <p ng-show="currentUser" class="navbar-text pull-right">
                <a href="javascript:;" ng-click="hc.logout()"><i class="fa fa-sign-out"></i>&nbsp;Afmelden</a>
            </p>

        </div>
    </nav>
</header>

<div class="container">
    <div ui-view></div>
</div>

</body>

<!-- Application Dependencies -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="node_modules/lodash/lodash.min.js"></script>
<script src="node_modules/moment/min/moment.min.js"></script>
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/angular-ui-router/release/angular-ui-router.js"></script>
<script src="node_modules/angular-animate/angular-animate.min.js"></script>
<script src="node_modules/satellizer/satellizer.js"></script>
<script src="node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="node_modules/angular-utils-pagination/dirPagination.js"></script>
<script src='node_modules/textangular/dist/textAngular-rangy.min.js'></script>
<script src='node_modules/textangular/dist/textAngular-sanitize.min.js'></script>
<script src='node_modules/textangular/dist/textAngular.min.js'></script>
<script src='js/angular-mega-menu.js'></script>

<!-- Application Scripts -->
<script src="scripts/app.js"></script>
<script src="scripts/controller/authController.js"></script>
<script src="scripts/controller/headerController.js"></script>
<script src="scripts/controller/homeController.js"></script>
<script src="scripts/controller/registerStudentController.js"></script>
<script src="scripts/controller/admin/manageUsersController.js"></script>
<script src="scripts/controller/admin/studentDetailController.js"></script>
<script src="scripts/controller/admin/studentFormController.js"></script>
<script src="scripts/controller/admin/connectStudentToProjectController.js"></script>
<script src="scripts/service/authService.js"></script>
<script src="scripts/service/dataService.js"></script>
<script src="scripts/directives/confirmDirective.js"></script>
<script src="scripts/filter/yesNo.js"></script>
<script src="scripts/filter/connectButton.js"></script>

</html>