package org.wcci.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.wcci.demo.resources.Campus;
import org.wcci.demo.service.CampusStorage;

@RestController
public class CampusController {
    private CampusStorage campusStorage;


    public CampusController(CampusStorage campusStorage) {
        this.campusStorage = campusStorage;
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
}
