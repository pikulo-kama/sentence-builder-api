package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.dto.Dictionary;
import com.drabazha.sentence.builder.api.dto.SentenceBuilder;
import com.drabazha.sentence.builder.api.dto.response.SentenceCollectionResponse;
import com.drabazha.sentence.builder.api.utils.ListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        return generateSentences(sentenceCount, null);
    }

    @Override
    public SentenceCollectionResponse generateSentences(Integer sentenceCount, Long schemaId) {
        Dictionary dictionary = wordService.createDictionary();

        List<String> sentences = generateUniqueSentences(dictionary, sentenceCount, schemaId);
        return new SentenceCollectionResponse(sentences);
    }

    private List<String> generateUniqueSentences(Dictionary dictionary, Integer sentenceCount, Long schemaId) {

        List<String> sentences = new ArrayList<>();

        IntStream.range(0, sentenceCount).forEach(i -> {
            String sentence;

            do {
                sentence = sentenceSchemaService.getSchema(schemaId).generateSentence(dictionary).toString();
            } while (sentences.contains(sentence));

            sentences.add(sentence);
        });

        return sentences;
    }
}
