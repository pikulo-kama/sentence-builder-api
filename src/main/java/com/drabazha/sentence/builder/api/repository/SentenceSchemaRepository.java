package com.drabazha.sentence.builder.api.repository;

import com.drabazha.sentence.builder.api.domain.sql.SentenceSchema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SentenceSchemaRepository extends JpaRepository<SentenceSchema, Long> {

    Boolean existsBySchemaHash(String schemaHash);
}
