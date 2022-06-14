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

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Dictionary {

    private static final Random random = new Random();

    private List<Word> words;

    public Word getRandomWord(Long wordTypeId) {
        List<Word> filteredWords = words.stream()
                .filter(word -> word.getWordTypeId().equals(wordTypeId))
                .collect(Collectors.toList());

        return filteredWords.stream()
                .skip(random.nextInt(filteredWords.size()))
                .findFirst()
                .orElseThrow(() -> new RestException("No words exist with specified word type"));
    }
}
