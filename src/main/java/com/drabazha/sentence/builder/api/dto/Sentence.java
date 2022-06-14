package com.drabazha.sentence.builder.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Sentence {

    private final List<Word> sentenceWords;

    public Sentence() {
        sentenceWords = new ArrayList<>();
    }

    /**
     * Used to add multiple words to sentence
     *
     * @param words Actual words
     */
    public void add(List<String> words) {
        words.forEach(this::add);
    }

    /**
     * Used to add word to sentence
     *
     * @param word Actual word
     */
    public void add(String word) {
        sentenceWords.add(new Word(word));
    }

    @Override
    public String toString() {
        List<String> words = this.sentenceWords.stream().map(Word::getContent).collect(Collectors.toList());
        return String.join(" ", words).toUpperCase();
    }

    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Word {

        @Getter
        private String content;
    }
}
