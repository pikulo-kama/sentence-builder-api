package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.domain.nosql.Word;
import com.drabazha.sentence.builder.api.domain.sql.SchemaWordType;
import com.drabazha.sentence.builder.api.dto.Dictionary;
import com.drabazha.sentence.builder.api.dto.form.WordCollectionForm;
import com.drabazha.sentence.builder.api.dto.form.WordDeleteForm;
import com.drabazha.sentence.builder.api.dto.response.WordResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class WordServiceImpl implements WordService {

    private final WordRepository wordRepository;
    private final WordTypeService wordTypeService;

    @Autowired
    public WordServiceImpl(WordRepository wordRepository,
                           WordTypeService wordTypeService) {
        this.wordRepository = wordRepository;
        this.wordTypeService = wordTypeService;
    }

    @Override
    public UserResponse findAll() {
        List<SchemaWordType> wordTypes = wordTypeService.findAll();

        List<WordResponse> wordResponseList = createDictionary().getWords().stream()
                .map(word -> word.mapToResponse(wordTypes))
                .collect(Collectors.toList());

        return UserResponse.success("All words retrieved",
                "wordResponseList", wordResponseList);
    }

    @Override
    public UserResponse create(WordCollectionForm wordCollectionForm) {
        List<Word> words = wordCollectionForm.getWords().stream()
                .map(wordForm ->
                        Word.builder()
                                .wordTypeId(wordForm.getWordTypeId())
                                .content(encodeWord(wordForm.getContent()))
                                .build())
                .collect(Collectors.toList());
        wordRepository.saveAll(words);

        return UserResponse.success(String.format("%d words was successfully created", words.size()));
    }

    @Override
    public UserResponse delete(WordDeleteForm wordDeleteForm) {
        wordRepository.deleteByContent(wordDeleteForm.getWordContent());
        return UserResponse.success(String.format("Word '%s' successfully deleted",
                wordDeleteForm.getWordContent()));
    }

    @Override
    public Dictionary createDictionary() {
        return new Dictionary(wordRepository.findAll());
    }

    private String encodeWord(String word) {
        byte[] wordBytes = word.getBytes();
        return new String(wordBytes, StandardCharsets.UTF_8);
    }
}
