import { displayHomeView } from "./displayHomeView.js";
import { clearChildren } from "./displaySingleCampus.js";

const deleteCampus = function (campus) {
  const mainElement = document.querySelector(".main-content");

  clearChildren(mainElement);

  fetch(`http://localhost:8080/api/campuses/${campus.id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((campuses) => displayHomeView(campuses))
    .then((campusesElement) => mainElement.appendChild(campusesElement));
};

export { deleteCampus };
