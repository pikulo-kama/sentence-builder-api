package com.drabazha.sentence.builder.api.controller.rest;

import com.drabazha.sentence.builder.api.dto.form.WordCollectionForm;
import com.drabazha.sentence.builder.api.dto.form.WordDeleteForm;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.private}/words")
public class WordRestController {

    private final WordService wordService;

    @Autowired
    public WordRestController(WordService wordService) {
        this.wordService = wordService;
    }

    @GetMapping
    public UserResponse getWordGroupedCollection() {
        return wordService.findAll();
    }

    @PostMapping("/create")
    public UserResponse create(@RequestBody @Validated WordCollectionForm wordCollectionForm) {
        return wordService.create(wordCollectionForm);
    }

    @DeleteMapping("/delete")
    public UserResponse delete(@RequestBody @Validated WordDeleteForm wordDeleteForm) {
        return wordService.delete(wordDeleteForm);
    }
}
