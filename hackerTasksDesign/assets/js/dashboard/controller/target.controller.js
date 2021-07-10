var targetController = ['targetController', ['targetList', 'projectList', '$scope', "$log", "$http",
    function(targetList, projectList, $scope, $log, $http) {
        console.log("Target Controller Included");
        $scope.targetList = targetList || [];
        $scope.projectList = projectList || [];
        console.log($scope.projectList)
        if ($scope.projectList.length > 0) {
            $scope.selectedProject = $scope.projectList[0]["_id"];
        } else {
            $scope.selectedProject = "";
        }

        $scope.targetURL = "";
        console.log("TargetURL")
        console.log($scope.targetURL);
        $scope.removeSite = function(id) {
            var requestObject = {
                method: 'POST',
                url: `${API_URL}/sites/remove`,
                data: {
                    siteId: id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                }
            };
            $http(requestObject).then(function(response) {
                $scope.updateTargetList();
            })
        }
        $scope.addTarget = function() {
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
                }
            };
            $http(requestObject).then(function(response) {
                $scope.updateTargetList(); // = response.data;
            })
        }

        /* 
        Helper functions
    
        */

        $scope.updateTargetList = function() {
            var requestObject = {
                method: 'GET',
                url: `${API_URL}/sites/get`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                }
            };
            $http(requestObject).then(function(response) {
                if (response.data.toString().length > 0) {
                    $scope.targetList = response.data;
                } else {
                    $scope.targetList = [];
                }
            })
        }

    }
]]

export {
    targetController
}