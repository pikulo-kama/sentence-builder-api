package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.cache.SentenceSchemaMetadataCache;
import com.drabazha.sentence.builder.api.domain.sql.SchemaWord;
import com.drabazha.sentence.builder.api.domain.sql.SchemaWordType;
import com.drabazha.sentence.builder.api.domain.sql.SentenceSchema;
import com.drabazha.sentence.builder.api.dto.SentenceBuilder;
import com.drabazha.sentence.builder.api.dto.WordMetadata;
import com.drabazha.sentence.builder.api.dto.form.SchemaForm;
import com.drabazha.sentence.builder.api.dto.form.SchemaWordForm;
import com.drabazha.sentence.builder.api.dto.response.SentenceSchemaResponse;
import com.drabazha.sentence.builder.api.exception.RestException;
import com.drabazha.sentence.builder.api.exception.UserResponse;
import com.drabazha.sentence.builder.api.repository.SchemaWordRepository;
import com.drabazha.sentence.builder.api.repository.SchemaWordTypeRepository;
import com.drabazha.sentence.builder.api.repository.SentenceSchemaRepository;
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

import static java.util.Objects.isNull;

@Service
public class SentenceSchemaServiceImpl implements SentenceSchemaService {

    private final SentenceSchemaRepository sentenceSchemaRepository;
    private final SchemaWordRepository schemaWordRepository;
    private final SchemaWordTypeRepository schemaWordTypeRepository;

    private static final Random random = new Random();

    @Autowired
    public SentenceSchemaServiceImpl(SentenceSchemaRepository sentenceSchemaRepository,
                                     SchemaWordRepository schemaWordRepository,
                                     SchemaWordTypeRepository schemaWordTypeRepository) {
        this.sentenceSchemaRepository = sentenceSchemaRepository;
        this.schemaWordRepository = schemaWordRepository;
        this.schemaWordTypeRepository = schemaWordTypeRepository;
    }

    @Override
    public List<SentenceSchemaResponse> getAll() {
        List<SentenceSchema> schemas = sentenceSchemaRepository.findAll();
        return schemas.stream().map(schema -> schema.mapToResponse(schemaWordRepository)).collect(Collectors.toList());
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

        Map<Long, SchemaWordType> wordTypes = getWordTypes(schemaForm);

        List<SchemaWord> words = schemaForm.getWords().stream()
                .sorted(Comparator.comparingInt(SchemaWordForm::getWordOrder))
                .map(wordForm -> SchemaWord.builder()
                        .sentenceSchemaId(persistedSchema.getSentenceSchemaId())
                        .wordOrder(wordForm.getWordOrder())
                        .schemaWordType(wordTypes.get(wordForm.getWordTypeId()))
                        .build())
                .collect(Collectors.toList());

        schemaWordRepository.saveAll(words);

        persistedSchema.setSchemaHash(schemaHash);
        SentenceSchemaResponse sentenceSchemaResponse = persistedSchema.mapToResponse(schemaWordRepository);
        return UserResponse.success("Schema successfully created",
                "sentenceSchema", Collections.singleton(sentenceSchemaResponse));
    }

    @Override
    public UserResponse deleteSchema(Long schemaSentenceId) {
        sentenceSchemaRepository.deleteById(schemaSentenceId);
        return UserResponse.success("Schema successfully deleted");
    }

    @Override
    public SentenceBuilder getSchema(Long sentenceSchemaId) {
        return isNull(sentenceSchemaId) ? getRandomSchema() : buildSchemaIterator(sentenceSchemaId);
    }

    /**
     Get random schema
     *
     * @return schema iterator that contains schema word metadata
     * that should be used to generate sentence(Also responsible for building sentence)
     */
    private SentenceBuilder getRandomSchema() {
        List<com.drabazha.sentence.builder.api.domain.sql.SentenceSchema> allSchemas = sentenceSchemaRepository.findAll();
        if (allSchemas.isEmpty()) {
            throw new RestException("No schemas available");
        }
        Long randomSchemaId = allSchemas.get(random.nextInt(allSchemas.size())).getSentenceSchemaId();
        return buildSchemaIterator(randomSchemaId);
    }

    private Map<Long, SchemaWordType> getWordTypes(SchemaForm schemaForm) {
        List<Long> ids = schemaForm.getWords().stream()
                .map(SchemaWordForm::getWordTypeId)
                .collect(Collectors.toList());

        return schemaWordTypeRepository.findAllBySchemaWordTypeIdIn(ids).stream()
                .collect(Collectors.toMap(SchemaWordType::getSchemaWordTypeId, wordType -> wordType));
    }

    /**
     * Used to get all words that are related to provided sentence schema.
     *
     *
     * @param sentenceSchemaId ID of schema for which builder should be created
     * @return sentence builder populated with schema words
     * @throws RestException when there are no words present for provided schema
     */
    private SentenceBuilder buildSchemaIterator(Long sentenceSchemaId) {

        List<WordMetadata> metadata = SentenceSchemaMetadataCache.<List<WordMetadata>, Long>getInstance()
                .getCachedObject(sentenceSchemaId, schemaId -> {

                    List<SchemaWord> schemaWords = schemaWordRepository.findSchemaWordsBySentenceSchemaIdOrderByWordOrder(sentenceSchemaId);
                    if (schemaWords.isEmpty()) {
                        throw new RestException("Schema doesn't exist");
                    }
                    return schemaWords.stream()
                            .map(word -> new WordMetadata(word.getSchemaWordType().getSchemaWordTypeId()))
                            .collect(Collectors.toList());
                });

        return new SentenceBuilder(metadata);
    }

    private String obtainSchemaHash(List<SchemaWordForm> schemaWords) {
        String rawSchemaHash = schemaWords.stream()
                .map(schemaWordForm -> schemaWordForm.getWordTypeId().toString())
                .collect(Collectors.joining());
        return Base64.getEncoder().encodeToString(rawSchemaHash.getBytes());
    }
}
