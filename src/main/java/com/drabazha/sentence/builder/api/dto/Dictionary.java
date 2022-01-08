package com.drabazha.sentence.builder.api.dto;

import com.drabazha.sentence.builder.api.domain.nosql.Word;
import com.drabazha.sentence.builder.api.exception.RestException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import static com.drabazha.sentence.builder.api.domain.SpeechPart.ADJECTIVE;
import static com.drabazha.sentence.builder.api.domain.SpeechPart.ADVERB;
import static com.drabazha.sentence.builder.api.domain.SpeechPart.NOUN;
import static com.drabazha.sentence.builder.api.domain.SpeechPart.VERB;
import static com.drabazha.sentence.builder.api.domain.WordGender.GENERAL;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Dictionary {

    private static final Random random = new Random();

    private List<Word> adjectives;

    private List<Word> nouns;

    private List<Word> verbs;

    private List<Word> adverbs;

    public Word getRandomWord(String speechPart, String wordGender) {
        Word word;
        switch (speechPart) {
            case NOUN:
                word = getRandomWord(nouns, wordGender);
                break;
            case ADJECTIVE:
                word = getRandomWord(adjectives, wordGender);
                break;
            case VERB:
                word = getRandomWord(verbs, wordGender);
                break;
            case ADVERB:
                word = getRandomWord(adverbs, wordGender);
                break;
            default:
                throw new RuntimeException(String.format("%s is not supported", speechPart));
        }
        return word;
    }

    public Word getRandomWord(String speechPart) {
        Word word;
        switch (speechPart) {
            case NOUN:
                word = getRandomWord(nouns);
                break;
            case ADJECTIVE:
                word = getRandomWord(adjectives);
                break;
            case VERB:
                word = getRandomWord(verbs);
                break;
            case ADVERB:
                word = getRandomWord(adverbs);
                break;
            default:
                throw new RuntimeException(String.format("%s is not supported", speechPart));
        }
        return word;
    }

    private Word getRandomWord(List<Word> collection, String wordGender) {
        validateCollection(collection);
        List<Word> filteredCollection = collection.stream()
                .filter(word -> word.hasGender() && (word.getWordGender().equals(wordGender) || GENERAL.equals(word.getWordGender())))
                .collect(Collectors.toList());
        return getRandomWord(filteredCollection);
    }

    private Word getRandomWord(List<Word> collection) {
        validateCollection(collection);
        return collection.get(random.nextInt(collection.size()));
    }

    private void validateCollection(List<Word> collection) {
        if (collection.isEmpty()) {
            throw new RestException("Not enough words in collection in order to build sequence");
        }
    }
}
