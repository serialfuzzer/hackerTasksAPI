var dashboardApp = angular.module('dashboardApp', ['ui.router']);
var API_URL = "http://127.0.0.1:1337/api";

/* Routes */
dashboardApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/count');


    $stateProvider
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
        })
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
        })
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
        })
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
        })
        .state("collaboration", {
            url: "/projects",
            templateUrl: 'assets/templates/dashboardTemplates/collaboration.html',
            controller: 'collaborationController',
            resolve: {}
        })

})

export {
    dashboardApp
}