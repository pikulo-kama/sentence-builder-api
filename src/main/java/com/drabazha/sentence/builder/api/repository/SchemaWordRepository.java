package com.drabazha.sentence.builder.api.repository;

import com.drabazha.sentence.builder.api.domain.sql.SchemaWord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemaWordRepository extends JpaRepository<SchemaWord, Long> {

    List<SchemaWord> findSchemaWordsBySentenceSchemaIdOrderByWordOrder(Long sentenceSchemaId);
}
