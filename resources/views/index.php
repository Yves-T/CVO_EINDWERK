<!doctype html lang="nl">
<html ng-app="humasol">
<head>
    <meta charset="utf-8">
    <title ng-bind="title"></title>
    <meta name="description" content="{{metaDescription}}"/>
    <base href="/"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="bower_components/Yamm3/yamm/yamm.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel='stylesheet' href='node_modules/textangular/dist/textAngular.css'>
    <script
        src="https://www.google.com/recaptcha/api.js?onload=vcRecaptchaApiLoaded&render=explicit" async defer>
    </script>
</head>
<body>
<header role="banner" ng-cloak>
    <img id="logo-main" width="200" src="img/Humasol logo cmyk quadri_new.png" alt="humasol logo">
    <nav class="navbar navbar-default yamm" ng-controller="HeaderController as hc">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" ng-click="hc.goto('home')" href="javascript:;">Humasol</a>
            </div>

            <ul class="nav navbar-nav">
                <!-- Over ons -->
                <li class="dropdown open" dropdown>
                    <a href="javascript:;" class="dropdown-toggle" dropdown-toggle toggle-event="mouseover">
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
                    <a href="javascript:;" class="dropdown-toggle" dropdown-toggle toggle-event="mouseover">
                        Projecten<b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <div class="yamm-content">
                                <div class="row">
                                    <ul class="media-list col-sm-3">
                                        <li class="media">
                                            <div class="media-body">
                                                <h4 class="media-heading" ng-click="hc.goto('activeProjects')">
                                                    Lopende projecten
                                                </h4>
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
                    <a href="javascript:;" class="dropdown-toggle" dropdown-toggle toggle-event="mouseover">
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
            <ul ng-show="currentUser.isAStudent == 1" class="nav navbar-nav">
                <!-- user profile section -->
                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="javascript:;">
                        Profiel<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li><a tabindex="-1" href="javascript:;"> Aanpassen </a></li>
                    </ul>
                </li>

                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="javascript:;">
                        Blog<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li ng-click="hc.goto('studentManageBlogPosts')">
                            <a tabindex="-1" href="javascript:;"> Blog posts beheren </a>
                        </li>
                    </ul>
                </li>
            </ul>

            <!-- admin only section-->
            <ul ng-show="currentUser.isAdmin == 1" class="nav navbar-nav">
                <!-- admin user section -->
                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="javascript:;">
                        Studentenbeheer<b class="caret"></b>
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
                                Koppelen / ontkoppelen met project
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="javascript:;">
                        Projecten<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li>
                            <a tabindex="-1" href="javascript:;" ng-click="hc.goto('adminManageProjects')">
                                Updaten / aanpassen / verwijderen
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="dropdown" dropdown>
                    <a class="dropdown-toggle" dropdown-toggle toggle-event="mouseover" href="javascript:;">
                        Admin<b class="caret"></b>
                    </a>
                    <ul role="menu" class="dropdown-menu">
                        <li><a tabindex="-1" href="javascript:;"> Updaten / aanpassen / verwijderen </a></li>
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

<!--google analytics-->
<script>
    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
</script>

<!-- Application Dependencies -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<script src="node_modules/lodash/lodash.min.js"></script>
<script src="node_modules/moment/min/moment.min.js"></script>
<script src="node_modules/moment/locale/nl.js"></script>
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/angular-ui-router/release/angular-ui-router.js"></script>
<script src="node_modules/angular-animate/angular-animate.min.js"></script>
<script src="node_modules/satellizer/satellizer.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src="node_modules/angular-recaptcha/release/angular-recaptcha.min.js"></script>
<script src="node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.js"></script>
<script src="node_modules/angular-utils-pagination/dirPagination.js"></script>
<script src='node_modules/textangular/dist/textAngular-rangy.min.js'></script>
<script src='node_modules/textangular/dist/textAngular-sanitize.min.js'></script>
<script src='node_modules/textangular/dist/textAngular.min.js'></script>
<script src='node_modules/ng-file-upload/dist/ng-file-upload.min.js'></script>
<script src='js/angular-mega-menu.js'></script>

<!-- Application Scripts -->
<script src="scripts/app.js"></script>
<script src="scripts/controller/authController.js"></script>
<script src="scripts/controller/headerController.js"></script>
<script src="scripts/controller/homeController.js"></script>
<script src="scripts/controller/activeProjectsController.js"></script>
<script src="scripts/controller/activeProjectDetailController.js"></script>
<script src="scripts/controller/blogDetailController.js"></script>
<script src="scripts/controller/registerStudentController.js"></script>
<script src="scripts/controller/admin/manageUsersController.js"></script>
<script src="scripts/controller/admin/studentDetailController.js"></script>
<script src="scripts/controller/admin/studentFormController.js"></script>
<script src="scripts/controller/admin/connectStudentToProjectController.js"></script>
<script src="scripts/controller/admin/manageProjectController.js"></script>
<script src="scripts/controller/admin/projectFormController.js"></script>
<script src="scripts/controller/admin/projectDetailController.js"></script>
<script src="scripts/controller/student/manageBlogPostController.js"></script>
<script src="scripts/controller/student/blogPostFormController.js"></script>
<script src="scripts/service/authService.js"></script>
<script src="scripts/service/dataService.js"></script>
<script src="scripts/directives/confirmDirective.js"></script>
<script src="scripts/filter/yesNo.js"></script>
<script src="scripts/filter/connectButton.js"></script>

</body>

</html>
