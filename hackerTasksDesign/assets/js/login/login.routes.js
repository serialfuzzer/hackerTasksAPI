var hackerTasks = angular.module('hackerTasks', ['ui.router']);
var API_URL = "http://127.0.0.1:1337/api"


hackerTasks.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('', '/home');

    var homeState = {
        name: 'home',
        url: '/home',
        templateUrl: 'assets/templates/homeTemplates/loginTemplate/login.html'
    }

    var signUpState = {
        name: 'signup',
        url: '/signup',
        templateUrl: 'assets/templates/homeTemplates/loginTemplate/signup.html'
    }


    $stateProvider.state("home", homeState);
    $stateProvider.state("signup", signUpState);

})

export {
    hackerTasks
}