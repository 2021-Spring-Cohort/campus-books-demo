import {displaySingleCampus, clearChildren} from "./displaySingleCampus.js";
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
  const form = document.createElement("form");
  form.classList.add("new-campus-form");
  const locationInput = document.createElement("input");
  locationInput.classList.add("new-campus-location");
  locationInput.setAttribute("type", "text")
  locationInput.setAttribute("placeholder", "Location")
  const techStackInput = document.createElement("input");
  techStackInput.classList.add("new-campus-techStack");
  techStackInput.setAttribute("type", "text")
  techStackInput.setAttribute("placeholder", "Tech Stack");
  
  const submitCampusButton = document.createElement("button");
  submitCampusButton.classList.add("submit-campus");
  submitCampusButton.innerText= "Submit New Campus";
  const hr = document.createElement('hr');

  submitCampusButton.addEventListener("click", (clickEvent)=>{
    clickEvent.preventDefault();
    clearChildren(mainElement);
    const campusJson = {
      "location" : locationInput.value,
      "techStack" : techStackInput.value
    }
    fetch("http://localhost:8080/api/campuses", {
        method: 'POST', 
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(campusJson)
      })
      .then(response => response.json())
      .then(campuses => displayHomeView(campuses))
      .then(campusesElement => mainElement.appendChild(campusesElement))
      .catch(error => console.log(error));
  })



  
  form.appendChild(locationInput);
  form.appendChild(techStackInput);
  form.appendChild(submitCampusButton);
  form.appendChild(hr);
  sectionElement.prepend(form);
  //form.innerHTML = "<hr><br>"
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
