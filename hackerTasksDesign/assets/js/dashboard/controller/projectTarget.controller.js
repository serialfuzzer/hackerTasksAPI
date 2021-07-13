var projectTargetController = ['projectTargetController', [
    '$http', 'targetList', '$scope', '$stateParams',

    function($http, targetList, $scope, $stateParams) {
        $scope.projectId = $stateParams.id;
        $scope.targetList = targetList;
        console.log("Welcome to projectTargetController controller")
        $scope.isCurrentProject = function(target) {
            if (target.projectId == $scope.projectId) {
                return true;
            } else {
                return false;
            }
        }
    }
]];

export {
    projectTargetController
}