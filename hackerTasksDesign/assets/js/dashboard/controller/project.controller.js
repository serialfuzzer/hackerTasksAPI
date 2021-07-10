var projectController = ['projectController', ['projectList', '$scope', "$log", "$http", function(projectList, $scope, $log, $http) {
    console.log("Project Controller Included");
    $scope.projectList = projectList;
    $scope.projectName = "";
    $scope.removeProject = function(id) {
        var requestObject = {
            method: 'POST',
            url: `${API_URL}/project/remove`,
            data: {
                projectId: id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
            }
        };
        $http(requestObject).then(function(response) {
            $scope.projectList = response.data;
        })
    }
    $scope.addProject = function() {
        var requestObject = {
            method: 'POST',
            url: `${API_URL}/project/add`,
            data: {
                projectName: $scope.projectName
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
            }
        };
        $http(requestObject).then(function(response) {
            $scope.projectList = response.data;
        })
    }

}]];

export {
    projectController
}