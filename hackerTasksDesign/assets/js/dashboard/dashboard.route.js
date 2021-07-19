var dashboardApp = angular.module('dashboardApp', ['ui.router']);
var API_URL = "http://127.0.0.1:1337/api";

/* Routes */
dashboardApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/count');


    $stateProvider // target routes
        .state("targets", {
            url: "/targets",
            templateUrl: 'assets/templates/dashboardTemplates/targets.html',
            controller: 'targetController',
            resolve: {
                targetList: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/sites/get`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                },
                projectList: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/project/get`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                }
            }
        }) // project routes
        .state("projects", {
            url: "/projects",
            templateUrl: 'assets/templates/dashboardTemplates/projects.html',
            controller: 'projectController',
            resolve: {
                projectList: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/project/get`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [] || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                }
            }
        }) // checklist routes
        .state("checklist", {
            url: "/checklist",
            templateUrl: "assets/templates/dashboardTemplates/checklist.html",
            controller: "checklistController",
            resolve: {
                projectList: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/project/get`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                }
            }
        }) // count routes
        .state("count", {
            url: "/count",
            templateUrl: "assets/templates/dashboardTemplates/count.html",
            controller: "countController",
            resolve: {
                targetCount: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/sites/count`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                },
                projectCount: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/project/count`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                }
            }
        }) // collaboration routes
        .state("collaboration", {
            url: "/projects",
            templateUrl: 'assets/templates/dashboardTemplates/collaboration.html',
            controller: 'collaborationController',
            resolve: {}
        }) // scripts routes
        .state("scripts", {
            url: "/scripts",
            templateUrl: "assets/templates/dashboardTemplates/scripts.html",
            controller: "scriptController",
            resolve: {}
        }) // stats routes
        .state("stats", {
            url: "/stats",
            templateUrl: "assets/templates/dashboardTemplates/stats.html",
            controller: "scriptController",
            resolve: {}
        }) // checklist targets under project view
        .state("projectTargets", {
            url: "/projectTargets/:id",
            templateUrl: "assets/templates/dashboardTemplates/projectTarget.html",
            controller: "projectTargetController",
            resolve: {
                targetList: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/sites/get`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                },
                checklistInstances: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/checklist/getChecklistInstance`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                },
                checklists: function($http) {
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/checklist/getAllChecklist`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response) {
                        return response.data || [];
                    }).catch(
                        function(err) {
                            return [];
                        }
                    )
                }
            }
        })





})

export {
    dashboardApp
}