var checklistController = ['checklistController', [
    '$http', 'projectList', '$scope',

    function($http, projectList, $scope) {
        $scope.projectList = projectList;
        console.log("Welcome to checklist controller")
    }
]];

export {
    checklistController
}