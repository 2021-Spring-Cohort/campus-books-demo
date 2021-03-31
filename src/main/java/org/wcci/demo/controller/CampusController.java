package org.wcci.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.wcci.demo.resources.Book;
import org.wcci.demo.resources.Campus;
import org.wcci.demo.service.CampusStorage;
import org.wcci.demo.service.repository.BookRepository;

@RestController
public class CampusController {
    private CampusStorage campusStorage;
    private BookRepository bookRepo;


    public CampusController(CampusStorage campusStorage, BookRepository bookRepo) {
        this.campusStorage = campusStorage;
        this.bookRepo = bookRepo;
    }

    @GetMapping("/api/campuses")
    public Iterable<Campus> retrieveAllCampuses(){
        return campusStorage.retrieveAllCampuses();
    }

    @GetMapping("/api/campuses/{id}")
    public Campus retrieveCampusById(@PathVariable Long id){
        return campusStorage.retrieveCampusById(id);
    }

    @DeleteMapping("/api/campuses/{id}")
    public Iterable<Campus> deleteCampusById(@PathVariable Long id){
        campusStorage.deleteCampusById(id);
        return campusStorage.retrieveAllCampuses();
    }

    @PostMapping("/api/campuses")
    public Iterable<Campus> addCampus(@RequestBody Campus campusToAdd){
        campusStorage.saveCampus(campusToAdd);
        return campusStorage.retrieveAllCampuses();
    }

    @PutMapping("/api/campuses")
    public Iterable<Campus> editCampus(@RequestBody Campus campusToEdit){
        if(campusToEdit.getId()!=null){
            campusStorage.saveCampus(campusToEdit);
        }
        return campusStorage.retrieveAllCampuses();
    }

    @PatchMapping("/api/campuses/{id}/location")
    public Campus changeCampusLocation(@RequestBody String newLocation, @PathVariable Long id){
        Campus campusToChange = campusStorage.retrieveCampusById(id);
        campusToChange.changeLocation(newLocation);
        campusStorage.saveCampus(campusToChange);
        return campusToChange;
    }
    @PatchMapping("/api/campuses/{campusId}/books")
    public Campus addBookToCampus(@RequestBody Book bookToAdd, @PathVariable Long campusId){
        Campus campus = campusStorage.retrieveCampusById(campusId);
        Book book = new Book(campus, bookToAdd.getTitle(), bookToAdd.getSummary(), true);
        bookRepo.save(book);
        return campusStorage.retrieveCampusById(campusId);
    }

}
