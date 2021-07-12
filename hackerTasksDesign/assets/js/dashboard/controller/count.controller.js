var countController = ['countController', [
    '$http',
    '$scope',
    'targetCount',
    'projectCount',
    function($http, $scope, targetCount, projectCount) {
        $scope.targetCount = targetCount.count;
        $scope.projectCount = projectCount.count;

        console.log("Welcome to count controller")
    }
]];

export {
    countController
}