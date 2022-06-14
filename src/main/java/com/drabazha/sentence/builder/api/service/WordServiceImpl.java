package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.domain.nosql.Word;
import com.drabazha.sentence.builder.api.dto.Dictionary;
import com.drabazha.sentence.builder.api.dto.form.WordCollectionForm;
import com.drabazha.sentence.builder.api.dto.form.WordDeleteForm;
import com.drabazha.sentence.builder.api.dto.response.WordGroupCollectionResponse;
import com.drabazha.sentence.builder.api.dto.response.WordGroupResponse;
import com.drabazha.sentence.builder.api.dto.response.WordResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.repository.WordRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import static com.drabazha.sentence.builder.api.domain.SpeechPart.ADJECTIVE;
import static com.drabazha.sentence.builder.api.domain.SpeechPart.ADVERB;
import static com.drabazha.sentence.builder.api.domain.SpeechPart.NOUN;
import static com.drabazha.sentence.builder.api.domain.SpeechPart.VERB;

@Service
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;

    @Autowired
    public WordServiceImpl(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    @Override
    public UserResponse create(WordCollectionForm wordCollectionForm) {
        List<Word> words = wordCollectionForm.getWords().stream().map(wordForm -> {
            String encodedWord = encodeWord(wordForm.getContent());
            return Word.builder()
                    .content(encodedWord)
                    .speechPart(wordCollectionForm.getSpeechPart())
                    .wordGender(wordForm.getWordGender())
                    .build();
        }).collect(Collectors.toList());
        wordRepository.saveAll(words);
        return UserResponse.success(String.format("%d words was successfully created", words.size()));
    }

    @Override
    public UserResponse delete(WordDeleteForm wordDeleteForm) {
        wordRepository.deleteByContent(wordDeleteForm.getWordContent());
        return UserResponse.success(String.format("Word '%s' successfully deleted", wordDeleteForm.getWordContent()));
    }

    @Override
    public WordGroupCollectionResponse findAllAndGroup() {
        Dictionary dictionary = createDictionary();

        WordGroupResponse nounGroup = mapWordsToWordGroup(dictionary.getNouns(), NOUN);
        WordGroupResponse adjectiveGroup = mapWordsToWordGroup(dictionary.getAdjectives(), ADJECTIVE);
        WordGroupResponse verbGroup = mapWordsToWordGroup(dictionary.getVerbs(), VERB);
        WordGroupResponse adverbGroup = mapWordsToWordGroup(dictionary.getAdverbs(), ADVERB);

        return WordGroupCollectionResponse.builder()
                .wordSets(List.of(nounGroup, adjectiveGroup, verbGroup, adverbGroup))
                .build();

    }

    @Override
    public Dictionary createDictionary() {
        List<Word> allWords = wordRepository.findAll();
        return Dictionary.builder()
                .nouns(extractSpeechPart(allWords, NOUN))
                .adjectives(extractSpeechPart(allWords, ADJECTIVE))
                .adverbs(extractSpeechPart(allWords, ADVERB))
                .verbs(extractSpeechPart(allWords, VERB))
                .build();
    }

    private String encodeWord(String word) {
        byte[] wordBytes = word.getBytes();
        return new String(wordBytes, StandardCharsets.UTF_8);
    }

    private List<Word> extractSpeechPart(List<Word> collection, String speechPart) {
        return collection.stream().filter(word -> word.getSpeechPart().equals(speechPart))
                .collect(Collectors.toList());
    }

    private WordGroupResponse mapWordsToWordGroup(List<Word> words, String speechPart) {
        List<WordResponse> wordResponseList = words.stream()
                .map(word -> WordResponse.builder()
                        .content(word.getContent())
                        .wordGender(word.getWordGender())
                        .build())
                .collect(Collectors.toList());
        return new WordGroupResponse(speechPart, wordResponseList);
    }
}
