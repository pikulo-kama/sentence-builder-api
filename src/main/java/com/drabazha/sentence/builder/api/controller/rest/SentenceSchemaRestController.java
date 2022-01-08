package com.drabazha.sentence.builder.api.controller.rest;

import com.drabazha.sentence.builder.api.dto.form.SchemaForm;
import com.drabazha.sentence.builder.api.dto.response.SentenceSchemaResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.service.SentenceSchemaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v2/schemas")
public class SentenceSchemaRestController {

    private final SentenceSchemaService sentenceSchemaService;

    @Autowired
    public SentenceSchemaRestController(SentenceSchemaService sentenceSchemaService) {
        this.sentenceSchemaService = sentenceSchemaService;
    }

    @GetMapping
    public List<SentenceSchemaResponse> getSchemas() {
        return sentenceSchemaService.getAll();
    }

    @PostMapping("/create")
    public UserResponse create(@RequestBody @Validated SchemaForm schemaForm) {
        return sentenceSchemaService.createSchema(schemaForm);
    }

    @PostMapping("/delete/{id}")
    public UserResponse delete(@PathVariable("id") Long sentenceSchemaId) {
        return sentenceSchemaService.deleteSchema(sentenceSchemaId);
    }
}
