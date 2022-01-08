package com.drabazha.sentence.builder.api.dto;

import com.drabazha.sentence.builder.api.domain.nosql.Word;

import java.util.List;

public class SentenceSchemaIterator {

    private final List<WordMetadata> wordMetadata;

    private Integer cursor;

    public SentenceSchemaIterator(List<WordMetadata> wordMetadata) {
        this.wordMetadata = wordMetadata;
        cursor = -1;
    }

    public Sentence generateSentence(Dictionary dictionary) {
        Sentence sentence = new Sentence();

        while (next()) {
            WordMetadata wordMetadata = this.wordMetadata.get(cursor);
            Word randomWord;

            if (wordMetadata.hasGender()) {
                randomWord = dictionary.getRandomWord(wordMetadata.getSpeechPart(), wordMetadata.getGender());
            } else {
                randomWord = dictionary.getRandomWord(wordMetadata.getSpeechPart());
            }
            sentence.add(randomWord.getContent());
        }
        return sentence;
    }

    public void resetCursor() {
        this.cursor = -1;
    }

    private Boolean next() {
        return ++cursor < wordMetadata.size();
    }
}
