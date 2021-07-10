var dashboardApp = angular.module('dashboardApp', ['ui.router']);
var API_URL = "http://127.0.0.1:1337/api";

/* Routes */
dashboardApp.config(function($stateProvider, $urlRouterProvider){
    
    $stateProvider
    .state("targets", {
        url: "/targets",
        templateUrl: 'assets/templates/dashboardTemplates/targets.html',
        controller: 'targetController',
        resolve: {
            targetList: function ($http){
                var requestObject = {
                    method: 'GET',
                    url: `${API_URL}/sites/get`,
                    headers: {
                        'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                    }
                }
                return $http(requestObject).then(function(response){
                    return response.data || [];
                }).catch(
                    function(err){
                        return [];
                    }
                    )
                },
                projectList: function($http){
                    var requestObject = {
                        method: 'GET',
                        url: `${API_URL}/project/get`,
                        headers: {
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }
                    }
                    return $http(requestObject).then(function(response){
                        return response.data || [];
                    }).catch(
                        function(err){
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
                    projectList: function ($http){
                        var requestObject = {
                            method: 'GET',
                            url: `${API_URL}/project/get`,
                            headers: {
                                'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                            }
                        }
                        return $http(requestObject).then(function(response){
                            return response.data || [] || [];
                        }).catch(
                            function(err){
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