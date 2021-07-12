import { dashboardApp } from './dashboard.route.js';
import { mainController } from './controller/main.controller.js';
import { targetController } from './controller/target.controller.js';
import { projectController } from './controller/project.controller.js';
import { checklistController } from './controller/checklist.controller.js';
import { countController } from './controller/count.controller.js';
import { collaborationController } from './controller/collaboration.controller.js';

var API_URL = "http://127.0.0.1:1337/api"
console.log(checklistController)

// controllers
dashboardApp
    .controller(mainController[0], mainController[1])
    .controller(targetController[0], targetController[1])
    .controller(projectController[0], projectController[1])
    .controller(checklistController[0], checklistController[1])
    .controller(countController[0], countController[1])
    .controller(collaborationController[0], collaborationController[1])



/* Required JS */
if (window.localStorage.getItem("apiToken") == undefined || window.localStorage.getItem("apiToken") == "") {
    window.location.href = "/app";
}


export {
    dashboardApp
}