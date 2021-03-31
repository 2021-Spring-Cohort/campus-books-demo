import { displayHomeView } from "./displayHomeView.js";
import { allCampusJson } from "./sampleAllCampus.js";

const displaySingleCampus = function (campus) {
  const mainContent = document.querySelector(".main-content");
  clearChildren(mainContent);

  const campusLibraryElement = document.createElement("section");
  const libraryHeader = document.createElement("header");
  const campusLocationElement = document.createElement("h2");
  const campusTechStack = document.createElement("h3");
  const booksElement = document.createElement("section");
  const backToAllCampuses = document.createElement("a");

  libraryHeader.classList.add("campus-library-header");
  campusLibraryElement.classList.add("campus-library");
  campusLocationElement.classList.add("campus-library-header__location");
  campusTechStack.classList.add("campus-library-header__tech-stack");
  booksElement.classList.add("campus-books");
  backToAllCampuses.classList.add("back-navigation");

  campusLocationElement.innerText = campus.location;
  campusTechStack.innerText = campus.techStack;
  backToAllCampuses.innerText = "Back to Campus List!!!!";

  mainContent.appendChild(campusLibraryElement);
  libraryHeader.appendChild(campusLocationElement);
  libraryHeader.appendChild(campusTechStack);
  campusLibraryElement.appendChild(libraryHeader);
  campusLibraryElement.appendChild(booksElement);
  campusLibraryElement.appendChild(backToAllCampuses);

  campus.books.forEach((book) => {
    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("book-title");
    bookTitle.innerText = book.title;
    booksElement.appendChild(bookTitle);

    bookTitle.addEventListener("click", () => {
      alert(`This book's summary is: ${book.summary}`);
    });
  });

  // backToAllCampuses.addEventListener("click", (clickEvent) => {
  //   clearChildren(mainContent);
  //   mainContent.appendChild(displayHomeView(allCampusJson));
  // });

  backToAllCampuses.addEventListener('click',()=>{
      clearChildren(mainContent);
      fetch('http://localhost:8080/api/campuses')
        .then(response => response.json())
        .then(campuses => displayHomeView(campuses))
        .then(campusesElement => mainContent.appendChild(campusesElement))
        .catch(error => console.log(error));
  })

};



const clearChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
}

export { displaySingleCampus, clearChildren };

//   <main class="main-content">
//   <section class="campus-library">
//       <header class="campus-library-header">
//           <h2 class="campus-library-header__location">Columbus</h2>
//           <h3 class="campus-library-header__tech-stack">Java</h3>
//       </header>
//       <section class="campus-books">
//           <h3 class="book-title">Head First Java</h3>
//           <h3 class="book-title">Head First Design Patterns</h3>
//           <h3 class="book-title">Test Driven Development by Example</h3>
//       </section>
//       <a class="back-navigation">back to campus listings</a>
//   </section>
// </main>
