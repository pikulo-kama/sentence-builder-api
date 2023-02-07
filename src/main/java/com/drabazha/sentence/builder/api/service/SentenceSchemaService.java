package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.dto.SentenceBuilder;
import com.drabazha.sentence.builder.api.dto.form.SchemaForm;
import com.drabazha.sentence.builder.api.dto.response.SentenceSchemaResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;

import java.util.List;

/**
 * This service should be used to perform operations related to sentence schema.
 */
public interface SentenceSchemaService {

    /**
     * Returns all available schemas that could be
     * used to build a sentence
     *
     * @return list of schemas
     */
    List<SentenceSchemaResponse> getAll();

    /**
     * Get specific schema
     *
     * @param sentenceSchemaId unique id of schema
     * @return schema iterator that contains schema word metadata
     * that should be used to generate sentence(Also responsible for building sentence)
     */
    SentenceBuilder getSchema(Long sentenceSchemaId);

    /**
     * Create new sentence schema
     *
     * @param schemaForm form used to create new schema
     * @return response that tells if creation was successful or not
     */
    UserResponse createSchema(SchemaForm schemaForm);

    /**
     * Delete schema by provided schema id
     *
     * @param schemaSentenceId unique id of schema
     * @return response with status of operation
     */
    UserResponse deleteSchema(Long schemaSentenceId);
}
