package org.wcci.demo.resources;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Campus {

    @Id
    @GeneratedValue
    private Long id;
    private String location;
    private String techStack;
    @OneToMany(mappedBy = "campus", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Book> books;


    public Campus(String location, String techStack){
        this.location = location;
        this.techStack = techStack;
    }

    protected Campus(){

    }


    public Long getId() {
        return id;
    }

    public String getLocation() {
        return location;
    }

    public String getTechStack() {
        return techStack;
    }

    public void changeLocation(String newLocation){
        location = newLocation;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Campus campus = (Campus) o;
        return Objects.equals(location, campus.location) &&
                Objects.equals(techStack, campus.techStack) &&
                Objects.equals(id, campus.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(location, techStack, id);
    }

    public List<Book> getBooks() {
        return books;
    }
}
