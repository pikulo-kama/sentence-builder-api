package com.drabazha.sentence.builder.api.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Sentence {

    private List<SentenceWord> sentenceWords;

    public Sentence() {
        sentenceWords = new ArrayList<>();
    }

    /**
     * Used to add word to sentence
     *
     * @param word Actual word
     */
    public void add(String word) {
        sentenceWords.add(new SentenceWord(word));
    }

    @Override
    public String toString() {
        List<String> words = sentenceWords.stream().map(SentenceWord::getContent).collect(Collectors.toList());
        return String.join(" ", words).toUpperCase();
    }
}
