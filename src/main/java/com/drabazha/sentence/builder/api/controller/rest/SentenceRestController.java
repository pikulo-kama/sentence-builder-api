package com.drabazha.sentence.builder.api.controller.rest;

import com.drabazha.sentence.builder.api.dto.response.SentenceCollectionResponse;
import com.drabazha.sentence.builder.api.service.SentenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.public}/sentences")
public class SentenceRestController {

    private final SentenceGeneratorService sentenceService;

    @Autowired
    public SentenceRestController(SentenceGeneratorService sentenceService) {
        this.sentenceService = sentenceService;
    }

    @GetMapping(value = "/generate", produces = "application/json")
    public SentenceCollectionResponse getSentences(@RequestParam(value = "c", required = false, defaultValue = "1")
                                                           Integer sentenceCount) {
        return sentenceService.generateSentences(sentenceCount);
    }

    @GetMapping(value = "/generate-by-schema", produces = "application/json")
    public SentenceCollectionResponse getSentencesBySchema(@RequestParam(value = "id") Long sentenceSchemaId,
                                                           @RequestParam(value = "c", required = false, defaultValue = "1")
                                                                   Integer sentenceCount) {
        return sentenceService.generateSentences(sentenceCount, sentenceSchemaId);
    }

}
