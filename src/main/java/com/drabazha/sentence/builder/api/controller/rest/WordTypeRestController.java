package com.drabazha.sentence.builder.api.controller.rest;

import com.drabazha.sentence.builder.api.dto.form.WordTypeCreateForm;
import com.drabazha.sentence.builder.api.dto.response.WordTypeResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.service.WordTypeService;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("${api.private}/words/types")
public class WordTypeRestController {

    private final WordTypeService wordTypeService;

    public WordTypeRestController(WordTypeService wordTypeService) {
        this.wordTypeService = wordTypeService;
    }

    @GetMapping
    public List<WordTypeResponse> findAllWordTypes() {
        return wordTypeService.findAllWordTypes();
    }

    @PostMapping("/create")
    public UserResponse createWordType(@Validated @RequestBody WordTypeCreateForm wordTypeCreateForm) {
        return wordTypeService.createWordType(wordTypeCreateForm);
    }

    @DeleteMapping("/delete/{id}")
    public UserResponse deleteWordType(@PathVariable("id") Long wordTypeId) {
        return wordTypeService.deleteWordType(wordTypeId);
    }
}
