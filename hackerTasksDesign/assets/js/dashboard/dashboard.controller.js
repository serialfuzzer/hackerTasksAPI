import { dashboardApp } from './dashboard.route.js';
import { mainController } from './controller/main.controller.js';
import { targetController } from './controller/target.controller.js';
import { projectController } from './controller/project.controller.js';

var API_URL = "http://127.0.0.1:1337/api"


// controllers
dashboardApp
    .controller(mainController[0], mainController[1])
    .controller(targetController[0], targetController[1])
    .controller(projectController[0], projectController[1])



/* Required JS */
if (window.localStorage.getItem("apiToken") == undefined || window.localStorage.getItem("apiToken") == "") {
    window.location.href = "/index.html";
}


export {
    dashboardApp
}