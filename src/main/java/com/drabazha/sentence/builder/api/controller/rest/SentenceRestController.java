package com.drabazha.sentence.builder.api.controller.rest;

import com.drabazha.sentence.builder.api.dto.response.SentenceCollectionResponse;
import com.drabazha.sentence.builder.api.service.SentenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static java.util.Objects.nonNull;

@RestController
@RequestMapping("/api/v2/sentences")
public class SentenceRestController {

    private final SentenceGeneratorService sentenceService;

    @Autowired
    public SentenceRestController(SentenceGeneratorService sentenceService) {
        this.sentenceService = sentenceService;
    }

    @GetMapping(value = "/generate", produces = "application/json")
    public SentenceCollectionResponse getSentences(@RequestParam(value = "c", required = false) Integer sentenceCount) {
        return sentenceService.generateSentences(validateSentenceCount(sentenceCount));
    }

    @GetMapping(value = "/generate-by-schema", produces = "application/json")
    public SentenceCollectionResponse getSentencesBySchema (@RequestParam(value = "id") Long sentenceSchemaId,
                                          @RequestParam(value = "c", required = false) Integer sentenceCount) {
        return sentenceService.generateSentences(validateSentenceCount(sentenceCount), sentenceSchemaId);
    }

    private Integer validateSentenceCount(Integer sentenceCount) {
        return nonNull(sentenceCount) ? sentenceCount : 1;
    }
}
