import {displaySingleCampus} from "./displaySingleCampus.js";
import {deleteCampus} from "./deleteCampus.js";

const displayHomeView = function (campuses) {
  const mainElement = document.createElement("main");
  mainElement.classList.add("main-content");
  const sectionElement = document.createElement("section");
  sectionElement.classList.add("campus-list");
  mainElement.appendChild(sectionElement);

  campuses.forEach((campus) => {
    let campusElement = document.createElement("div");
    campusElement.classList.add("campus");
    let campusLocationElement = document.createElement("h2");
    campusLocationElement.classList.add("campus-location");
    campusLocationElement.innerText = campus.location;

    campusLocationElement.addEventListener("click", () =>
      displaySingleCampus(campus)
    );

    let campusTechStackElement = document.createElement("h3");
    campusTechStackElement.classList.add("campus-tech-stack");
    campusTechStackElement.innerText = campus.techStack;
    let deleteButton = document.createElement("button");
    deleteButton.innerText = `Delete ${campus.location}`;
    deleteButton.addEventListener("click", () => deleteCampus(campus))

    campusElement.appendChild(campusLocationElement);
    campusElement.appendChild(campusTechStackElement);
    campusElement.appendChild(deleteButton);
    sectionElement.appendChild(campusElement);
  });
  return mainElement;
};



export { displayHomeView };

/* <main class="main-content">
      <section class="campus-list">
        <div class="campus">
            <h2 class="campus-location">Columbus</h2>
            <h3 class="campus-tech-stack">Java</h3>
        </div>
        <div class="campus">
            <h2 class="campus-location">Cleveland</h2>
            <h3 class="campus-tech-stack">C#</h3>
        </div>
        <div class="campus">
            <h2 class="campus-location">The MOON</h2>
            <h3 class="campus-tech-stack">JavaScript</h3>
        </div>
</section>
</main> */
