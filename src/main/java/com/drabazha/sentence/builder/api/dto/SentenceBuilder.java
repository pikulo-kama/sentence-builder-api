package com.drabazha.sentence.builder.api.dto;

import java.util.List;
import java.util.stream.Collectors;

public class SentenceBuilder {

    private final List<WordMetadata> wordMetadataList;

    public SentenceBuilder(List<WordMetadata> wordMetadataList) {
        this.wordMetadataList = wordMetadataList;
    }

    public Sentence generateSentence(Dictionary dictionary) {
        Sentence sentence = new Sentence();

        List<String> generatedWords = wordMetadataList.stream()
                .map(metadata -> dictionary.getRandomWord(metadata.getWordTypeId()).getContent())
                .collect(Collectors.toList());
        sentence.add(generatedWords);
        return sentence;
    }
}
