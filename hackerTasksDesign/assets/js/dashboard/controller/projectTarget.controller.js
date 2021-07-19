var projectTargetController = ['projectTargetController', [
    '$http', 'targetList', '$scope', '$stateParams', 'checklistInstances', 'checklists', '$state',

    function($http, targetList, $scope, $stateParams, checklistInstances, checklists, $state) {
        $scope.checklistInstances = checklistInstances;
        console.log(checklistInstances);
        $scope.checklists = checklists;
        $scope.projectId = $stateParams.id;
        $scope.targetList = targetList;


        if ($scope.checklists.length > 0) {
            $scope.selectedChecklist = $scope.checklists[0]["_id"];
        } else {
            $scope.selectedChecklist = "";
        }

        console.log("Welcome to projectTargetController controller")
        $scope.isCurrentProject = function(target) {
                if (target.projectId == $scope.projectId) {
                    return true;
                } else {
                    return false;
                }
            }
            /*
                Get id of the checklist instance and name of the checklist
                1. Fetch all checklist instances
                2. Check if there's an checklist instance for current target
                3. If there's an instance then go to step 4
                4. Store the checklist instance id and checklist id in a variable
                5. Get checklist details for that checklist ID and store the name in a variable
                6. return [checklistInstanceID and checklistName]
            */
        $scope.getChecklistInfo = function(target) {
            var returnObject = [];
            var checklistId = target.checklistId;
            var targetId = target._id;
            for (var i = 0; i < checklistInstances.length; i++) {
                if (returnObject.length > 0) {
                    break
                }
                var currentInstance = checklistInstances[i];
                if (targetId == currentInstance.targetId) {
                    var checklistInstanceID = currentInstance._id;
                    var checklistId = currentInstance.checklistId;
                    for (var j = 0; j < checklists.length; j++) {
                        var currentChecklist = checklists[j];
                        if (currentChecklist._id == checklistId) {
                            returnObject[0] = currentChecklist.title;
                            returnObject[1] = checklistInstanceID
                            break
                        }
                    }
                }
            }
            //console.log(returnObject);
            return returnObject;

        }

        $scope.selectChecklist = function(target) {
            console.log(target.selectedChecklist);
            var requestObject = {
                method: 'POST',
                url: `${API_URL}/checklist/makeChecklistInstance`,
                data: {
                    "checklistId": target.selectedChecklist,
                    "targetId": target._id
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("apiToken")}`
                }
            };
            $http(requestObject).then(function(response) {
                $state.reload();
            })
        }

    }
]];

export {
    projectTargetController
}