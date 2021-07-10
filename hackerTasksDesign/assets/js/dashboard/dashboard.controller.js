import { dashboardApp } from './dashboard.route.js';
var API_URL = "http://127.0.0.1:1337/api"


dashboardApp.controller('mainController', ['$scope', "$log", "$http",  function($scope, $log, $http){
    
    $scope.logout = function(){
        window.location.href = "/index.html";
    }
    
}]);

dashboardApp.controller('targetController', ['targetList', 'projectList','$scope', "$log", "$http",  function(targetList, projectList, $scope, $log, $http){
    console.log("Target Controller Included");
    $scope.targetList = targetList  || [];
    $scope.projectList = projectList || [];
    console.log($scope.projectList)
    if($scope.projectList.length > 0){
        $scope.selectedProject = $scope.projectList[0]["_id"];
    }else{
        $scope.selectedProject = "";
    }
    
    $scope.targetURL = "";
    console.log("TargetURL")
    console.log($scope.targetURL);
    $scope.removeSite = function(id){
        var requestObject = {
            method: 'POST',
            url: `${API_URL}/sites/remove`,
            data: {
                siteId: id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
            }};
            $http(requestObject).then(function(response){
                $scope.updateTargetList();
            })
        }
        $scope.addTarget = function(){
            var requestObject = {
                method: 'POST',
                url: `${API_URL}/sites/add`,
                data: {
                    siteName: $scope.targetURL,
                    projectId: $scope.selectedProject
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                }};
                $http(requestObject).then(function(response){
                    $scope.updateTargetList(); // = response.data;
                })
            }
            
            /* 
            Helper functions
            
            */
            
            $scope.updateTargetList = function(){
                var requestObject = {
                    method: 'GET',
                    url: `${API_URL}/sites/get`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                    }};
                    $http(requestObject).then(function(response){
                        if(response.data.toString().length>0){
                            $scope.targetList = response.data;
                        }else{
                            $scope.targetList = [];
                        }
                    })
                }
                
            }]);
            
            dashboardApp.controller('projectController', ['projectList', '$scope', "$log", "$http",  function(projectList, $scope, $log, $http){
                
                console.log("Project Controller Included");
                $scope.projectList = projectList;
                $scope.projectName = "";
                $scope.removeProject = function(id){
                    var requestObject = {
                        method: 'POST',
                        url: `${API_URL}/project/remove`,
                        data: {
                            projectId: id
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                        }};
                        $http(requestObject).then(function(response){
                            $scope.projectList = response.data;
                        })
                    }
                    $scope.addProject = function(){
                        var requestObject = {
                            method: 'POST',
                            url: `${API_URL}/project/add`,
                            data: {
                                projectName: $scope.projectName
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                            }};
                            $http(requestObject).then(function(response){
                                $scope.projectList = response.data;
                            })
                        }
                        
                    }])
                    
                    /* Required JS */
                    if(window.localStorage.getItem("apiToken") == undefined || window.localStorage.getItem("apiToken") == "") {
                        window.location.href = "/index.html";
                    }
                    
                    
                    
                    
                    export {
                        dashboardApp
                    }