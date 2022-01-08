package com.drabazha.sentence.builder.api.controller;

import com.drabazha.sentence.builder.api.service.SentenceSchemaService;
import com.drabazha.sentence.builder.api.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping
public class LandingController {

    private final SentenceSchemaService sentenceSchemaService;
    private final WordService wordService;

    @Autowired
    public LandingController(SentenceSchemaService sentenceSchemaService, WordService wordService) {
        this.sentenceSchemaService = sentenceSchemaService;
        this.wordService = wordService;
    }

    @GetMapping
    public String getLandingPage(Model model) {
        model.addAttribute("schemas", sentenceSchemaService);
        return "index";
    }
}
