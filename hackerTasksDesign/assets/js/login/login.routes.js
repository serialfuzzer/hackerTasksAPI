var hackerTasks = angular.module('hackerTasks', ['ui.router']);
var API_URL = "http://127.0.0.1:1337/api"


hackerTasks.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.when('', '/');

    var homeState = {
        name: 'home',
        url: '/',
        templateUrl: 'assets/templates/homeTemplates/loginTemplate/login.html'
    }



    $stateProvider.state("/", homeState);

})

export {
    hackerTasks
}