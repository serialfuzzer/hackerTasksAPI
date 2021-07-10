var mainController = ['mainController', ['$scope', "$log", "$http", function($scope, $log, $http) {

    $scope.logout = function() {
        window.location.href = "/index.html";
    }

    $scope.notification = 0;

}]]

export {
    mainController
}