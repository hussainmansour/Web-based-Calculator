package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

public class controller {

    @Autowired
    private service s;


    @PostMapping("/getResult")
    public String getResult(@RequestBody String operation) {
        return s.getResult(operation);
    }


    @PostMapping("/getValue")
    public String getValue(@RequestBody String operation) {
        return s.getValue(operation);
    }

}
