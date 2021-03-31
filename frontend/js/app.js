import {
    createHeader
} from "/js/Header.js"

import {
    createFooter
} from "/js/Footer.js"
import {
    allCampusJson
} from "/js/sampleAllCampus.js"

import {
    displayHomeView
} from "/js/displayHomeView.js"
const container = document.querySelector(".container");
container.append(createHeader());

const mainElement = document.createElement("main");
mainElement.classList.add("main-content");
container.appendChild(mainElement);

//container.append(displayHomeView(allCampusJson))
fetch("http://localhost:8080/api/campuses")
    .then(response => response.json())
    .then(campuses => displayHomeView(campuses))
    .then(campusesElement => mainElement.appendChild(campusesElement))
    .catch(error => console.log(error));




container.append(createFooter());
