package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.dto.Dictionary;
import com.drabazha.sentence.builder.api.dto.SentenceBuilder;
import com.drabazha.sentence.builder.api.dto.response.SentenceCollectionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class SentenceGeneratorServiceImpl implements SentenceGeneratorService {

    private final SentenceSchemaService sentenceSchemaService;
    private final WordService wordService;

    @Autowired
    public SentenceGeneratorServiceImpl(SentenceSchemaService sentenceSchemaService,
                                        WordService wordService) {
        this.sentenceSchemaService = sentenceSchemaService;
        this.wordService = wordService;
    }

    @Override
    public SentenceCollectionResponse generateSentences(Integer sentenceCount) {
        Dictionary dictionary = wordService.createDictionary();
        List<String> sentences = IntStream.range(0, sentenceCount).boxed()
                .map(i -> sentenceSchemaService.getRandomSchema().generateSentence(dictionary).toString())
                .collect(Collectors.toList());
        return new SentenceCollectionResponse(sentences);
    }

    @Override
    public SentenceCollectionResponse generateSentences(Integer sentenceCount, Long schemaId) {
        Dictionary dictionary = wordService.createDictionary();
        SentenceBuilder schemaIterator = sentenceSchemaService.getSchema(schemaId);
        List<String> sentences = IntStream.range(0, sentenceCount).boxed()
                .map(i -> schemaIterator.generateSentence(dictionary).toString())
                .collect(Collectors.toList());
        return new SentenceCollectionResponse(sentences);
    }
}
