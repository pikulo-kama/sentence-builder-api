package com.drabazha.sentence.builder.api.service;

import com.drabazha.sentence.builder.api.dto.SentenceSchemaIterator;
import com.drabazha.sentence.builder.api.dto.form.SchemaForm;
import com.drabazha.sentence.builder.api.dto.response.SentenceSchemaResponse;
import com.drabazha.sentence.builder.api.exception.UserResponse;

import java.util.List;

public interface SentenceSchemaService {

    List<SentenceSchemaResponse> getAll();

    SentenceSchemaIterator getSchema(Long sentenceSchemaId);

    SentenceSchemaIterator getRandomSchema();

    UserResponse createSchema(SchemaForm schemaForm);

    UserResponse deleteSchema(Long schemaSentenceId);
}
