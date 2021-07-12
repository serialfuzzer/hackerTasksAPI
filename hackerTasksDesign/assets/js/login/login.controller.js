import { hackerTasks } from './login.routes.js';
var API_URL = "http://127.0.0.1:1337/api"


hackerTasks.controller('loginController', ['$scope', "$log", "$http", function($scope, $log, $http) {
    $scope.email = "";
    $scope.password = "";
    $scope.incorrectPassword = 0;

    // Email validation function    
    $scope.validateEmail = function(email) {
        if (email !== "") {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !(re.test(email));
        }
        return false;
    }

    // Execute this function when submit button is clicked
    $scope.login = function() {
        $http({
            method: 'POST',
            url: `${API_URL}/users/login`,
            data: {
                email: $scope.email,
                password: $scope.password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(result) {
            // if login is successful
            $scope.incorrectPassword = 0;
            localStorage.setItem('apiToken', result.data.token);
            window.location.href = "dashboard.html";
        }, function(error) {
            // if there's an issue during logging ing
            $scope.incorrectPassword = 1;
            console.log(`Error at: ${error}`);
        });

    }
}])
hackerTasks.controller('signupController', ['$scope', '$http', function($scope, $http) {
    console.log("Welcome to the registration controller!")
    $scope.fistname = '';
    $scope.lastname = '';
    $scope.email = '';
    $scope.password = '';
    $scope.username = '';
    $scope.registerFailedMessage = '';
    $scope.registerSuccess = 0;
    $scope.validateEmail = function(email) {
        if (email !== "") {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return !(re.test(email));
        }
        return false;
    }
    $scope.register = function() {
        var requestObject = {
            method: 'POST',
            url: `${API_URL}/users/register`,
            data: {
                firstName: $scope.firstname,
                lastName: $scope.lastname,
                email: $scope.email,
                password: $scope.password,
                username: $scope.username
            },
            headers: {
                'Content-Type': 'application/json',
            }
        };
        $http(requestObject).then(function(response) {
            $scope.registerFailedMessage = '';
            $scope.registerSuccess = 1;
            $scope.projectList = response.data;
            window.setTimeout(function() { window.location.hash = "#!/home" }, 3000)
        }).catch(function(err) {
            console.log(err)
            if (err.statusText === "Forbidden") {
                if (Object.keys(err.data)[0] == "email") {
                    $scope.registerFailedMessage = "Registration failed because the email already exists";
                } else if (Object.keys(err.data)[0] == "password") {
                    $scope.registerFailedMessage = err.data.password.msg;
                }
                $scope.registrationError = 1;
                console.log("Email exists")
            }
        })
    }
}])




export {
    hackerTasks
}