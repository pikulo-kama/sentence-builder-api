package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.domain.sql.SchemaWord;
import com.drabazha.sentence.builder.api.domain.sql.SentenceSchema;
import com.drabazha.sentence.builder.api.dto.SentenceSchemaIterator;
import com.drabazha.sentence.builder.api.dto.WordMetadata;
import com.drabazha.sentence.builder.api.dto.form.SchemaForm;
import com.drabazha.sentence.builder.api.dto.form.SchemaWordForm;
import com.drabazha.sentence.builder.api.dto.response.SchemaWordResponse;
import com.drabazha.sentence.builder.api.dto.response.SentenceSchemaResponse;
import com.drabazha.sentence.builder.api.exception.RestException;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.repository.SchemaWordRepository;
import com.drabazha.sentence.builder.api.repository.SentenceSchemaRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Base64;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class SentenceSchemaServiceImpl implements SentenceSchemaService {

    private final SentenceSchemaRepository sentenceSchemaRepository;
    private final SchemaWordRepository schemaWordRepository;

    private static final Random random = new Random();

    @Autowired
    public SentenceSchemaServiceImpl(SentenceSchemaRepository sentenceSchemaRepository, SchemaWordRepository schemaWordRepository) {
        this.sentenceSchemaRepository = sentenceSchemaRepository;
        this.schemaWordRepository = schemaWordRepository;
    }

    @Override
    public List<SentenceSchemaResponse> getAll() {
        List<SentenceSchema> schemas = sentenceSchemaRepository.findAll();
        return schemas.stream().map(this::mapSchemaToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserResponse createSchema(SchemaForm schemaForm) {
        if (schemaForm.getWords().isEmpty()) {
            throw new RestException("You should add at least one word to the schema");
        }

        SentenceSchema persistedSchema = sentenceSchemaRepository.save(com.drabazha.sentence.builder.api.domain.sql.SentenceSchema.builder().build());

        List<SchemaWordForm> sortedSchemaWordForms = schemaForm.getWords().stream()
                .sorted(Comparator.comparingInt(SchemaWordForm::getWordOrder))
                .collect(Collectors.toList());

        String schemaHash = obtainSchemaHash(sortedSchemaWordForms);
        if (sentenceSchemaRepository.existsBySchemaHash(schemaHash)) {
            throw new RestException("Schema with current structure already exists");
        }

        persistedSchema.setSchemaHash(schemaHash);
        sentenceSchemaRepository.save(persistedSchema);

        List<SchemaWord> words = schemaForm.getWords().stream()
                .sorted(Comparator.comparingInt(SchemaWordForm::getWordOrder))
                .map(wordForm -> SchemaWord.builder()
                        .sentenceSchemaId(persistedSchema.getSentenceSchemaId())
                        .wordOrder(wordForm.getWordOrder())
                        .speechPart(wordForm.getSpeechPart())
                        .wordGender(wordForm.getWordGender())
                        .build())
                .collect(Collectors.toList());

        schemaWordRepository.saveAll(words);

        persistedSchema.setSchemaHash(schemaHash);
        SentenceSchemaResponse sentenceSchemaResponse = mapSchemaToResponse(persistedSchema);
        return UserResponse.success("Schema successfully created",
                Map.of("sentenceSchema", Collections.singleton(sentenceSchemaResponse)));
    }
    
    @Override
    public UserResponse deleteSchema(Long schemaSentenceId) {
        sentenceSchemaRepository.deleteById(schemaSentenceId);
        return UserResponse.success("Schema successfully deleted");
    }

    @Override
    public SentenceSchemaIterator getSchema(Long sentenceSchemaId) {
        return buildSchemaIterator(sentenceSchemaId);
    }

    @Override
    public SentenceSchemaIterator getRandomSchema() {
        List<com.drabazha.sentence.builder.api.domain.sql.SentenceSchema> allSchemas = sentenceSchemaRepository.findAll();
        if (allSchemas.isEmpty()) {
            throw new RestException("No schemas available");
        }
        Long randomSchemaId = allSchemas.get(random.nextInt(allSchemas.size())).getSentenceSchemaId();
        return buildSchemaIterator(randomSchemaId);
    }

    private SentenceSchemaIterator buildSchemaIterator(Long sentenceSchemaId) {
        List<SchemaWord> schemaWords = schemaWordRepository.findSchemaWordsBySentenceSchemaIdOrderByWordOrder(sentenceSchemaId);
        if (schemaWords.isEmpty()) {
            throw new RestException("Schema doesn't exist");
        }
        List<WordMetadata> wordMetadata = schemaWords.stream()
                .map(word -> WordMetadata.builder()
                        .speechPart(word.getSpeechPart())
                        .gender(word.getWordGender())
                        .build())
                .collect(Collectors.toList());

        return new SentenceSchemaIterator(wordMetadata);
    }

    private String obtainSchemaHash(List<SchemaWordForm> schemaWords) {
        String rawSchemaHash = schemaWords.stream()
                .map(word -> word.getSpeechPart() + word.getWordGender())
                .collect(Collectors.joining());
        return Base64.getEncoder().encodeToString(rawSchemaHash.getBytes());
    }

    private SentenceSchemaResponse mapSchemaToResponse(com.drabazha.sentence.builder.api.domain.sql.SentenceSchema schema) {
        List<SchemaWord> words = schemaWordRepository.findSchemaWordsBySentenceSchemaIdOrderByWordOrder(schema.getSentenceSchemaId());

        List<SchemaWordResponse> wordResponseDtoList = words.stream()
                .map(word -> SchemaWordResponse.builder()
                        .speechPart(word.getSpeechPart())
                        .wordGender(word.getWordGender())
                        .build())
                .collect(Collectors.toList());

        return SentenceSchemaResponse.builder()
                .words(wordResponseDtoList)
                .sentenceSchemaId(schema.getSentenceSchemaId())
                .build();
    }
}
