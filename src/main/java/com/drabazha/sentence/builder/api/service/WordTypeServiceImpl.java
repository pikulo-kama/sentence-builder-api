package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.domain.sql.SchemaWordType;
import com.drabazha.sentence.builder.api.dto.form.WordTypeCreateForm;
import com.drabazha.sentence.builder.api.dto.response.WordTypeResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.repository.SchemaWordTypeRepository;
import com.drabazha.sentence.builder.api.repository.WordRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class WordTypeServiceImpl implements WordTypeService {

    private final SchemaWordTypeRepository wordTypeRepository;
    private final WordRepository wordRepository;

    public WordTypeServiceImpl(SchemaWordTypeRepository wordTypeRepository,
                               WordRepository wordRepository) {
        this.wordTypeRepository = wordTypeRepository;
        this.wordRepository = wordRepository;
    }

    @Override
    public List<SchemaWordType> findAll() {
        return wordTypeRepository.findAll();
    }

    @Override
    public List<WordTypeResponse> findAllWordTypes() {
        List<SchemaWordType> wordTypes = wordTypeRepository.findAll();
        return wordTypes.stream().map(SchemaWordType::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public UserResponse createWordType(WordTypeCreateForm wordTypeCreateForm) {
        SchemaWordType newWordType = SchemaWordType.builder()
                .schemaWordTypeName(wordTypeCreateForm.getWordTypeName())
                .build();

        SchemaWordType persistedWordType = wordTypeRepository.save(newWordType);
        return UserResponse.success("Word type successfully added",
                "wordType", persistedWordType.mapToResponse());
    }

    @Override
    public UserResponse deleteWordType(Long wordTypeId) {
        wordRepository.deleteByWordTypeId(wordTypeId);
        wordTypeRepository.deleteById(wordTypeId);

        return UserResponse.success("Word type successfully deleted",
                "deletedWordTypeId", wordTypeId);
    }
}
